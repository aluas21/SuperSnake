package com.supersnake.app.modules.game;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface GameRepository extends JpaRepository<Game, Long> {
  Optional<Game> findByGameCode(Long gameCode);

  List<Game> findByUserId(Long userId);
}
