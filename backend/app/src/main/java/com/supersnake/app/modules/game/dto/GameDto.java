package com.supersnake.app.modules.game.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameDto {
    private Long gameCode;
    private Long userId;
    private Long opponentId;
    private int score;
    private int opponentScore;
    private LocalDateTime dateTime;
    private int duration;
    private GameSettingsDto gameSettings;
}
