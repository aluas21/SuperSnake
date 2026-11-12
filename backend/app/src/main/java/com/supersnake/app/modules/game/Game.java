package com.supersnake.app.modules.game;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "game", indexes = {
        @Index(name = "idx_user_id", columnList = "user_id"),
        @Index(name = "idx_opponent_id", columnList = "opponent_id")
})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long gameCode;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "opponent_id")
    private Long opponentId;

    private int score;

    @Column(name = "opponent_score")
    private int opponentScore;

    private LocalDateTime dateTime;

    private int duration;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "game_settings_id", nullable = false)
    private GameSettings gameSettings;
}
