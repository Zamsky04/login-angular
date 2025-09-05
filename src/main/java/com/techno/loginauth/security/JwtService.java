package com.techno.loginauth.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.techno.loginauth.config.JwtProps;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    private final Key key;
    private final long expirationMs;

    public JwtService(JwtProps props) {
        if (props == null || props.getSecret() == null || props.getSecret().isBlank()) {
            throw new IllegalStateException("Missing config: app.jwt.secret");
        }
        byte[] keyBytes = props.getSecret().getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            throw new IllegalStateException("JWT secret must be at least 32 bytes (256-bit) for HS256");
        }
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.expirationMs = props.getExpirationMs();
        if (this.expirationMs <= 0) {
            throw new IllegalStateException("Missing/invalid config: app.jwt.expiration-ms");
        }
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody();
        return resolver.apply(claims);
    }

    public String generateToken(String subject, Map<String,Object> extra) {
        Date now = new Date();
        return Jwts.builder()
                .setClaims(extra)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS256)  // <— eksplisit
                .compact();
    }

    public boolean isTokenValid(String token, String username) {
        try {
            return username.equals(extractUsername(token)) &&
                   extractClaim(token, Claims::getExpiration).after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
