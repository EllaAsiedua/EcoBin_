package com.greencycle.Backend.search;

public class UserSearchResult {
    private String id;
    private String name;
    private String email;
    private String walletAddress;
    private boolean verified;

    public UserSearchResult() {
    }

    public UserSearchResult(String id, String name, String email, String walletAddress, boolean verified) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.walletAddress = walletAddress;
        this.verified = verified;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }
} 