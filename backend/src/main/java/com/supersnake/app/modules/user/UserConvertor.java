package com.supersnake.app.modules.user;

import com.supersnake.app.modules.user.dto.UserDto;

import java.time.LocalDate;

class UserConvertor {
    public static UserEntity toEntity(UserDto userDto) {
        if (userDto == null) {
            return null;
        }
        UserEntity user = new UserEntity();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setProfilePicture(userDto.getProfilePicture());
        user.setPhone(userDto.getPhone());
        if (userDto.getDateOfBirth() != null && !userDto.getDateOfBirth().isBlank()) {
            user.setDateOfBirth(LocalDate.parse(userDto.getDateOfBirth()).atStartOfDay());
        }
        if (userDto.getUserType() != null) {
            user.setUserType(userDto.getUserType());
        }
        return user;
    }

    public static UserDto toDto(UserEntity user) {
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
        if (user.getDateOfBirth() != null) {
            userDto.setDateOfBirth(user.getDateOfBirth().toLocalDate().toString());
        }
        userDto.setUserType(user.getUserType());
        return userDto;
    }
}
