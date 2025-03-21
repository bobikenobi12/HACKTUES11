package org.acme;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateUserRequest {
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private CountryCode countryCode;
    private Lang local;
}
