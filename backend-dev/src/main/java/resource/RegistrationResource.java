package resource;

import dto.RegistrationDTO;
import dto.UserDTO;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import service.UserService;

@Path("register")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class RegistrationResource {

    @Inject
    UserService userService;

    @POST
    public Response userRegistration(@Valid RegistrationDTO registrationDTO) {
        try {
            UserDTO userDTO = userService.userRegistration(registrationDTO);
            return Response.status(Response.Status.CREATED).entity(userDTO).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
            .entity("Registration failed!" + e.getMessage())
            .build();
        } 
    }
}