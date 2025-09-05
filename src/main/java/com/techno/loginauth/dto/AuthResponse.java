package com.techno.loginauth.dto;

public record AuthResponse(String token, String name, String email, String role) {}