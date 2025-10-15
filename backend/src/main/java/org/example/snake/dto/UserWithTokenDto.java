package org.example.snake.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Getter
@Setter
public class UserWithTokenDto extends UserDto {
    private String token;

    public UserWithTokenDto(String firstName, String lastName, String username, String email, String profilePicture, String phone, LocalDateTime dateOfBirth, String userType, String token) {
        super(firstName, lastName, username, email, profilePicture, phone, dateOfBirth, userType);
        this.token = token;
    }
}
