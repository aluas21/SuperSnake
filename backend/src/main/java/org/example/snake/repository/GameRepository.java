package org.example.snake.repository;

import org.example.snake.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    // Additional query methods can be defined here if needed
}
