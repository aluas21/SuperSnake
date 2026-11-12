package com.supersnake.app.modules.auth;

import com.supersnake.app.modules.auth.dto.LoginDto;
import com.supersnake.app.modules.auth.dto.RegisterDto;
import com.supersnake.app.modules.auth.dto.UserWithTokenDto;
import com.supersnake.app.modules.user.UserService;
import com.supersnake.app.modules.user.dto.UserDto;
import com.supersnake.app.shared.exception.InvalidCredentialsException;
import com.supersnake.app.shared.exception.UserAlreadyExistsException;
import com.supersnake.app.shared.security.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
class AuthServiceImpl implements AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private Jwt jwt;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto register(RegisterDto registerDto) {
        if (userService.existsByUsername(registerDto.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists");
        }
        if (userService.existsByEmail(registerDto.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        String encodedPassword = passwordEncoder.encode(registerDto.getPassword());
        return userService.registerNewUser(
                registerDto.getFirstName(),
                registerDto.getLastName(),
                registerDto.getUsername(),
                registerDto.getEmail(),
                encodedPassword
        );
    }

    @Override
    public UserWithTokenDto login(LoginDto loginDto) {
        UserDto user = userService.findByIdentifier(loginDto.getIdentifier());
        String encodedPassword = userService.getEncodedPassword(loginDto.getIdentifier());

        if (!passwordEncoder.matches(loginDto.getPassword(), encodedPassword)) {
            throw new InvalidCredentialsException("Invalid password");
        }

        String token = jwt.generateToken(user.getUsername());

        return new UserWithTokenDto(
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                user.getProfilePicture(),
                user.getPhone(),
                user.getDateOfBirth(),
                user.getUserType(),
                token
        );
    }
}
