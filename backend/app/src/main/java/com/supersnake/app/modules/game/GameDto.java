package com.supersnake.app.modules.game;

import com.supersnake.app.modules.game.dto.GameSettingsDto;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GameDto {
  private Long gameCode;
  private String username;
  private String usernameOpponent;
  private int score;
  private int OpponentScore;
  private LocalDateTime dateTime;
  private int duration;
  private GameSettingsDto gameSettings; // Reference to the GameSettings object for this game
}
