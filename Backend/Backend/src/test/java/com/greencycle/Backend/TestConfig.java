package com.greencycle.Backend;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import com.greencycle.Backend.auth.JwtAuthFilter;
import com.greencycle.Backend.user.LeaderboardService;
import com.greencycle.Backend.user.UserRepository;
import com.greencycle.Backend.bin.IpfsService;

@TestConfiguration
public class TestConfig {

    @Bean
    public JwtAuthFilter jwtAuthFilter() {
        // Return a mock or a no-op implementation
        return new JwtAuthFilter() {
            // Override methods if needed
        };
    }

    @Bean
    @Primary
    public LeaderboardService leaderboardService() {
        return new LeaderboardService(null) {
            // Mock implementation for testing
        };
    }

    @Bean
    @Primary
    public IpfsService ipfsService() {
        return new IpfsService() {
            // Mock implementation for testing
        };
    }
}
