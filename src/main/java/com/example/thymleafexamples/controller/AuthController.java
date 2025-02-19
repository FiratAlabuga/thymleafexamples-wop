package com.example.thymleafexamples.controller;

import com.example.thymleafexamples.controller.request.AuthRequest;
import com.example.thymleafexamples.controller.request.AuthResponse;
import com.example.thymleafexamples.dto.UserDTO;
import com.example.thymleafexamples.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    /*@GetMapping("/login")
    public String showLoginPage() {
        return "auth/login"; // login.html sayfasını göster
    }*/
    @GetMapping("/login")
    public String showLoginPage() {
        return "auth/login"; // Return the view name for the login page
    }
    @PostMapping("/secure/login")
    public String login(@ModelAttribute AuthRequest authRequest, HttpServletResponse response, RedirectAttributes redirectAttributes) {
        AuthResponse authResponse = userService.login(authRequest);
        String token = authResponse.getToken();
        // "Bearer <token>" formatını Base64 ile encode et
        String bearerToken = "Bearer " + token;
        String encodedToken = Base64.getUrlEncoder().encodeToString(bearerToken.getBytes(StandardCharsets.UTF_8));

        Cookie cookie = new Cookie("Authorization", encodedToken); // Base64 ile encode edilmiş değer
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
        redirectAttributes.addFlashAttribute("token", token);
        return "redirect:/workorders/list";
    }

    @GetMapping("/register")
    public String showRegisterPage() {
        return "auth/register"; // register.html sayfasını göster
    }

    @PostMapping("/register")
    public String addWorkOrder(@ModelAttribute UserDTO userDTO,@RequestParam String confirmPassword, RedirectAttributes redirectAttributes, Model model) {
        if (!userDTO.getPassword().equals(confirmPassword)) {
            model.addAttribute("error", "Şifreler eşleşmiyor!");
            return "auth/register";
        }
        userService.register(userDTO);
        redirectAttributes.addFlashAttribute("message", "Work order added successfully!");
        return "redirect:/auth/login?success=true";
    }
    /*@PostMapping("/register")
    public String registerUser(@RequestParam String username,
                               @RequestParam String password,
                               @RequestParam String confirmPassword,
                               Model model) {
        // Şifreler eşleşmiyorsa hata mesajı göster
        if (!password.equals(confirmPassword)) {
            model.addAttribute("error", "Şifreler eşleşmiyor!");
            return "auth/register";
        }

        // Kullanıcıyı kaydetme işlemi (bu kısmı kendi servisinize göre doldurun)
        UserDTO userDTO = new UserDTO();

        return "redirect:/auth/login?success=true"; // Başarılı kayıt sonrası login sayfasına yönlendir
    }*/
}