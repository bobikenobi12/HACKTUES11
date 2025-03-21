package org.acme;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

@Path("/upload-user-data")
@RegisterRestClient(configKey = "ivan-scraper")
public interface ScraperExternalService {
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    Response uploadUserData(@RestForm("cv") FileUpload cv,
                          @RestForm("full_name") String fullName,
                          @RestForm("birthdate") String birthdate);
}
