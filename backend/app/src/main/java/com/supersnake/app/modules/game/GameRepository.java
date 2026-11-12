package com.supersnake.app.modules.game;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
interface GameRepository extends JpaRepository<Game, Long> {
    Optional<Game> findByGameCode(Long gameCode);
    List<Game> findByUserId(Long userId);
}
