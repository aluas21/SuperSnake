package com.supersnake.app.modules.shop;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class InventoryDto {
  private List<ItemDto> items;
  private int coins; // Total coins the user has
  private int cash; // Total cash the user has
}
