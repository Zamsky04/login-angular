package com.techno.loginauth.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
// Ganti URL origin frontend Anda jika berbeda
@CrossOrigin(origins = "http://localhost:4200") 
public class UserController {

    /**
     * Endpoint untuk mendapatkan detail user yang sedang login.
     * Spring Security akan secara otomatis menyediakan objek User
     * yang sudah terotentikasi melalui @AuthenticationPrincipal.
     */
    @GetMapping("/me")
    public ResponseEntity<User> getMe(@AuthenticationPrincipal User currentUser) {
        // Objek currentUser sudah berisi data pengguna yang login (tanpa password)
        // karena JwtAuthFilter sudah mengaturnya di Security Context.
        return ResponseEntity.ok(currentUser);
    }
}