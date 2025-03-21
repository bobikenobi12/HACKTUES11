package org.acme.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.acme.UploadDataResponse;

import java.util.Date;

@Getter
@Setter
public class CompanyDetail{
    public String name;
    public Details details;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS")
    public Date timestamp;
}
