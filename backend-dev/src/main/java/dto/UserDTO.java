package dto;

import entity.User;

public record UserDTO(
    String lastName,
    String firstName,
    String userEmail,
    User.Role role
) {
    
    public UserDTO(User user) {
        this(
            user.getLastName(),
            user.getFirstName(),
            user.getUserEmail(),
            user.getRole()
        );
    }

}
