package com.example.thymleafexamples.service;

import com.example.thymleafexamples.controller.request.AuthRequest;
import com.example.thymleafexamples.controller.request.AuthResponse;
import com.example.thymleafexamples.dto.UserDTO;

public interface UserService {
    AuthResponse register(UserDTO userDTO);
    AuthResponse login(AuthRequest authRequest);
}
