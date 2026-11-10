<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/user/UserNotFoundException.java
package com.supersnake.app.modules.user;
========
package com.supersnake.app.shared.exception;
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/shared/exception/UserNotFoundException.java

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
