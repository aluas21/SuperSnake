package org.example.snake.model;
import java.time.LocalDate;
import java.util.List;

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
@Table(name = "users")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String password;

    // Store as URL or file path
    private String profilePicture;

    private String phone;

    private LocalDate dateOfBirth;

    private int coins;

    private boolean isAdmin;

    @ManyToMany
    @JoinTable(
        name = "user_friends",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private List<User> friends;


    @OneToMany(mappedBy = "user")
    private List<Game> gamesPlayed;

    @OneToMany(mappedBy = "opponent")
    private List<Game> gamesAsOpponent;
}
