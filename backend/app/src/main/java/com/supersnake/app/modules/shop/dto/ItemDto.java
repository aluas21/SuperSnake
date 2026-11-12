package com.supersnake.app.modules.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private Long itemCode;
    private String name;
    private String type;
    private String image;
    private int priceCoins;
    private int priceCash;
}
