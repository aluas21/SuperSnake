package org.example.snake.dto;


import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String profilePicture;
    private String phone;
    private String dateOfBirth;
    private String userType; // e.g., "admin", "user", "guest"
}
