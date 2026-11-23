package com.supersnake.shop.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDto {
  private Long userId;
  private List<ItemDto> items = new ArrayList<>();
  private int coins;
  private int cash;
}
