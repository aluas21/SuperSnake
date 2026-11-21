package com.supersnake.app.modules.shop;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface InventoryRepository extends JpaRepository<Inventory, Long> {
  Optional<Inventory> findByUserId(Long userId);
}
