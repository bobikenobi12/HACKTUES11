package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.Optional;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {

    @PersistenceContext
    EntityManager em;
    public Optional<User> findByUsername(String username) {
        return find("username", username).firstResultOptional();
    }
    
    public Optional<User> findByEmail(String email) {
        return find("email", email).firstResultOptional();
    }
    
    public boolean existsByUsername(String username) {
        return count("username", username) > 0;
    }
    
    public boolean existsByEmail(String email) {
        return count("email", email) > 0;
    }

    @Transactional
    public void save(User user) {
        em.merge(user);
    }
}