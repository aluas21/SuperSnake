package org.example.snake.model;
import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
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

    // Store friend user IDs as a simple list (for now, not a relation)
    @ElementCollection
    private List<Long> friends;

}
