<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/shop/ItemAlreadyExistsException.java
package com.supersnake.app.modules.shop;
========
package com.supersnake.app.shared.exception;
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/shared/exception/ItemAlreadyExistsException.java

public class ItemAlreadyExistsException extends RuntimeException {
    public ItemAlreadyExistsException(String message) {
        super(message);
    }
}
