package org.acme;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@ApplicationScoped
public class AuthService {
    
    private static final Logger LOGGER = Logger.getLogger(AuthService.class.getName());
    
    @Inject
    UserRepository userRepository;
    
    @ConfigProperty(name = "jwt.issuer", defaultValue = "quarkus-app")
    String issuer;
    
    @ConfigProperty(name = "jwt.secret-key")
    String secretKey;
    
    @ConfigProperty(name = "jwt.expiration.seconds", defaultValue = "86400")
    long expirationSeconds;
    
    private SecretKey getSigningKey() {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(secretKey.getBytes(StandardCharsets.UTF_8));
            return Keys.hmacShaKeyFor(hash);
        } catch (Exception e) {
            throw new RuntimeException("Error creating signing key", e);
        }
    }
    

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            
            StringBuilder hexString = new StringBuilder();
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    @Transactional
    public User register(String username, String email, String password, String phoneNumber, String name, CountryCode countryCode, Lang local) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(hashPassword(password));
        user.setRole("user");
        user.setPhoneNumber(phoneNumber);
        user.setName(name);
        user.setCountryCode(countryCode);
        user.setLocal(local);
        
        userRepository.persist(user);
        return user;
    }
    

    public String login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid credentials");
        }
        
        User user = userOpt.get();
        String hashedPassword = hashPassword(password);
        
        if (!hashedPassword.equals(user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        return generateToken(user);
    }
    

    private String generateToken(User user) {
        try {
            Date now = new Date();
            Date expiration = new Date(now.getTime() + expirationSeconds * 1000);
            
            Map<String, Object> claims = new HashMap<>();
            claims.put("id", user.getId());
            claims.put("email", user.getEmail());
            claims.put("username", user.getUsername());
            claims.put("role", user.getRole());
            
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(user.getUsername())
                    .setIssuer(issuer)
                    .setIssuedAt(now)
                    .setExpiration(expiration)
                    .signWith(getSigningKey())
                    .compact();
            
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error generating token", e);
            throw new RuntimeException("Error generating token", e);
        }
    }

    public boolean verifyToken(String token) {
        if (token == null || token.isEmpty()) {
            return false;
        }
        
        try {
            Claims claims = extractClaims(token);
            
            if (!issuer.equals(claims.getIssuer())) {
                LOGGER.warning("Invalid issuer: " + claims.getIssuer() + ", expected: " + issuer);
                return false;
            }
            
            if (claims.getExpiration().before(new Date())) {
                LOGGER.warning("Token has expired");
                return false;
            }
            
            return true;
        } catch (Exception e) {
            LOGGER.log(Level.WARNING, "Error verifying token", e);
            return false;
        }
    }
    

    public String extractToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
    
  
    public Claims extractClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception e) {
            throw new RuntimeException("Error extracting claims from token", e);
        }
    }
}