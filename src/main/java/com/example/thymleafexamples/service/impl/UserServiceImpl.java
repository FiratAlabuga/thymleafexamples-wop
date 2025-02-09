package com.example.thymleafexamples.service.impl;

import com.example.thymleafexamples.controller.request.AuthRequest;
import com.example.thymleafexamples.controller.request.AuthResponse;
import com.example.thymleafexamples.domain.User;
import com.example.thymleafexamples.dto.UserDTO;
import com.example.thymleafexamples.mapper.UserMapper;
import com.example.thymleafexamples.repository.UserRepository;
import com.example.thymleafexamples.security.CustomUserDetails;
import com.example.thymleafexamples.security.JwtService;
import com.example.thymleafexamples.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper = UserMapper.INSTANCE;

    @Override
    public AuthResponse register(UserDTO userDTO) {
        var userMapperEntity = userMapper.toEntity(userDTO);
        userMapperEntity.setUuid(UUID.randomUUID().toString());
        userMapperEntity.setPassword(passwordEncoder.encode(userMapperEntity.getPassword()));
        userRepository.save(userMapperEntity);

        String jwtToken = jwtService.generateToken(new CustomUserDetails(userMapperEntity));
        return new AuthResponse(jwtToken, userMapperEntity.getUsername(), userMapperEntity.getRole().name(), jwtService.getExpiration());
    }

    @Override
    public AuthResponse login(AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername(),
                        authRequest.getPassword()
                )
        );
        User user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String jwtToken = jwtService.generateToken(new CustomUserDetails(user));
        return new AuthResponse(jwtToken, user.getUsername(), user.getRole().name(), jwtService.getExpiration());
    }
}