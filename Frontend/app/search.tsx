import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SearchResult = {
  id: string;
  type: 'dump' | 'marketplace' | 'user';
  title: string;
  description: string;
  location?: string;
  photoUrl?: string;
  price?: number;
  artisan?: string;
  verified?: boolean;
  distance?: number;
};

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'dump',
    title: 'Plastic Waste Dump',
    description: 'Large collection of plastic bottles and containers',
    location: 'Central Park, Accra',
    photoUrl: 'https://example.com/photo1.jpg',
    distance: 0.5
  },
  {
    id: '2',
    type: 'marketplace',
    title: 'Upcycled Plastic Bottles',
    description: 'Beautiful planters made from recycled bottles',
    location: 'Artisan Market',
    price: 80,
    artisan: 'Felix',
    verified: true
  },
  {
    id: '3',
    type: 'user',
    title: 'Eco Warrior',
    description: 'Active community member with 50+ cleanups',
    location: 'Accra, Ghana',
    verified: true
  }
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'dumps' | 'marketplace' | 'users'>('all');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const filters = [
    { key: 'all', label: 'All', icon: 'search' },
    { key: 'dumps', label: 'Dumps', icon: 'delete' },
    { key: 'marketplace', label: 'Market', icon: 'shopping' },
    { key: 'users', label: 'Users', icon: 'people' }
  ];

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`http://172.20.10.2:8081/api/search/suggestions?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      } else {
        // Fallback suggestions
        setSuggestions(['Plastic waste', 'Community cleanup', 'Upcycled items', 'Eco warriors']);
      }
    } catch (error) {
      console.error('Suggestions error:', error);
      setSuggestions([]);
    }
  };

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Get user's location for nearby search
      let locationParams = '';
      // TODO: Get actual user location
      // const location = await Location.getCurrentPositionAsync({});
      // locationParams = `&latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&radius=10`;

      const response = await fetch(`http://172.20.10.2:8081/api/search?q=${encodeURIComponent(query)}&type=${selectedFilter}${locationParams}`);
      
      if (response.ok) {
        const data = await response.json();
        
        // Combine results from different categories
        const allResults: SearchResult[] = [];
        
        if (data.dumps) {
          data.dumps.forEach((dump: any) => {
            allResults.push({
              id: dump.id,
              type: 'dump',
              title: dump.title,
              description: dump.description,
              location: dump.location,
              photoUrl: dump.photoUrl,
              distance: dump.distance
            });
          });
        }
        
        if (data.marketplace) {
          data.marketplace.forEach((item: any) => {
            allResults.push({
              id: item.id,
              type: 'marketplace',
              title: item.title,
              description: item.description,
              location: item.location,
              price: item.price,
              artisan: item.artisan,
              verified: item.verified
            });
          });
        }
        
        if (data.users) {
          data.users.forEach((user: any) => {
            allResults.push({
              id: user.id,
              type: 'user',
              title: user.name,
              description: `Eco warrior with wallet: ${user.walletAddress?.substring(0, 8)}...`,
              location: 'Community Member',
              verified: user.verified
            });
          });
        }
        
        setSearchResults(allResults);
      } else {
        // Fallback to mock data if API fails
        console.warn('Search API failed, using mock data');
        const filteredResults = mockSearchResults.filter(result => {
          const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase()) ||
                             result.description.toLowerCase().includes(query.toLowerCase()) ||
                             result.location?.toLowerCase().includes(query.toLowerCase());
          
          const matchesFilter = selectedFilter === 'all' || result.type === selectedFilter;
          
          return matchesQuery && matchesFilter;
        });
        
        setSearchResults(filteredResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to mock data
      const filteredResults = mockSearchResults.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase()) ||
                           result.description.toLowerCase().includes(query.toLowerCase()) ||
                           result.location?.toLowerCase().includes(query.toLowerCase());
        
        const matchesFilter = selectedFilter === 'all' || result.type === selectedFilter;
        
        return matchesQuery && matchesFilter;
      });
      
      setSearchResults(filteredResults);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedFilter]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleResultPress = (result: SearchResult) => {
    switch (result.type) {
      case 'dump':
        // Navigate to dump details or adopt screen
        router.push('/adopt');
        break;
      case 'marketplace':
        router.push('/marketplace');
        break;
      case 'user':
        router.push('/profile');
        break;
    }
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultCard} onPress={() => handleResultPress(item)}>
      <View style={styles.resultHeader}>
        <View style={styles.resultIcon}>
          {item.type === 'dump' && <MaterialIcons name="delete" size={20} color="#e74c3c" />}
          {item.type === 'marketplace' && <MaterialIcons name="shopping" size={20} color="#4CC075" />}
          {item.type === 'user' && <MaterialIcons name="person" size={20} color="#3498db" />}
        </View>
        <View style={styles.resultInfo}>
          <Text style={styles.resultTitle}>{item.title}</Text>
          <Text style={styles.resultDescription} numberOfLines={2}>{item.description}</Text>
          {item.location && (
            <View style={styles.locationRow}>
              <MaterialIcons name="location-on" size={14} color="#888" />
              <Text style={styles.locationText}>{item.location}</Text>
              {item.distance && <Text style={styles.distanceText}>{item.distance}km away</Text>}
            </View>
          )}
        </View>
        <View style={styles.resultMeta}>
          {item.price && <Text style={styles.priceText}>GH₵{item.price}</Text>}
          {item.artisan && (
            <View style={styles.artisanRow}>
              <Text style={styles.artisanText}>{item.artisan}</Text>
              {item.verified && <Text style={styles.verifiedIcon}>✔️</Text>}
            </View>
          )}
          {item.verified && item.type === 'user' && <Text style={styles.verifiedIcon}>✔️</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search dumps, marketplace, users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <MaterialIcons name="close" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.filterButton, selectedFilter === item.key && styles.filterButtonActive]}
              onPress={() => setSelectedFilter(item.key as any)}
            >
              <MaterialIcons 
                name={item.icon as any} 
                size={16} 
                color={selectedFilter === item.key ? '#fff' : '#4CC075'} 
              />
              <Text style={[styles.filterText, selectedFilter === item.key && styles.filterTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.key}
        />
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CC075" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : searchQuery.length > 0 ? (
          searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.resultsList}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="search-off" size={48} color="#ccc" />
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptyText}>Try adjusting your search terms or filters</Text>
            </View>
          )
        ) : (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Popular Searches</Text>
            <View style={styles.suggestionsList}>
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionButton}
                    onPress={() => setSearchQuery(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                ['Plastic waste', 'Upcycled items', 'Community cleanup', 'Eco warriors'].map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionButton}
                    onPress={() => setSearchQuery(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    padding: 18,
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
  },
  clearButton: {
    padding: 4,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  filtersList: {
    paddingHorizontal: 18,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterButtonActive: {
    backgroundColor: '#4CC075',
    borderColor: '#4CC075',
  },
  filterText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#4CC075',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
  },
  suggestionsContainer: {
    padding: 18,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestionButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  suggestionText: {
    fontSize: 14,
    color: '#4CC075',
  },
  resultsList: {
    padding: 18,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#4CC075',
    marginLeft: 8,
  },
  resultMeta: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CC075',
    marginBottom: 4,
  },
  artisanRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artisanText: {
    fontSize: 12,
    color: '#888',
  },
  verifiedIcon: {
    fontSize: 12,
    marginLeft: 4,
  },
}); 