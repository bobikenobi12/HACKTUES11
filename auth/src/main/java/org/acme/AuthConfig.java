package org.acme;

import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.Arrays;
import java.util.List;

@ApplicationScoped
public class AuthConfig {
    
    @ConfigProperty(name = "jwt.auth.enabled", defaultValue = "true")
    boolean authEnabled;
    
    @ConfigProperty(name = "jwt.auth.public-paths", defaultValue = "/auth/login,/auth/register,/hello")
    String publicPathsString;
    

    public boolean isAuthEnabled() {
        return authEnabled;
    }
    

    public List<String> getPublicPaths() {
        return Arrays.asList(publicPathsString.split(","));
    }
    

    public boolean isPublicPath(String path) {
        List<String> publicPaths = getPublicPaths();
        
        if (publicPaths.contains(path)) {
            return true;
        }
        
        for (String publicPath : publicPaths) {
            if (publicPath.endsWith("/*")) {
                String prefix = publicPath.substring(0, publicPath.length() - 1);
                if (path.startsWith(prefix)) {
                    return true;
                }
            }
        }
        
        return false;
    }
}