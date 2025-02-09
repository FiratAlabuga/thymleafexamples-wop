package com.example.thymleafexamples.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String username;
    private String role;
    private long expiresIn; // Token'ın süresi (milisaniye cinsinden)
}