package com.greencycle.Backend;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import com.greencycle.Backend.auth.JwtAuthFilter;

@TestConfiguration
public class TestConfig {

    @Bean
    public JwtAuthFilter jwtAuthFilter() {
        // Return a mock or a no-op implementation
        return new JwtAuthFilter() {
            // Override methods if needed
        };
    }
}
