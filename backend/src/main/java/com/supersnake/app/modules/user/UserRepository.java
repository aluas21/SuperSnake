package com.supersnake.app.modules.user;

import com.supersnake.app.modules.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Additional query methods can be defined here if needed
    public Optional<User> findByUsername(String username);

    public Optional<User> findByEmail(String email);
}
