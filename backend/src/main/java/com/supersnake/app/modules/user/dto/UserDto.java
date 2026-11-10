package com.supersnake.app.modules.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String profilePicture;
    private String phone;
    private String dateOfBirth;
    private String userType = "USER";
}
