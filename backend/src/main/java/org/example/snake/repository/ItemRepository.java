package org.example.snake.repository;

import org.example.snake.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    // Additional query methods can be defined here if needed
}
