package com.supersnake.app.modules.shop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findByItemCode(Long itemCode);
}
