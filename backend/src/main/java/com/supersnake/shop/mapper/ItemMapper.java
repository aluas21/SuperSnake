package com.supersnake.shop.mapper;

import com.supersnake.shop.db.entity.ItemEntity;
import com.supersnake.shop.dto.ItemDto;

public class ItemMapper {
  public static ItemDto toDto(ItemEntity item) {
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

  public static ItemEntity toEntity(ItemDto dto) {
    if (dto == null) {
      return null;
    }
    ItemEntity item = new ItemEntity();
    item.setItemCode(dto.getItemCode());
    item.setName(dto.getName());
    item.setType(dto.getType());
    item.setImage(dto.getImage());
    item.setPriceCoins(dto.getPriceCoins());
    item.setPriceCash(dto.getPriceCash());
    return item;
  }
}
