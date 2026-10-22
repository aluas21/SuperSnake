package com.supersnake.app.modules.auth;

import com.supersnake.app.modules.auth.RegisterDto;
import com.supersnake.app.modules.user.User;
import com.supersnake.app.modules.user.UserRepository;
import com.supersnake.app.modules.user.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.supersnake.app.modules.auth.LoginDto;
import com.supersnake.app.modules.user.UserNotFoundException;
import com.supersnake.app.modules.auth.InvalidCredentialsException;
import com.supersnake.app.modules.auth.Jwt;
import com.supersnake.app.modules.auth.UserWithTokenDto;
import java.util.Optional;

@Service
class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Jwt jwt;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(RegisterDto registerDto) {
        if (userRepository.findByUsername(registerDto.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("Username already exists");
        }
        if (userRepository.findByEmail(registerDto.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already exists");
        }
        User user = new User();
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        return userRepository.save(user);
    }

    public UserWithTokenDto login(LoginDto loginDto) {
        /// identifier can be either username or email
        Optional<User> user = userRepository.findByEmail(loginDto.getIdentifier());
        if(!user.isPresent()) {
            user = userRepository.findByUsername(loginDto.getIdentifier());
        }
        if(!user.isPresent()) {
            throw new UserNotFoundException("Invalid username/email");
        }

        if(!passwordEncoder.matches(loginDto.getPassword(), user.get().getPassword())) {
            throw new InvalidCredentialsException("Invalid password");
        }

        String token = jwt.generateToken(user.get().getUsername());

        return new UserWithTokenDto(user.get().getFirstName(), user.get().getLastName(), user.get().getUsername(), user.get().getEmail(), user.get().getProfilePicture(), user.get().getPhone(), user.get().getDateOfBirth() != null ? user.get().getDateOfBirth().toString() : null, user.get().getUserType(), token);
    }
}

