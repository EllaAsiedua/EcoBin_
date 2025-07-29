package com.greencycle.Backend.search;

import com.greencycle.Backend.dump.DumpReportService;
import com.greencycle.Backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    private final SearchService searchService;
    private final DumpReportService dumpReportService;
    private final UserService userService;

    @Autowired
    public SearchController(SearchService searchService, DumpReportService dumpReportService, UserService userService) {
        this.searchService = searchService;
        this.dumpReportService = dumpReportService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<SearchResponse> search(
            @RequestParam String q,
            @RequestParam(required = false, defaultValue = "all") String type,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(required = false, defaultValue = "10") Integer radius
    ) {
        SearchResponse response = searchService.search(q, type, latitude, longitude, radius);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/dumps")
    public ResponseEntity<List<DumpSearchResult>> searchDumps(
            @RequestParam String q,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double longitude,
            @RequestParam(required = false, defaultValue = "10") Integer radius
    ) {
        List<DumpSearchResult> results = searchService.searchDumps(q, latitude, longitude, radius);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserSearchResult>> searchUsers(@RequestParam String q) {
        List<UserSearchResult> results = searchService.searchUsers(q);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/marketplace")
    public ResponseEntity<List<MarketplaceSearchResult>> searchMarketplace(@RequestParam String q) {
        List<MarketplaceSearchResult> results = searchService.searchMarketplace(q);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<String>> getSearchSuggestions(@RequestParam String q) {
        List<String> suggestions = searchService.getSearchSuggestions(q);
        return ResponseEntity.ok(suggestions);
    }
} 