package org.acme;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.Optional;

@ApplicationScoped
public class CompanyRepository {

    @PersistenceContext
    EntityManager em;

    @Transactional
    public void save(Company company) {
        if (company.getId() == null) {
            em.persist(company);
        } else {
            em.merge(company);
        }
    }

    public Optional<Company> findById(Long id) {
        return Optional.ofNullable(em.find(Company.class, id));
    }
}
