package com.supersnake.game.service;

import com.supersnake.game.dto.GameDto;
import java.util.List;

public interface GameService {
  GameDto saveGame(GameDto gameDto);

  GameDto findByGameCode(Long gameCode);

  List<GameDto> findGamesByUserId(Long userId);
}
