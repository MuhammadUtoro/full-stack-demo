package dto;

import jakarta.validation.constraints.NotBlank;

public record LoginDTO(
    @NotBlank(message = "Field cannot be empty or blank")
    String userEmail,

    @NotBlank(message = "Field cannot be empty or blank")
    String password
) {

}
