package resource;

import java.util.Map;

import auth.TokenGenerator;
import dto.LoginDTO;
import entity.User;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import service.UserService;

@Path("login")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class LoginResource {

    @Inject
    UserService userService;

    @POST
    public Response userLogin(LoginDTO loginDTO) {

        // Find user by Email
        User user = userService.getUserByEmail(loginDTO.userEmail());
        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED)
                .entity("Invalid Credentials")
                .build();
        } 
        // Check login credentials
        boolean loginSuccess = userService.userLogin(loginDTO, user);

        if (!loginSuccess) {
            return Response.status(Response.Status.UNAUTHORIZED)
            .entity("Invalid Credentials")
            .build();
        }

        // If success we generate token
        User.Role userRole = user.getRole();
        String token = TokenGenerator.generateToken(
            "http://localhost:8081/swim-app",
            user.getUserEmail(),
            userRole
        );

        return Response.status(Response.Status.OK).entity(Map.of("token", token)).build();
    }
}
