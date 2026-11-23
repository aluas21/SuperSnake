package com.supersnake.shop.service;

import com.supersnake.shop.db.entity.ItemEntity;
import com.supersnake.shop.db.repository.ItemRepository;
import com.supersnake.shop.dto.ItemDto;
import com.supersnake.shop.exception.ItemAlreadyExistsException;
import com.supersnake.shop.exception.ItemNotFoundException;
import com.supersnake.shop.mapper.ItemMapper;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
class ItemServiceImpl implements ItemService {

  @Autowired private ItemRepository itemRepository;

  @Override
  public void saveItem(ItemDto itemDto) {
    if (itemRepository.findByItemCode(itemDto.getItemCode()).isPresent()) {
      throw new ItemAlreadyExistsException("Item already exists with this item code");
    }
    ItemEntity item = ItemMapper.toEntity(itemDto);
    itemRepository.save(item);
  }

  @Override
  public ItemDto findItemByItemCode(Long itemCode) {
    ItemEntity item =
        itemRepository
            .findByItemCode(itemCode)
            .orElseThrow(() -> new ItemNotFoundException("Item not found with this item code"));
    return ItemMapper.toDto(item);
  }

  @Override
  public void deleteItem(Long itemCode) {
    ItemEntity item =
        itemRepository
            .findByItemCode(itemCode)
            .orElseThrow(() -> new ItemNotFoundException("Item not found with this item code"));
    itemRepository.delete(item);
  }

  @Override
  public ItemDto updateItem(ItemDto itemDto, Long itemCode) {
    ItemEntity item =
        itemRepository
            .findByItemCode(itemCode)
            .orElseThrow(() -> new ItemNotFoundException("Item not found with this item code"));
    item.setName(itemDto.getName());
    item.setType(itemDto.getType());
    item.setImage(itemDto.getImage());
    item.setPriceCoins(itemDto.getPriceCoins());
    item.setPriceCash(itemDto.getPriceCash());
    itemRepository.save(item);
    return ItemMapper.toDto(item);
  }

  @Override
  public List<ItemDto> getAllItems() {
    return itemRepository.findAll().stream().map(ItemMapper::toDto).toList();
  }
}
