package com.supersnake.shop.db.repository;

import com.supersnake.shop.db.entity.InventoryEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryEntity, Long> {
  Optional<InventoryEntity> findByUserId(Long userId);
}
