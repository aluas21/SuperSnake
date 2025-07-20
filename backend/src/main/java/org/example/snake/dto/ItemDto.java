package org.example.snake.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ItemDto {
    private Long itemCode;
    private String name;
    private String type; // e.g., "skin", "power-up", "boost"
    private String image; // URL or path to the item's image
    private int priceCoins;
    private int priceCash;

    // Additional fields can be added as needed, such as description, rarity, etc.
}
