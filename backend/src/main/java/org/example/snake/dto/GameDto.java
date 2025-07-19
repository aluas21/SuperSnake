package org.example.snake.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GameDto {
    private Long gameCode;
    private String username;
    private String usernameOpponent;
    private int score1;
    private int score2;
    private String dateTime;
    private int duration;
    private GameSettingsDto gameSettings; // Reference to the GameSettings object for this game
}
