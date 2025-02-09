package com.example.thymleafexamples.controller;
import com.example.thymleafexamples.controller.request.AuthRequest;
import com.example.thymleafexamples.controller.request.AuthResponse;
import com.example.thymleafexamples.core.response.ApiResponse;
import com.example.thymleafexamples.dto.UserDTO;
import com.example.thymleafexamples.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthApiController {
    private final UserService userService;

    public AuthApiController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody UserDTO userDTO) {
        AuthResponse authResponse = userService.register(userDTO);
        return ResponseEntity.ok(ApiResponse.success(authResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody AuthRequest authRequest) {
        AuthResponse authResponse = userService.login(authRequest);
        return ResponseEntity.ok(ApiResponse.success(authResponse));
    }
}