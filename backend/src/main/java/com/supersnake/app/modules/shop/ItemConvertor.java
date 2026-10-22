package com.supersnake.app.modules.shop;

import com.supersnake.app.modules.shop.ItemDto;
import com.supersnake.app.modules.shop.Item;

public class ItemConvertor {
    public static ItemDto toDto(Item item) {
        if (item == null) {
            return null;
        }
        ItemDto dto = new ItemDto();
        dto.setItemCode(item.getItemCode());
        dto.setName(item.getName());
        dto.setType(item.getType());
        dto.setImage(item.getImage());
        dto.setPriceCoins(item.getPriceCoins());
        dto.setPriceCash(item.getPriceCash());
        return dto;
    }

    public static Item toEntity(ItemDto dto) {
        if (dto == null) {
            return null;
        }
        Item item = new Item();
        item.setItemCode(dto.getItemCode());
        item.setName(dto.getName());
        item.setType(dto.getType());
        item.setImage(dto.getImage());
        item.setPriceCoins(dto.getPriceCoins());
        item.setPriceCash(dto.getPriceCash());
        return item;
    }
}
