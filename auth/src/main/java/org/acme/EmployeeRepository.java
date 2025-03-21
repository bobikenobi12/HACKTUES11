package org.acme;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.Optional;

@ApplicationScoped
public class EmployeeRepository {

    @PersistenceContext
    EntityManager em;

    @Transactional
    public void save(Employee employee) {
        em.persist(employee);
    }

    public Optional<Employee> findById(Long id) {
        return Optional.ofNullable(em.find(Employee.class, id));
    }

    @Transactional
    public void delete(Employee employee) {
        Employee managedEmployee = em.contains(employee) ? employee : em.find(Employee.class, employee.getId());
        if (managedEmployee != null) {
            em.remove(managedEmployee);
        }
    }
}
