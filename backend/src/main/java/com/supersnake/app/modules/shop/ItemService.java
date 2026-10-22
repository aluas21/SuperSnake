package com.supersnake.app.modules.shop;

import com.supersnake.app.modules.shop.ItemConvertor;
import com.supersnake.app.modules.shop.ItemDto;
import com.supersnake.app.modules.shop.ItemAlreadyExistsException;
import com.supersnake.app.modules.shop.ItemNotFoundException;
import com.supersnake.app.modules.shop.Item;
import com.supersnake.app.modules.shop.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    /**
     * Saves a new item to the database.
     *
     * @param itemDto the item data transfer object containing item details
     * @throws ItemAlreadyExistsException if an item with the same item code already exists
     */
    public void saveItem(ItemDto itemDto) {
        if (itemRepository.findByItemCode(itemDto.getItemCode()).isPresent()) {
            throw new ItemAlreadyExistsException("Item already exists with this name");
        }
        Item item = ItemConvertor.toEntity(itemDto);
        itemRepository.save(item);
    }

    /**
     * Finds an item by its item code.
     *
     * @param itemCode the item code of the item to find
     * @return ItemDto containing item details
     * @throws ItemNotFoundException if no item is found with the given item code
     */
    public ItemDto findItemByItemCode(Long itemCode) {
        Item item = itemRepository.findByItemCode(itemCode)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with this item code"));
        return ItemConvertor.toDto(item);
    }

    /**
     * Deletes an item by its item code.
     *
     * @param itemCode the item code of the item to delete
     * @throws ItemNotFoundException if no item is found with the given item code
     */
    public void deleteItem(Long itemCode) {
        Item item = itemRepository.findByItemCode(itemCode)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with this item code"));
        itemRepository.delete(item);
    }

    /**
     * Updates an existing item.
     *
     * @param itemDto  the item data transfer object containing updated item details
     * @param itemCode the item code of the item to update
     * @return ItemDto containing updated item details
     * @throws ItemNotFoundException if no item is found with the given item code
     */
    public ItemDto updateItem(ItemDto itemDto, Long itemCode) {
        Item item = itemRepository.findByItemCode(itemCode)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with this item code"));
        // Update the item fields with the new values from itemDto
        item.setName(itemDto.getName());
        item.setType(itemDto.getType());
        item.setImage(itemDto.getImage());
        item.setPriceCoins(itemDto.getPriceCoins());
        item.setPriceCash(itemDto.getPriceCash());
        // Save the updated item
        itemRepository.save(item);
        return ItemConvertor.toDto(item);
    }

    /**
     * Retrieves all items from the database.
     *
     * @return List of ItemDto containing details of all items
     */
    public List<ItemDto> getAllItems() {
        return itemRepository.findAll().stream()
                .map(ItemConvertor::toDto)
                .toList();
    }
}