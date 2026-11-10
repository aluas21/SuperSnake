<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/auth/UserWithTokenDto.java
package com.supersnake.app.modules.auth;
========
package com.supersnake.app.modules.auth.dto;
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/modules/auth/dto/UserWithTokenDto.java

import com.supersnake.app.modules.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserWithTokenDto extends UserDto {
    private String token;

    public UserWithTokenDto(String firstName, String lastName, String username, String email,
                            String profilePicture, String phone, String dateOfBirth, String userType, String token) {
        super(firstName, lastName, username, email, profilePicture, phone, dateOfBirth, userType);
        this.token = token;
    }
}
