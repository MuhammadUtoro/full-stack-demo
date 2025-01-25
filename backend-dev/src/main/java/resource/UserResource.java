package resource;

import java.util.List;

import dto.UserDTO;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import service.UserService;

@Path("users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)

public class UserResource {

    @Inject
    UserService userService;

    @GET
    @RolesAllowed("ADMIN")
    public Response getAllUsers() {
        List<UserDTO> userDTOs = userService.getAllUsers();

        return Response.status(Response.Status.OK).entity(userDTOs).build();
    } 
}
