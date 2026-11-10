package com.supersnake.app.modules.auth;

import com.supersnake.app.modules.auth.dto.LoginDto;
import com.supersnake.app.modules.auth.dto.RegisterDto;
import com.supersnake.app.modules.auth.dto.UserWithTokenDto;
import com.supersnake.app.modules.user.dto.UserDto;
import com.supersnake.app.shared.exception.InvalidCredentialsException;
import com.supersnake.app.shared.exception.UserAlreadyExistsException;
import com.supersnake.app.shared.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
@Tag(name = "Authentication", description = "Registration and JWT login endpoints")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user account")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto) {
        try {
            UserDto createdUser = authService.register(registerDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of("error", e.getMessage())
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Map.of("error", "An unexpected error occurred: " + e.getMessage())
            );
        }
    }

    @PostMapping("/login")
    @Operation(summary = "Login with username or email and obtain JWT token")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            UserWithTokenDto userWithTokenDto = authService.login(loginDto);
            return ResponseEntity.ok(userWithTokenDto);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of("error", e.getMessage())
            );
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("error", e.getMessage())
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("error", "An unexpected error occurred: " + e.getMessage())
            );
        }
    }
}
