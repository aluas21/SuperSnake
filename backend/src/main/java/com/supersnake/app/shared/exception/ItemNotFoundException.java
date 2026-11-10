<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/shop/ItemNotFoundException.java
package com.supersnake.app.modules.shop;
========
package com.supersnake.app.shared.exception;
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/shared/exception/ItemNotFoundException.java

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException(String message) {
        super(message);
    }
}
