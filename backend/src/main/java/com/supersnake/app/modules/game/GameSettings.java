package com.supersnake.app.modules.game;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
class GameSettings {
    /*
    Create a GameSettings class which should contain gameMode, numberOfApples, walls (boolean) and the speed. The Game class should have a GameSettings object.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String gameMode; // e.g., "1vs1", "online", "AI"

    @Column(nullable = false)
    private int numberOfApples; // Number of apples placed on the game table

    @Column(nullable = false)
    private boolean walls; // Whether walls are present in the game

    @Column(nullable = false)
    private String speed; // Speed of the snake, e.g. "slow", "medium", "fast"

    // Additional fields can be added as needed, such as difficulty level, time limit, etc.

}
