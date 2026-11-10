<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/user/UserAlreadyExistsException.java
package com.supersnake.app.modules.user;
========
package com.supersnake.app.shared.exception;
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/shared/exception/UserAlreadyExistsException.java

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
