<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/game/GameSettingsDto.java
package com.supersnake.app.modules.game;
========
package com.supersnake.app.modules.game.dto;
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/modules/game/dto/GameSettingsDto.java

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameSettingsDto {
    private String gameMode;
    private int numberOfApples;
    private boolean walls;
    private String speed;
}
