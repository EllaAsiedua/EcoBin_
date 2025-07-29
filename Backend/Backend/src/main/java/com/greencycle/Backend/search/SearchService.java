package com.greencycle.Backend.search;

import com.greencycle.Backend.dump.DumpReport;
import com.greencycle.Backend.dump.DumpReportRepository;
import com.greencycle.Backend.user.User;
import com.greencycle.Backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SearchService {
    private final DumpReportRepository dumpReportRepository;
    private final UserRepository userRepository;

    @Autowired
    public SearchService(DumpReportRepository dumpReportRepository, UserRepository userRepository) {
        this.dumpReportRepository = dumpReportRepository;
        this.userRepository = userRepository;
    }

    public SearchResponse search(String query, String type, Double latitude, Double longitude, Integer radius) {
        SearchResponse response = new SearchResponse();
        
        if ("all".equals(type) || "dumps".equals(type)) {
            response.setDumps(searchDumps(query, latitude, longitude, radius));
        }
        
        if ("all".equals(type) || "users".equals(type)) {
            response.setUsers(searchUsers(query));
        }
        
        if ("all".equals(type) || "marketplace".equals(type)) {
            response.setMarketplace(searchMarketplace(query));
        }
        
        return response;
    }

    public List<DumpSearchResult> searchDumps(String query, Double latitude, Double longitude, Integer radius) {
        List<DumpReport> allDumps = dumpReportRepository.findAll();
        
        return allDumps.stream()
                .filter(dump -> matchesQuery(dump, query))
                .filter(dump -> isWithinRadius(dump, latitude, longitude, radius))
                .map(this::convertToDumpSearchResult)
                .collect(Collectors.toList());
    }

    public List<UserSearchResult> searchUsers(String query) {
        List<User> allUsers = userRepository.findAll();
        
        return allUsers.stream()
                .filter(user -> matchesUserQuery(user, query))
                .map(this::convertToUserSearchResult)
                .collect(Collectors.toList());
    }

    public List<MarketplaceSearchResult> searchMarketplace(String query) {
        // Mock marketplace data - replace with actual marketplace repository
        List<MarketplaceSearchResult> mockItems = Arrays.asList(
            new MarketplaceSearchResult("1", "Upcycled Plastic Bottles", "Beautiful planters made from recycled bottles", "Artisan Market", 80.0, "Felix", true),
            new MarketplaceSearchResult("2", "Recycled Wood Furniture", "Handcrafted furniture from reclaimed wood", "Craft Market", 150.0, "Sarah", true),
            new MarketplaceSearchResult("3", "Eco-friendly Bags", "Bags made from recycled materials", "Green Market", 45.0, "John", false)
        );
        
        return mockItems.stream()
                .filter(item -> matchesMarketplaceQuery(item, query))
                .collect(Collectors.toList());
    }

    public List<String> getSearchSuggestions(String query) {
        List<String> suggestions = new ArrayList<>();
        
        if (query.length() < 2) {
            return suggestions;
        }
        
        // Add common search terms
        suggestions.addAll(Arrays.asList(
            "Plastic waste",
            "Community cleanup",
            "Upcycled items",
            "Eco warriors",
            "Recycling center",
            "Green initiatives"
        ));
        
        // Filter suggestions based on query
        return suggestions.stream()
                .filter(suggestion -> suggestion.toLowerCase().contains(query.toLowerCase()))
                .limit(5)
                .collect(Collectors.toList());
    }

    private boolean matchesQuery(DumpReport dump, String query) {
        if (query == null || query.trim().isEmpty()) {
            return true;
        }
        
        String lowerQuery = query.toLowerCase();
        return (dump.getDescription() != null && dump.getDescription().toLowerCase().contains(lowerQuery)) ||
               (dump.getLocation() != null && dump.getLocation().toLowerCase().contains(lowerQuery)) ||
               (dump.getReportType() != null && dump.getReportType().toLowerCase().contains(lowerQuery));
    }

    private boolean matchesUserQuery(User user, String query) {
        if (query == null || query.trim().isEmpty()) {
            return true;
        }
        
        String lowerQuery = query.toLowerCase();
        return (user.getName() != null && user.getName().toLowerCase().contains(lowerQuery)) ||
               (user.getEmail() != null && user.getEmail().toLowerCase().contains(lowerQuery));
    }

    private boolean matchesMarketplaceQuery(MarketplaceSearchResult item, String query) {
        if (query == null || query.trim().isEmpty()) {
            return true;
        }
        
        String lowerQuery = query.toLowerCase();
        return (item.getTitle() != null && item.getTitle().toLowerCase().contains(lowerQuery)) ||
               (item.getDescription() != null && item.getDescription().toLowerCase().contains(lowerQuery)) ||
               (item.getLocation() != null && item.getLocation().toLowerCase().contains(lowerQuery)) ||
               (item.getArtisan() != null && item.getArtisan().toLowerCase().contains(lowerQuery));
    }

    private boolean isWithinRadius(DumpReport dump, Double latitude, Double longitude, Integer radius) {
        if (latitude == null || longitude == null || radius == null) {
            return true; // If no location filter, include all
        }
        
        if (dump.getLatitude() == null || dump.getLongitude() == null) {
            return false;
        }
        
        double distance = calculateDistance(latitude, longitude, dump.getLatitude(), dump.getLongitude());
        return distance <= radius;
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        // Haversine formula for calculating distance between two points
        final int R = 6371; // Earth's radius in kilometers
        
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    }

    private DumpSearchResult convertToDumpSearchResult(DumpReport dump) {
        DumpSearchResult result = new DumpSearchResult();
        result.setId(dump.getId().toString());
        result.setTitle(dump.getReportType() + " Dump");
        result.setDescription(dump.getDescription());
        result.setLocation(dump.getLocation());
        result.setPhotoUrl(dump.getPhotoUrl());
        result.setLatitude(dump.getLatitude());
        result.setLongitude(dump.getLongitude());
        result.setCreatedAt(dump.getCreatedAt());
        return result;
    }

    private UserSearchResult convertToUserSearchResult(User user) {
        UserSearchResult result = new UserSearchResult();
        result.setId(user.getId().toString());
        result.setName(user.getName());
        result.setEmail(user.getEmail());
        result.setWalletAddress(user.getWalletAddress());
        result.setVerified(user.getRoles().contains("VERIFIED"));
        return result;
    }
} 