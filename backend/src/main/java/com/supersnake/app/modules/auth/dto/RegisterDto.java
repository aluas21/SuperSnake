<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/auth/RegisterDto.java
package com.supersnake.app.modules.auth;
========
package com.supersnake.app.modules.auth.dto;
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/modules/auth/dto/RegisterDto.java

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
}
