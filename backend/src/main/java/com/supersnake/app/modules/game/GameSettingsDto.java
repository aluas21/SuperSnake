package com.supersnake.app.modules.game;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GameSettingsDto {
    private String gameMode;
    private int numberOfApples;
    private boolean walls;
    private String speed;
}
