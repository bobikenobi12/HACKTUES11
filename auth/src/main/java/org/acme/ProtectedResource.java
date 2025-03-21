package org.acme;

import io.jsonwebtoken.Claims;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Path("/api")
public class ProtectedResource {
    private static final Logger LOGGER = Logger.getLogger(ProtectedResource.class.getName());
    
    @Inject
    AuthService authService;
    
    @GET
    @Path("/profile")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProfile(@Context SecurityContext securityContext, @Context HttpHeaders headers) {
        String username = securityContext.getUserPrincipal().getName();
        String authHeader = headers.getHeaderString(HttpHeaders.AUTHORIZATION);
        String token = authService.extractToken(authHeader);
        
        Claims claims = authService.extractClaims(token);
        
        Map<String, Object> profile = new HashMap<>();
        profile.put("username", username);
        profile.put("email", claims.get("email", String.class));
        profile.put("role", claims.get("role", String.class));
        profile.put("message", "This is your protected profile data");
        profile.put("name", claims.get("name", String.class));
        profile.put("phoneNumber", claims.get("phoneNumber", String.class));
        profile.put("countryCode", claims.get("countryCode", String.class));
        profile.put("local", claims.get("local", String.class));
        
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
}