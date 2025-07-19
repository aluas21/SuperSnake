package org.example.snake.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "game", indexes = {
        @Index(name = "idx_user_id", columnList = "user_id"),
        @Index(name = "idx_opponent_id", columnList = "opponent_id")
})
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long gameCode;

    // The user who played the game
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // The opponent (optional)
    @ManyToOne
    @JoinColumn(name = "opponent_id", nullable = true)
    private User opponent;

    private int score1;

    private int score2;

    private String dateTime;

    private int duration; // Duration of the game in seconds

    @ManyToOne
    @JoinColumn(name = "game_settings_id", nullable = false)
    private GameSettings gameSettings; // Reference to the GameSettings object for this game
}
