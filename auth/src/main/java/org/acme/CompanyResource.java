package org.acme;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

import java.util.Optional;

@Path("/company")
public class CompanyResource {

    @Inject
    CompanyRepository companyRepository;

    @Inject
    EmployeeRepository employeeRepository;

    @Inject
    UserRepository userRepository;

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createCompany(@Context SecurityContext securityContext, Company company) {
        String username = securityContext.getUserPrincipal().getName();
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }

        User user = optionalUser.get();
        user.getCompanies().add(company);

        userRepository.save(user);

        return Response.status(Response.Status.CREATED).entity(company).build();
    }

    @POST
    @Path("/{companyId}/employee")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addEmployee(@PathParam("companyId") Long companyId, Employee employee) {
        Optional<Company> optionalCompany = companyRepository.findById(companyId);

        if (optionalCompany.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).entity("Company not found").build();
        }

        employeeRepository.save(employee);

        Company company = optionalCompany.get();
        company.getEmployees().add(employee);
        companyRepository.save(company);

        return Response.status(Response.Status.CREATED).entity(employee).build();
    }
}
