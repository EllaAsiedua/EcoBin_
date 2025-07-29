package com.greencycle.Backend.user;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles = new HashSet<>();

    @Column(name = "wallet_address")
    private String walletAddress;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Leaderboard scoring fields
    @Column(name = "total_score", nullable = false)
    private Integer totalScore = 0;

    @Column(name = "dumps_reported", nullable = false)
    private Integer dumpsReported = 0;

    @Column(name = "spots_adopted", nullable = false)
    private Integer spotsAdopted = 0;

    @Column(name = "marketplace_sales", nullable = false)
    private Integer marketplaceSales = 0;

    @Column(name = "cleanup_sessions", nullable = false)
    private Integer cleanupSessions = 0;

    @Column(name = "cycle_tokens_earned", nullable = false)
    private Integer cycleTokensEarned = 0;

    public User() {}

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Set<String> getRoles() { return roles; }
    public void setRoles(Set<String> roles) { this.roles = roles; }

    public String getWalletAddress() { return walletAddress; }
    public void setWalletAddress(String walletAddress) { this.walletAddress = walletAddress; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Leaderboard scoring getters and setters
    public Integer getTotalScore() { return totalScore; }
    public void setTotalScore(Integer totalScore) { this.totalScore = totalScore; }

    public Integer getDumpsReported() { return dumpsReported; }
    public void setDumpsReported(Integer dumpsReported) { this.dumpsReported = dumpsReported; }

    public Integer getSpotsAdopted() { return spotsAdopted; }
    public void setSpotsAdopted(Integer spotsAdopted) { this.spotsAdopted = spotsAdopted; }

    public Integer getMarketplaceSales() { return marketplaceSales; }
    public void setMarketplaceSales(Integer marketplaceSales) { this.marketplaceSales = marketplaceSales; }

    public Integer getCleanupSessions() { return cleanupSessions; }
    public void setCleanupSessions(Integer cleanupSessions) { this.cleanupSessions = cleanupSessions; }

    public Integer getCycleTokensEarned() { return cycleTokensEarned; }
    public void setCycleTokensEarned(Integer cycleTokensEarned) { this.cycleTokensEarned = cycleTokensEarned; }

    // Method to calculate total score based on activities
    public void calculateTotalScore() {
        this.totalScore = (dumpsReported * 10) + 
                         (spotsAdopted * 25) + 
                         (marketplaceSales * 5) + 
                         (cleanupSessions * 50) + 
                         (cycleTokensEarned * 2);
    }

    // Method to add points for different activities
    public void addDumpReport() {
        this.dumpsReported++;
        calculateTotalScore();
    }

    public void addSpotAdopted() {
        this.spotsAdopted++;
        calculateTotalScore();
    }

    public void addMarketplaceSale() {
        this.marketplaceSales++;
        calculateTotalScore();
    }

    public void addCleanupSession() {
        this.cleanupSessions++;
        calculateTotalScore();
    }

    public void addCycleTokens(Integer tokens) {
        this.cycleTokensEarned += tokens;
        calculateTotalScore();
    }
} 