package org.acme.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Education{
    @JsonProperty("Degree")
    public String degree;
    @JsonProperty("Institute")
    public String institute;
    @JsonProperty("Location")
    public String location;
    @JsonProperty("Duration")
    public String duration;
}
