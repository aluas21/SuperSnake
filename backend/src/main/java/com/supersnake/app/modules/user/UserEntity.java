package com.supersnake.app.modules.user;
<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/user/User.java
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
========
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/modules/user/UserEntity.java

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Lob
    private String profilePicture;

    private String phone;

    private LocalDateTime dateOfBirth;

    @Column(nullable = false)
    private String userType = "USER";

    @ManyToMany
    @JoinTable(
            name = "user_friends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
<<<<<<<< HEAD:backend/src/main/java/com/supersnake/app/modules/user/User.java
    private List<User> friends = new ArrayList<>();


========
    private List<UserEntity> friends = new ArrayList<>();
>>>>>>>> origin/dev/mihai:backend/src/main/java/com/supersnake/app/modules/user/UserEntity.java
}
