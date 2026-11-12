package com.supersnake.app.modules.user;

import com.supersnake.app.modules.user.dto.UserDto;

import java.util.List;

public interface UserService {
    void saveUser(UserDto userDto);
    UserDto findUserByEmail(String email);
    UserDto findUserByUsername(String username);
    void deleteUser(String email);
    void updateUser(String username, UserDto userDto);
    List<UserDto> getAllUsers();
    void changeProfilePicture(String username, String base64Image);
    void changePassword(String username, String oldPassword, String newPassword);

    // Auth integration methods
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    UserDto registerNewUser(String firstName, String lastName, String username, String email, String encodedPassword);
    UserDto findByIdentifier(String identifier);
    String getEncodedPassword(String identifier);
}
