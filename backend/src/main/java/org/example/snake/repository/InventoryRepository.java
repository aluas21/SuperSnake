package org.example.snake.repository;

import org.example.snake.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    // Additional query methods can be defined here if needed
}
