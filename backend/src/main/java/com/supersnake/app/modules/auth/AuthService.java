package com.supersnake.app.modules.auth;

import com.supersnake.app.modules.auth.dto.LoginDto;
import com.supersnake.app.modules.auth.dto.RegisterDto;
import com.supersnake.app.modules.auth.dto.UserWithTokenDto;
import com.supersnake.app.modules.user.dto.UserDto;

public interface AuthService {
    UserDto register(RegisterDto registerDto);
    UserWithTokenDto login(LoginDto loginDto);
}
