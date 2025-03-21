package org.acme.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkExperience{
    @JsonProperty("Company")
    public String company;
}
