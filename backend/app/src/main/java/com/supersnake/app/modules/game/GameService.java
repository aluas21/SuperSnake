package com.supersnake.app.modules.game;

import com.supersnake.app.modules.game.dto.GameDto;

import java.util.List;

public interface GameService {
    GameDto saveGame(GameDto gameDto);
    GameDto findByGameCode(Long gameCode);
    List<GameDto> findGamesByUserId(Long userId);
}
