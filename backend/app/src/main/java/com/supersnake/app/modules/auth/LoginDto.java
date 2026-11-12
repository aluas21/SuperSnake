package com.supersnake.app.modules.auth;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {
    private String identifier;
    private String password;
}