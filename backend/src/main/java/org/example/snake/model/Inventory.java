package org.example.snake.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The user who owns the item
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // The item the user owns
    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;


}
