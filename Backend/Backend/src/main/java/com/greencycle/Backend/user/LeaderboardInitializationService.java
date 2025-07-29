package com.greencycle.Backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class LeaderboardInitializationService implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final LeaderboardService leaderboardService;

    @Autowired
    public LeaderboardInitializationService(UserRepository userRepository, LeaderboardService leaderboardService) {
        this.userRepository = userRepository;
        this.leaderboardService = leaderboardService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if we have any users with scores
        long userCount = userRepository.count();
        System.out.println("Total users in database: " + userCount);
        
        if (userCount > 0) {
            // Update existing users with some sample scores for testing
            userRepository.findAll().forEach(user -> {
                if (user.getTotalScore() == null || user.getTotalScore() == 0) {
                    // Add some sample data
                    user.setDumpsReported(5);
                    user.setSpotsAdopted(2);
                    user.setMarketplaceSales(3);
                    user.setCleanupSessions(1);
                    user.setCycleTokensEarned(50);
                    user.calculateTotalScore();
                    userRepository.save(user);
                    System.out.println("Updated user " + user.getName() + " with sample scores");
                }
            });
        }
    }
} 