package org.example.snake.repository;

import org.example.snake.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    public Optional<Item> findByItemCode(Long itemCode);
    // Additional query methods can be defined here if needed
}
