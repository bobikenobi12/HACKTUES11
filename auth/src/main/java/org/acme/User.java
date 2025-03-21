package org.acme;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Locale;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;

    @Column
    private String name;

    @Column
    private String phoneNumber;

    //get the enum as a string
    @Column
    private CountryCode countryCode;

    @Column
    private Lang local;
    
    @Column
    private String role;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Company> companies;
}