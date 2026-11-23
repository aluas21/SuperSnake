package com.supersnake.shop.exception;

public class ItemAlreadyExistsException extends RuntimeException {
  public ItemAlreadyExistsException(String message) {
    super(message);
  }
}
