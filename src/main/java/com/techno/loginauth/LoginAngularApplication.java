package com.techno.loginauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.techno.loginauth.config.JwtProps;

@SpringBootApplication
@EnableConfigurationProperties(JwtProps.class) 
public class LoginAngularApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoginAngularApplication.class, args);
    }
}
