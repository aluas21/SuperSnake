package org.example.snake.dto;


import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class UserDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String profilePicture;
    private String phone;
    private LocalDateTime dateOfBirth;
    private String userType; // e.g., "admin", "user", "guest"
}
