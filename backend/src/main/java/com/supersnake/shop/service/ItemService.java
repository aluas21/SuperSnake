package com.supersnake.shop.service;

import com.supersnake.shop.dto.ItemDto;
import java.util.List;

public interface ItemService {
  void saveItem(ItemDto itemDto);

  ItemDto findItemByItemCode(Long itemCode);

  void deleteItem(Long itemCode);

  ItemDto updateItem(ItemDto itemDto, Long itemCode);

  List<ItemDto> getAllItems();
}
