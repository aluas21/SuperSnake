package com.supersnake.shop.db.repository;

import com.supersnake.shop.db.entity.ItemEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
  Optional<ItemEntity> findByItemCode(Long itemCode);
}
