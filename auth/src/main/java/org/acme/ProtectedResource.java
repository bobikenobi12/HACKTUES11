package org.acme;

import io.jsonwebtoken.Claims;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@Path("/api")
public class ProtectedResource {
    private static final Logger LOGGER = Logger.getLogger(ProtectedResource.class.getName());
    
    @Inject
    AuthService authService;

    @Inject
    UserRepository userService;
    
    @GET
    @Path("/profile")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProfile(@Context SecurityContext securityContext, @Context HttpHeaders headers) {
        String username = securityContext.getUserPrincipal().getName();
        String authHeader = headers.getHeaderString(HttpHeaders.AUTHORIZATION);
        String token = authService.extractToken(authHeader);
        
        Optional<User> user = userService.findByUsername(username);
        
        Map<String, Object> profile = new HashMap<>();
        profile.put("username", username);
        profile.put("email", user.get().getEmail());
        profile.put("role", user.get().getRole());
        profile.put("message", "This is your protected profile data");
        profile.put("name", user.get().getName());
        profile.put("phoneNumber", user.get().getPhoneNumber());
        profile.put("countryCode", user.get().getCountryCode());
        profile.put("local", user.get().getLocal());
        
        return Response.ok(profile).build();
    }
    
    @GET
    @Path("/admin")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("admin")
    public Response getAdminData(@Context SecurityContext securityContext) {
        String username = securityContext.getUserPrincipal().getName();
        
        Map<String, Object> data = new HashMap<>();
        data.put("username", username);
        data.put("message", "This is protected admin data");
        data.put("timestamp", System.currentTimeMillis());
        
        return Response.ok(data).build();
    }

    @PUT
    @Path("/user-update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(@Context SecurityContext securityContext, UpdateUserRequest updateUserRequest) {
        String username = securityContext.getUserPrincipal().getName();
        Optional<User> optionalUser = userService.findByUsername(username);

        if (optionalUser.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }

        User user = optionalUser.get();

        if (updateUserRequest.getEmail() != null) {
            user.setEmail(updateUserRequest.getEmail());
        }
        if (updateUserRequest.getPassword() != null) {
            user.setPassword(updateUserRequest.getPassword());
        }
        if (updateUserRequest.getName() != null) {
            user.setName(updateUserRequest.getName());
        }
        if (updateUserRequest.getPhoneNumber() != null) {
            user.setPhoneNumber(updateUserRequest.getPhoneNumber());
        }
        if (updateUserRequest.getCountryCode() != null) {
            user.setCountryCode(updateUserRequest.getCountryCode());
        }
        if (updateUserRequest.getLocal() != null) {
            user.setLocal(updateUserRequest.getLocal());
        }

        userService.save(user);

        return Response.ok(user).build();
    }

    @GET
    @Path("/companies")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCompanies(@Context SecurityContext securityContext) {
        String username = securityContext.getUserPrincipal().getName();
        Optional<User> optionalUser = userService.findByUsername(username);

        if (optionalUser.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }

        User user = optionalUser.get();

        return Response.ok(user.getCompanies()).build();
    }
}