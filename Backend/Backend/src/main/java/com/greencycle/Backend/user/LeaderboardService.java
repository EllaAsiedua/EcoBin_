package com.greencycle.Backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {
    
    private final UserRepository userRepository;

    @Autowired
    public LeaderboardService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<LeaderboardEntry> getLeaderboard() {
        try {
            List<User> users = userRepository.findAllByOrderByTotalScoreDesc();
            
            return users.stream()
                    .map(user -> new LeaderboardEntry(
                        user.getId(),
                        user.getName(),
                        user.getTotalScore() != null ? user.getTotalScore() : 0,
                        user.getDumpsReported() != null ? user.getDumpsReported() : 0,
                        user.getSpotsAdopted() != null ? user.getSpotsAdopted() : 0,
                        user.getMarketplaceSales() != null ? user.getMarketplaceSales() : 0,
                        user.getCleanupSessions() != null ? user.getCleanupSessions() : 0,
                        user.getCycleTokensEarned() != null ? user.getCycleTokensEarned() : 0,
                        generateBadges(user)
                    ))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            // Return empty list if there's an error
            return new java.util.ArrayList<>();
        }
    }

    public LeaderboardEntry getUserStats(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;
        
        return new LeaderboardEntry(
            user.getId(),
            user.getName(),
            user.getTotalScore(),
            user.getDumpsReported(),
            user.getSpotsAdopted(),
            user.getMarketplaceSales(),
            user.getCleanupSessions(),
            user.getCycleTokensEarned(),
            generateBadges(user)
        );
    }

    private List<String> generateBadges(User user) {
        List<String> badges = new java.util.ArrayList<>();
        
        // Safely get values with null checks
        Integer dumpsReported = user.getDumpsReported() != null ? user.getDumpsReported() : 0;
        Integer spotsAdopted = user.getSpotsAdopted() != null ? user.getSpotsAdopted() : 0;
        Integer marketplaceSales = user.getMarketplaceSales() != null ? user.getMarketplaceSales() : 0;
        Integer cleanupSessions = user.getCleanupSessions() != null ? user.getCleanupSessions() : 0;
        Integer cycleTokensEarned = user.getCycleTokensEarned() != null ? user.getCycleTokensEarned() : 0;
        
        // Top Cleaner badge (highest dumps reported)
        if (dumpsReported >= 10) {
            badges.add("🏆");
        }
        
        // Spot Adopter badge
        if (spotsAdopted >= 1) {
            badges.add("🌳");
        }
        
        // Marketplace Seller badge
        if (marketplaceSales >= 5) {
            badges.add("🛒");
        }
        
        // Cleanup Champion badge
        if (cleanupSessions >= 3) {
            badges.add("🧹");
        }
        
        // Token Collector badge
        if (cycleTokensEarned >= 100) {
            badges.add("💰");
        }
        
        return badges;
    }

    public void updateUserScore(Long userId, String activityType, Integer points) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return;

        switch (activityType.toLowerCase()) {
            case "dump_report":
                user.addDumpReport();
                break;
            case "spot_adopted":
                user.addSpotAdopted();
                break;
            case "marketplace_sale":
                user.addMarketplaceSale();
                break;
            case "cleanup_session":
                user.addCleanupSession();
                break;
            case "cycle_tokens":
                user.addCycleTokens(points);
                break;
        }

        userRepository.save(user);
    }

    public static class LeaderboardEntry {
        private Long id;
        private String name;
        private Integer totalScore;
        private Integer dumpsReported;
        private Integer spotsAdopted;
        private Integer marketplaceSales;
        private Integer cleanupSessions;
        private Integer cycleTokensEarned;
        private List<String> badges;

        public LeaderboardEntry(Long id, String name, Integer totalScore, 
                              Integer dumpsReported, Integer spotsAdopted, 
                              Integer marketplaceSales, Integer cleanupSessions, 
                              Integer cycleTokensEarned, List<String> badges) {
            this.id = id;
            this.name = name;
            this.totalScore = totalScore;
            this.dumpsReported = dumpsReported;
            this.spotsAdopted = spotsAdopted;
            this.marketplaceSales = marketplaceSales;
            this.cleanupSessions = cleanupSessions;
            this.cycleTokensEarned = cycleTokensEarned;
            this.badges = badges;
        }

        // Getters
        public Long getId() { return id; }
        public String getName() { return name; }
        public Integer getTotalScore() { return totalScore; }
        public Integer getDumpsReported() { return dumpsReported; }
        public Integer getSpotsAdopted() { return spotsAdopted; }
        public Integer getMarketplaceSales() { return marketplaceSales; }
        public Integer getCleanupSessions() { return cleanupSessions; }
        public Integer getCycleTokensEarned() { return cycleTokensEarned; }
        public List<String> getBadges() { return badges; }
    }
} 