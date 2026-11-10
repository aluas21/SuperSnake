package com.supersnake.app.modules.user;

import com.supersnake.app.modules.user.dto.ChangePasswordDto;
import com.supersnake.app.modules.user.dto.UserDto;
import com.supersnake.app.shared.exception.UserNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
@Tag(name = "User Management", description = "Endpoints for user profile, credentials, and settings")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    @Operation(summary = "Add a new user")
    public ResponseEntity<String> addUser(@RequestBody UserDto userDto) {
        try {
            userService.saveUser(userDto);
            return new ResponseEntity<>("Added", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getAll")
    @Operation(summary = "Get all users")
    public ResponseEntity<List<UserDto>> getAll() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PutMapping("/{username}/profile-picture")
    @Operation(summary = "Update user profile picture")
    public ResponseEntity<String> changeProfilePicture(
            @PathVariable String username,
            @RequestBody String image) {
        try {
            userService.changeProfilePicture(username, image);
            return new ResponseEntity<>("Profile picture updated", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{username}")
    @Operation(summary = "Update user profile details")
    public ResponseEntity<String> updateUser(
            @PathVariable String username,
            @RequestBody UserDto userDto) {
        try {
            userService.updateUser(username, userDto);
            return new ResponseEntity<>("User updated", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{username}/change-password")
    @Operation(summary = "Change user password")
    public ResponseEntity<String> changePassword(
            @PathVariable String username,
            @RequestBody ChangePasswordDto changePasswordDto) {
        try {
            userService.changePassword(
                    username,
                    changePasswordDto.getOldPassword(),
                    changePasswordDto.getNewPassword()
            );
            return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
        } catch (UserNotFoundException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
