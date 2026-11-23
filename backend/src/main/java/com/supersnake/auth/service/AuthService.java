package com.supersnake.auth.service;

import com.supersnake.auth.dto.LoginDto;
import com.supersnake.auth.dto.RegisterDto;
import com.supersnake.auth.dto.UserWithTokenDto;
import com.supersnake.user.dto.UserDto;

public interface AuthService {
  UserDto register(RegisterDto registerDto);

  UserWithTokenDto login(LoginDto loginDto);
}
