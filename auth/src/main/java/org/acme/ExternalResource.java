package org.acme;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

@Path("/external")
public class ExternalResource {

    @Inject
    @RestClient
    private ScraperExternalService scraperService;

    @Inject
    @RestClient
    private AnalyzerExternalService analyzerService;

    @POST
    @Path("/upload-user-data")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response uploadUserData(@RestForm("cv") FileUpload cv,
                                   @RestForm("full_name") String fullName,
                                   @RestForm("birthdate") String birthdate) {
        try {
            Response externalResponse = scraperService.uploadUserData(cv, fullName, birthdate);

            return Response.status(externalResponse.getStatus())
                    .entity(externalResponse.getEntity())
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error calling external service: " + e.getMessage())
                    .build();
        }
    }

    @POST
    @Path("/upload-profile")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response uploadEmployeeProfile(AnalyzerRequest employeeProfile) {
        try {
            String response = analyzerService.uploadEmployeeProfile(employeeProfile);
            return Response.ok(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error processing request: " + e.getMessage())
                    .build();
        }
    }
}
