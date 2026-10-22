package com.supersnake.app.modules.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDto {
    private Long userId;
    private List<ItemDto> items = new ArrayList<>();
    private int coins;
    private int cash;
}
