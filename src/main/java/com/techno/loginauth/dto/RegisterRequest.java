package com.techno.loginauth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank String name,
        @Email String email,
        @Size(min = 6, message = "Password minimal 6 karakter") String password
) {}
