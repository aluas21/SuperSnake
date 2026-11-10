package com.supersnake.app.modules.shop;

<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/shop/ItemService.java
import com.supersnake.app.modules.shop.ItemConvertor;
import com.supersnake.app.modules.shop.ItemDto;
import com.supersnake.app.modules.shop.ItemAlreadyExistsException;
import com.supersnake.app.modules.shop.ItemNotFoundException;
import com.supersnake.app.modules.shop.Item;
import com.supersnake.app.modules.shop.ItemRepository;
========
import com.supersnake.app.modules.shop.dto.ItemDto;
import com.supersnake.app.shared.exception.ItemAlreadyExistsException;
import com.supersnake.app.shared.exception.ItemNotFoundException;
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/modules/shop/ItemServiceImpl.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/shop/ItemService.java
class ItemService {
========
class ItemServiceImpl implements ItemService {

>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/modules/shop/ItemServiceImpl.java
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
