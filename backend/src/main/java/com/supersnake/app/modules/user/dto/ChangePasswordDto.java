<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/user/ChangePasswordDto.java
package com.supersnake.app.modules.user;
========
package com.supersnake.app.modules.user.dto;
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/modules/user/dto/ChangePasswordDto.java

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDto {
    private String oldPassword;
    private String newPassword;
}
