package org.acme.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.acme.UploadDataResponse;

import java.util.List;

@Getter
@Setter
public class CvSummary{
    @JsonProperty("Full Name")
    public String fullName;
    @JsonProperty("Work Experience")
    public List<WorkExperience> workExperience;
    @JsonProperty("Known Programming Languages")
    public List<Object> knownProgrammingLanguages;
    @JsonProperty("Skills")
    public List<String> skills;
    @JsonProperty("Education")
    public Education education;
}
