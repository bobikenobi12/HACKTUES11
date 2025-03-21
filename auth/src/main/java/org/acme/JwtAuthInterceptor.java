package org.acme;

import io.jsonwebtoken.Claims;
import jakarta.annotation.Priority;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.ext.Provider;

import java.io.IOException;
import java.security.Principal;
import java.util.logging.Logger;

@Provider
@Priority(Priorities.AUTHENTICATION)
@ApplicationScoped
public class JwtAuthInterceptor implements ContainerRequestFilter {

    private static final Logger LOGGER = Logger.getLogger(JwtAuthInterceptor.class.getName());
    
    @Inject
    AuthService authService;
    
    @Inject
    AuthConfig authConfig;
    
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        // Skip authentication for public paths
        String path = requestContext.getUriInfo().getPath();
        if (authConfig.isPublicPath(path)) {
            LOGGER.info("Skipping authentication for public path: " + path);
            return;
        }
        
        // Get the Authorization header
        String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            LOGGER.warning("Missing or invalid Authorization header for path: " + path);
            abortWithUnauthorized(requestContext);
            return;
        }
        
        // Extract and verify the token
        String token = authService.extractToken(authHeader);
        if (token == null || !authService.verifyToken(token)) {
            LOGGER.warning("Invalid or expired token for path: " + path);
            abortWithUnauthorized(requestContext);
            return;
        }
        
        // Set security context with user information from token
        try {
            Claims claims = authService.extractClaims(token);
            final String username = claims.getSubject();
            final String role = (String) claims.get("role");
            
            requestContext.setSecurityContext(new SecurityContext() {
                @Override
                public Principal getUserPrincipal() {
                    return () -> username;
                }
                
                @Override
                public boolean isUserInRole(String r) {
                    return role != null && role.equals(r);
                }
                
                @Override
                public boolean isSecure() {
                    return requestContext.getSecurityContext().isSecure();
                }
                
                @Override
                public String getAuthenticationScheme() {
                    return "Bearer";
                }
            });
            
            LOGGER.info("Token verified successfully for user: " + username + ", path: " + path);
        } catch (Exception e) {
            LOGGER.warning("Error processing token: " + e.getMessage());
            abortWithUnauthorized(requestContext);
        }
    }
    
    private void abortWithUnauthorized(ContainerRequestContext requestContext) {
        requestContext.abortWith(
            Response.status(Response.Status.UNAUTHORIZED)
                   .header(HttpHeaders.WWW_AUTHENTICATE, "Bearer realm=\"quarkus\"")
                   .entity("Unauthorized access")
                   .build());
    }
}