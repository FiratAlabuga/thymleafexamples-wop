package com.example.thymleafexamples.controller;

import com.example.thymleafexamples.controller.request.AuthRequest;
import com.example.thymleafexamples.dto.UserDTO;
import com.example.thymleafexamples.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    @GetMapping("/login")
    public String showLoginPage() {
        return "auth/login"; // login.html sayfasını göster
    }

    @GetMapping("/register")
    public String showRegisterPage() {
        return "auth/register"; // register.html sayfasını göster
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            var authResponse = userService.login(authRequest);
            String token = authResponse.getToken();

            return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, "Bearer " + token).body(authResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kullanıcı adı veya şifre yanlış!");
        }
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