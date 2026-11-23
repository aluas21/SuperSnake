package com.supersnake.user.service;

import com.supersnake.user.db.entity.UserEntity;
import com.supersnake.user.db.repository.UserRepository;
import com.supersnake.user.dto.UserDto;
import com.supersnake.user.exception.UserAlreadyExistsException;
import com.supersnake.user.exception.UserNotFoundException;
import com.supersnake.user.mapper.UserMapper;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired private UserRepository userRepository;

  @Autowired private PasswordEncoder passwordEncoder;

  @Override
  public void saveUser(UserDto userDto) {
    if (userRepository.findByUsername(userDto.getUsername()).isPresent()
        || userRepository.findByEmail(userDto.getEmail()).isPresent()) {
      throw new UserAlreadyExistsException("User already exists with this username or email");
    }
    UserEntity user = UserMapper.toEntity(userDto);
    userRepository.save(user);
  }

  @Override
  public UserDto findUserByEmail(String email) {
    UserEntity user =
        userRepository
            .findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("User not found with this email"));
    return UserMapper.toDto(user);
  }

  @Override
  public UserDto findUserByUsername(String username) {
    UserEntity user =
        userRepository
            .findByUsername(username)
            .orElseThrow(() -> new UserNotFoundException("User not found with this username"));
    return UserMapper.toDto(user);
  }

  @Override
  public void deleteUser(String email) {
    UserEntity user =
        userRepository
            .findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("User not found with this email"));
    userRepository.delete(user);
  }

  @Override
  public void updateUser(String username, UserDto userDto) {
    UserEntity existingUser =
        userRepository
            .findByUsername(username)
            .orElseThrow(() -> new UserNotFoundException("User not found with this username"));

    existingUser.setFirstName(userDto.getFirstName());
    existingUser.setLastName(userDto.getLastName());
    existingUser.setUsername(userDto.getUsername());
    existingUser.setEmail(userDto.getEmail());
    existingUser.setProfilePicture(userDto.getProfilePicture());
    existingUser.setPhone(userDto.getPhone());
    if (userDto.getDateOfBirth() != null && !userDto.getDateOfBirth().isBlank()) {
      existingUser.setDateOfBirth(LocalDate.parse(userDto.getDateOfBirth()).atStartOfDay());
    }
    if (userDto.getUserType() != null) {
      existingUser.setUserType(userDto.getUserType());
    }
    userRepository.save(existingUser);
  }

  @Override
  public List<UserDto> getAllUsers() {
    return userRepository.findAll().stream().map(UserMapper::toDto).toList();
  }

  @Override
  public void changeProfilePicture(String username, String base64Image) {
    UserEntity user =
        userRepository
            .findByUsername(username)
            .orElseThrow(() -> new UserNotFoundException("There's no user with this username"));
    user.setProfilePicture(base64Image);
    userRepository.save(user);
  }

  @Override
  public void changePassword(String username, String oldPassword, String newPassword) {
    UserEntity user =
        userRepository
            .findByUsername(username)
            .orElseThrow(() -> new UserNotFoundException("There's no user with this username"));
    if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
      throw new IllegalArgumentException("Old password is incorrect");
    }
    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);
  }

  @Override
  public boolean existsByUsername(String username) {
    return userRepository.findByUsername(username).isPresent();
  }

  @Override
  public boolean existsByEmail(String email) {
    return userRepository.findByEmail(email).isPresent();
  }

  @Override
  public UserDto registerNewUser(
      String firstName, String lastName, String username, String email, String encodedPassword) {
    UserEntity user = new UserEntity();
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(encodedPassword);
    UserEntity saved = userRepository.save(user);
    return UserMapper.toDto(saved);
  }

  @Override
  public UserDto findByIdentifier(String identifier) {
    Optional<UserEntity> user = userRepository.findByEmail(identifier);
    if (user.isEmpty()) {
      user = userRepository.findByUsername(identifier);
    }
    return user.map(UserMapper::toDto)
        .orElseThrow(() -> new UserNotFoundException("Invalid username/email"));
  }

  @Override
  public String getEncodedPassword(String identifier) {
    Optional<UserEntity> user = userRepository.findByEmail(identifier);
    if (user.isEmpty()) {
      user = userRepository.findByUsername(identifier);
    }
    return user.map(UserEntity::getPassword)
        .orElseThrow(() -> new UserNotFoundException("Invalid username/email"));
  }
}
