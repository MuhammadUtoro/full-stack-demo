package dto;

import entity.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegistrationDTO(
    String userId,
    @NotBlank(message = "Field cannot be empty or blank")
    String lastName,
    @NotBlank(message = "Field cannot be empty or blank")
    String firstName,
    @NotBlank(message = "Field cannot be empty or blank")
    @Email
    String userEmail,
    @NotBlank(message = "Field cannot be empty or blank")
    String password
) {
    public RegistrationDTO(User user) {
        this(
            user.id.toString(),
            user.getLastName(),
            user.getFirstName(),
            user.getUserEmail(),
            user.getPassword()
        );
    }
}
