package com.example.thymleafexamples.domain;

import com.example.thymleafexamples.core.domain.BaseEntity;
import com.example.thymleafexamples.domain.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Table(name = "users")
public class User extends BaseEntity {
    @Column(name = "UUID")
    private String uuid;

    @Column(name = "REGISTRATION_NUMBER")
    private String registrationNumber;

    @Column(name = "FULL_NAME")
    private String fullName;

    @Column(name = "USER_NAME")
    private String username;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "ROLE")
    private Role role;
}
