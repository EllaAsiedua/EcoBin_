package com.greencycle.Backend.search;

import java.util.List;

public class SearchResponse {
    private List<DumpSearchResult> dumps;
    private List<UserSearchResult> users;
    private List<MarketplaceSearchResult> marketplace;

    public SearchResponse() {
    }

    public List<DumpSearchResult> getDumps() {
        return dumps;
    }

    public void setDumps(List<DumpSearchResult> dumps) {
        this.dumps = dumps;
    }

    public List<UserSearchResult> getUsers() {
        return users;
    }

    public void setUsers(List<UserSearchResult> users) {
        this.users = users;
    }

    public List<MarketplaceSearchResult> getMarketplace() {
        return marketplace;
    }

    public void setMarketplace(List<MarketplaceSearchResult> marketplace) {
        this.marketplace = marketplace;
    }
} 