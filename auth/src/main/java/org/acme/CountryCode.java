package org.acme;

import io.quarkus.security.Authenticated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
public enum CountryCode {
    BG, EN, DE, ESP, ITA, FR
}
