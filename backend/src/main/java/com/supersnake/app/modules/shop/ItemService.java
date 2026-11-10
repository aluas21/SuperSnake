package com.supersnake.app.modules.shop;

import com.supersnake.app.modules.shop.dto.ItemDto;

import java.util.List;

public interface ItemService {
    void saveItem(ItemDto itemDto);
    ItemDto findItemByItemCode(Long itemCode);
    void deleteItem(Long itemCode);
    ItemDto updateItem(ItemDto itemDto, Long itemCode);
    List<ItemDto> getAllItems();
}
