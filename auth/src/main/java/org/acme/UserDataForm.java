package org.acme;

import jakarta.ws.rs.FormParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jboss.resteasy.reactive.PartType;

import java.io.File;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDataForm {
    @FormParam("cv")
    @PartType("application/pdf")
    public File cv;

    @FormParam("full_name")
    @PartType("text/plain")
    public String fullName;

    @FormParam("birthdate")
    @PartType("text/plain")
    public String birthdate;
}
