package com.supersnake.app.modules.shop;

import com.supersnake.app.modules.shop.dto.ItemDto;
import com.supersnake.app.shared.exception.ItemAlreadyExistsException;
import com.supersnake.app.shared.exception.ItemNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public void saveItem(ItemDto itemDto) {
        if (itemRepository.findByItemCode(itemDto.getItemCode()).isPresent()) {
            throw new ItemAlreadyExistsException("Item already exists with this item code");
        }
        Item item = ItemConvertor.toEntity(itemDto);
        itemRepository.save(item);
    }

    @Override
    public ItemDto findItemByItemCode(Long itemCode) {
        Item item = itemRepository.findByItemCode(itemCode)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with this item code"));
        return ItemConvertor.toDto(item);
    }

    @Override
    public void deleteItem(Long itemCode) {
        Item item = itemRepository.findByItemCode(itemCode)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with this item code"));
        itemRepository.delete(item);
    }

    @Override
    public ItemDto updateItem(ItemDto itemDto, Long itemCode) {
        Item item = itemRepository.findByItemCode(itemCode)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with this item code"));
        item.setName(itemDto.getName());
        item.setType(itemDto.getType());
        item.setImage(itemDto.getImage());
        item.setPriceCoins(itemDto.getPriceCoins());
        item.setPriceCash(itemDto.getPriceCash());
        itemRepository.save(item);
        return ItemConvertor.toDto(item);
    }

    @Override
    public List<ItemDto> getAllItems() {
        return itemRepository.findAll().stream()
                .map(ItemConvertor::toDto)
                .toList();
    }
}
