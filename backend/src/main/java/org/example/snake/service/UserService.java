package org.example.snake.service;


import org.example.snake.convertor.UserConvertor;
import org.example.snake.dto.UserDto;
import org.example.snake.exceptions.UserAlreadyExistsException;
import org.example.snake.exceptions.UserNotFoundException;
import org.example.snake.model.User;
import org.example.snake.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.snake.dto.UserWithTokenDto;
import java.time.LocalDateTime;

import java.util.List;


/*
    This class has the following methods:
    1. saveUser(UserDto userDto): Saves a new user to the database.
    2. findUserByEmail(String email): Finds a user by their email.
    3. findUserByUsername(String username): Finds a user by their username.
    4. deleteUser(String email): Deletes a user by their email.
    5. updateUser(User user, String email): Updates an existing user.
    6. getAllUsers(): Retrieves all users from the database.
 */
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    /**
     * Saves a new user to the database.
     *
     * @param userDto the user data transfer object containing user details
     * @throws UserAlreadyExistsException if a user with the same username or email already exists
     */
    public void saveUser(UserDto userDto) {
        // Convert UserDto to User entity and save it
        // Check if user already exists by username or email
        if (userRepository.findByUsername(userDto.getUsername()).isPresent() || userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists with this username or email");
        }
        // Create a new User using the convertor
        User user = UserConvertor.toEntity(userDto);
        // Save the user entity to the database
        userRepository.save(user);
    }

    /**
     * Finds a user by their email.
     *
     * @param email the email of the user to find
     * @return UserDto containing user details
     * @throws UserNotFoundException if no user is found with the given email
     */
    public UserDto findUserByEmail(String email) {
        // Find user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with this email"));
        // Convert User entity to UserDto
        return UserConvertor.toDto(user);
    }

    /**
     * Finds a user by their username.
     *
     * @param username the username of the user to find
     * @return UserDto containing user details
     * @throws UserNotFoundException if no user is found with the given username
     */
    public UserDto findUserByUsername(String username) {
        // Find user by username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with this username"));
        // Convert User entity to UserDto
        return UserConvertor.toDto(user);
    }

    /**
     * Deletes a user by their email.
     *
     * @param email the email of the user to delete
     * @throws UserNotFoundException if no user is found with the given email
     */
    public void deleteUser(String email) {
        // Find user by email and delete
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with this email"));
        userRepository.delete(user);
    }

     /**
     * Updates an existing user.
     *
     * @param user  the user entity containing updated details
     * @param email the email of the user to update
     * @throws UserNotFoundException if no user is found with the given email
     */
    public void updateUser(String username, UserWithTokenDto userDto) {
        // Find user by email
        User existingUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with this username"));
        // Update the existing user's fields
        existingUser.setFirstName(userDto.getFirstName());
        existingUser.setLastName(userDto.getLastName());
        existingUser.setUsername(userDto.getUsername());
        existingUser.setEmail(userDto.getEmail());
        existingUser.setProfilePicture(userDto.getProfilePicture());
        existingUser.setPhone(userDto.getPhone());
        existingUser.setDateOfBirth(LocalDateTime.parse(userDto.getDateOfBirth()));
        existingUser.setUserType(userDto.getUserType());
        // Save the updated user entity to the database
        userRepository.save(existingUser);
    }

    /**
     * Retrieves all users from the database.
     *
     * @return List<UserDto> containing details of all users
     */
    public List<UserDto> getAllUsers() {
        // Retrieve all users from the database
        List<User> users = userRepository.findAll();
        // Convert List<User> to List<UserDto>
        // Convert each User to UserDto
        return users.stream()
                .map(UserConvertor::toDto)
                .toList();
    }

    public void changeProfilePicture(String username, String base64Image) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("There's no user with this username"));
        user.setProfilePicture(base64Image);
        userRepository.save(user);
    }
}
