package com.greencycle.Backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {
    
    private final LeaderboardService leaderboardService;
    private final UserRepository userRepository;

    @Autowired
    public LeaderboardController(LeaderboardService leaderboardService, UserRepository userRepository) {
        this.leaderboardService = leaderboardService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<LeaderboardService.LeaderboardEntry>> getLeaderboard() {
        try {
            List<LeaderboardService.LeaderboardEntry> leaderboard = leaderboardService.getLeaderboard();
            return ResponseEntity.ok(leaderboard);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(List.of());
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testLeaderboard() {
        try {
            long userCount = userRepository.count();
            return ResponseEntity.ok("Leaderboard service is working. Total users: " + userCount);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<LeaderboardService.LeaderboardEntry> getCurrentUserStats(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(null);
        }
        
        var userOpt = userRepository.findByEmail(userDetails.getUsername());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(null);
        }
        
        User user = userOpt.get();
        LeaderboardService.LeaderboardEntry stats = leaderboardService.getUserStats(user.getId());
        return ResponseEntity.ok(stats);
    }

    @PostMapping("/update-score")
    public ResponseEntity<String> updateUserScore(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UpdateScoreRequest request) {
        
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        
        var userOpt = userRepository.findByEmail(userDetails.getUsername());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }
        
        User user = userOpt.get();
        leaderboardService.updateUserScore(user.getId(), request.getActivityType(), request.getPoints());
        return ResponseEntity.ok("Score updated successfully");
    }
}

class UpdateScoreRequest {
    private String activityType;
    private Integer points;

    public String getActivityType() { return activityType; }
    public void setActivityType(String activityType) { this.activityType = activityType; }

    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
} 