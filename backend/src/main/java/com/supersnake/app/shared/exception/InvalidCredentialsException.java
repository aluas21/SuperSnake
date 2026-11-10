<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/auth/InvalidCredentialsException.java
package com.supersnake.app.modules.auth;
========
package com.supersnake.app.shared.exception;
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/shared/exception/InvalidCredentialsException.java

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
