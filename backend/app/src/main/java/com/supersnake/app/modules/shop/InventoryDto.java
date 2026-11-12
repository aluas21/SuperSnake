package com.supersnake.app.modules.shop;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class InventoryDto {
    private List<ItemDto> items;
    private int coins; // Total coins the user has
    private int cash; // Total cash the user has
}
