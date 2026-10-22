package com.supersnake.app.modules.shop;

import com.supersnake.app.modules.shop.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

interface InventoryRepository extends JpaRepository<Inventory, Long> {
    // Additional query methods can be defined here if needed
}
