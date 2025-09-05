package com.techno.loginauth.auth;

import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.techno.loginauth.dto.AuthResponse;
import com.techno.loginauth.dto.LoginRequest;
import com.techno.loginauth.dto.RegisterRequest;
import com.techno.loginauth.security.JwtService;
import com.techno.loginauth.user.Role;
import com.techno.loginauth.user.User;
import com.techno.loginauth.user.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository repo, PasswordEncoder enc, AuthenticationManager am, JwtService jwt) {
        this.userRepository = repo;
        this.encoder = enc;
        this.authenticationManager = am;
        this.jwtService = jwt;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) throw new RuntimeException("Email already used");
        User user = User.builder()
                .name(req.name())
                .email(req.email())
                .password(encoder.encode(req.password()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail(), Map.of("role", user.getRole().name(), "name", user.getName()));
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole().name());
    }

    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));
        User user = userRepository.findByEmail(req.email()).orElseThrow();
        String token = jwtService.generateToken(user.getEmail(), Map.of("role", user.getRole().name(), "name", user.getName()));
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole().name());
    }
}