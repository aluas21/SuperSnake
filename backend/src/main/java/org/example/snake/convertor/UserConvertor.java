package org.example.snake.convertor;

import org.example.snake.dto.UserDto;
import org.example.snake.model.User;
import java.time.LocalDate;

public class UserConvertor {
    public static User toEntity(UserDto userDto) {
        if (userDto == null) {
            return null;
        }
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setProfilePicture(userDto.getProfilePicture());
        user.setPhone(userDto.getPhone());
        //string to LocalDateTime conversion needed
        if (userDto.getDateOfBirth() != null) {
            user.setDateOfBirth(LocalDate.parse(userDto.getDateOfBirth()).atStartOfDay());
        }
        user.setUserType(userDto.getUserType());
        return user;
    }

    public static UserDto toDto(User user) {
        if (user == null) {
            return null;
        }
        UserDto userDto = new UserDto();
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setProfilePicture(user.getProfilePicture());
        userDto.setPhone(user.getPhone());
        //LocalDateTime to string conversion needed
        if (user.getDateOfBirth() != null) {
            userDto.setDateOfBirth(user.getDateOfBirth().toString());
        }
        userDto.setUserType(user.getUserType());
        return userDto;
    }
}
