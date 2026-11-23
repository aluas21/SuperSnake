package com.supersnake.game.db.repository;

import com.supersnake.game.db.entity.GameEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<GameEntity, Long> {
  Optional<GameEntity> findByGameCode(Long gameCode);

  List<GameEntity> findByUserId(Long userId);
}
