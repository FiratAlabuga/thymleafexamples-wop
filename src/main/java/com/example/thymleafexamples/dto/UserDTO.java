package com.example.thymleafexamples.dto;

import com.example.thymleafexamples.core.dto.BaseDTO;
import com.example.thymleafexamples.domain.enums.Role;
import lombok.Data;

@Data
public class UserDTO extends BaseDTO {
    private String registrationNumber;
    private String fullName;
    private String username;
    private String email;
    private String password;
    private Role role;
}
