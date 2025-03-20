package org.acme;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Path("/auth")
public class AuthResource {

    private static final Logger LOGGER = Logger.getLogger(AuthResource.class.getName());
    
    @Inject
    AuthService authService;
    
    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(RegisterRequest request) {
        try {
            if (request.getUsername() == null || request.getEmail() == null || request.getPassword() == null) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(createErrorResponse("Username, email and password are required"))
                        .build();
            }
            
            User user = authService.register(request.getUsername(), request.getEmail(), request.getPassword(), request.getPhoneNumber(), request.getName(), request.getCountryCode(), request.getLocal());
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "role", user.getRole(),
                    "name", user.getName(),
                    "phoneNumber", user.getPhoneNumber(),
                    "countryCode", user.getCountryCode(),
                    "local", user.getLocal()
            ));
            
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(createErrorResponse(e.getMessage()))
                    .build();
        }
    }
    
    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(LoginRequest request) {
        try {
            if (request.getUsername() == null || request.getPassword() == null) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(createErrorResponse("Username and password are required"))
                        .build();
            }
            
            String token = authService.login(request.getUsername(), request.getPassword());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("token_type", "bearer");
            
            return Response.ok(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity(createErrorResponse(e.getMessage()))
                    .build();
        }
    }
    
    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("error", message);
        return response;
    }
    
    // Request models
    @Getter
    @Setter
    public static class RegisterRequest {
        private String username;
        private String email;
        private String password;
        private String phoneNumber;
        private String name;
        private CountryCode countryCode;
        private Lang local;
    }
    
    public static class LoginRequest {
        private String username;
        private String password;
        
        public String getUsername() {
            return username;
        }
        
        public void setUsername(String username) {
            this.username = username;
        }
        
        public String getPassword() {
            return password;
        }
        
        public void setPassword(String password) {
            this.password = password;
        }
    }
}