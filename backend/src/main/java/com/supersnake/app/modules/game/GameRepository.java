package com.supersnake.app.modules.game;

import com.supersnake.app.modules.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface GameRepository extends JpaRepository<Game, Long> {
    // Additional query methods can be defined here if needed
}
