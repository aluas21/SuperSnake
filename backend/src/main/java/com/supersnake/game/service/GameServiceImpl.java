package com.supersnake.game.service;

import com.supersnake.game.db.entity.GameEntity;
import com.supersnake.game.db.entity.GameSettingsEntity;
import com.supersnake.game.db.repository.GameRepository;
import com.supersnake.game.dto.GameDto;
import com.supersnake.game.dto.GameSettingsDto;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameServiceImpl implements GameService {

  @Autowired private GameRepository gameRepository;

  @Override
  public GameDto saveGame(GameDto dto) {
    GameEntity game = new GameEntity();
    game.setGameCode(dto.getGameCode());
    game.setUserId(dto.getUserId());
    game.setOpponentId(dto.getOpponentId());
    game.setScore(dto.getScore());
    game.setOpponentScore(dto.getOpponentScore());
    game.setDateTime(dto.getDateTime());
    game.setDuration(dto.getDuration());

    if (dto.getGameSettings() != null) {
      GameSettingsEntity settings = new GameSettingsEntity();
      settings.setGameMode(dto.getGameSettings().getGameMode());
      settings.setNumberOfApples(dto.getGameSettings().getNumberOfApples());
      settings.setWalls(dto.getGameSettings().isWalls());
      settings.setSpeed(dto.getGameSettings().getSpeed());
      game.setGameSettings(settings);
    }

    GameEntity saved = gameRepository.save(game);
    return toDto(saved);
  }

  @Override
  public GameDto findByGameCode(Long gameCode) {
    return gameRepository.findByGameCode(gameCode).map(this::toDto).orElse(null);
  }

  @Override
  public List<GameDto> findGamesByUserId(Long userId) {
    return gameRepository.findByUserId(userId).stream().map(this::toDto).toList();
  }

  private GameDto toDto(GameEntity game) {
    GameDto dto = new GameDto();
    dto.setGameCode(game.getGameCode());
    dto.setUserId(game.getUserId());
    dto.setOpponentId(game.getOpponentId());
    dto.setScore(game.getScore());
    dto.setOpponentScore(game.getOpponentScore());
    dto.setDateTime(game.getDateTime());
    dto.setDuration(game.getDuration());

    if (game.getGameSettings() != null) {
      GameSettingsDto settingsDto = new GameSettingsDto();
      settingsDto.setGameMode(game.getGameSettings().getGameMode());
      settingsDto.setNumberOfApples(game.getGameSettings().getNumberOfApples());
      settingsDto.setWalls(game.getGameSettings().isWalls());
      settingsDto.setSpeed(game.getGameSettings().getSpeed());
      dto.setGameSettings(settingsDto);
    }
    return dto;
  }
}
