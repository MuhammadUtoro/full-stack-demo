package service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import dto.LoginDTO;
import dto.RegistrationDTO;
import dto.UserDTO;
import entity.User;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserService {
    public List<RegistrationDTO> getAllUsers() {
        return User.listAll().stream()
        .map(entity -> (User) entity)
        .map(this::toDTO)
        .collect(Collectors.toList());
    }

    public UserDTO userRegistration(RegistrationDTO registrationDTO) {
        // Hashing the password before storing
        String hashedPassword = BcryptUtil.bcryptHash(registrationDTO.password());

        // Create User Entity from registrationDTO
        User user = new User(registrationDTO, hashedPassword);
        user.setRole(User.Role.TRAINER);

        // Persist to Database
        user.persist();

        // Returning to DTO-type (Make it consistent)
        return new UserDTO(user);
    }

    // Returning an Entity for login purpose
    public User getUserByEmail(String userEmail) {
        return User.find("userEmail", userEmail).firstResult();
    }

    // Returning a DTO for client-side purpose
    public RegistrationDTO getUserDTOByEmail(String userEmail) {
        Optional<User> userOptional = User.find("userEmail", userEmail).firstResultOptional();
        return userOptional.map(RegistrationDTO::new).orElse(null);
    }

    public boolean userLogin(LoginDTO loginDTO, User user) {
        
        if (!loginDTO.userEmail().equals(user.getUserEmail())) {
            return false;
        }
        return BcryptUtil.matches(loginDTO.password(), user.getPassword());
    }

    // Helper method to convert Entity to DTO
    private RegistrationDTO toDTO(User user) {
        return new RegistrationDTO(user);
    }
}
