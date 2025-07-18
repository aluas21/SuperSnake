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

    // The user who played the game
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // The opponent (optional)
    @ManyToOne
    @JoinColumn(name = "opponent_id", nullable = true)
    private User opponent;

    private int score;

    private String dateTime;
}
