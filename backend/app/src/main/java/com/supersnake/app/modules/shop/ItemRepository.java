package com.supersnake.app.modules.shop;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface ItemRepository extends JpaRepository<Item, Long> {
  Optional<Item> findByItemCode(Long itemCode);
}
