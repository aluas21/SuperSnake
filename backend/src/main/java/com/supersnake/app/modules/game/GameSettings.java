package com.supersnake.app.modules.game;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "game_settings")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class GameSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String gameMode;

    @Column(nullable = false)
    private int numberOfApples;

    @Column(nullable = false)
    private boolean walls;

    @Column(nullable = false)
    private String speed;
}
