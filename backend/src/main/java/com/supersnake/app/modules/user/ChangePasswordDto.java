package com.supersnake.app.modules.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ChangePasswordDto {

    private String oldPassword;
    private String newPassword;
}
