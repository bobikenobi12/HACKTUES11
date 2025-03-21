package org.acme;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(name = "birth_date")
    private String birth_date;

    @Column(name = "risk_of_bribery")
    private Double risk_of_bribery;

    @Column(name = "employee_efficiency")
    private Double employee_efficiency;

    @Column(name = "risk_of_employee_turnover")
    private Double risk_of_employee_turnover;

    @Column(name = "employee_reputation")
    private Double employee_reputation;

    @Column(name = "career_growth_potential")
    private Double career_growth_potential;
}
