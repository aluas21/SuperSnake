package com.supersnake.app.modules.shop;

import com.supersnake.app.modules.shop.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface ItemRepository extends JpaRepository<Item, Long> {
    public Optional<Item> findByItemCode(Long itemCode);
    // Additional query methods can be defined here if needed
}
