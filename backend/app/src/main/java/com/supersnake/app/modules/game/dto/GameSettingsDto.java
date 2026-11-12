package com.supersnake.app.modules.game.dto;

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
