import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://172.20.10.2:8081/api';

type LeaderboardEntry = {
  id: number;
  name: string;
  totalScore: number;
  dumpsReported: number;
  spotsAdopted: number;
  marketplaceSales: number;
  cleanupSessions: number;
  cycleTokensEarned: number;
  badges: string[];
};

type UserStats = {
  id: number;
  name: string;
  totalScore: number;
  dumpsReported: number;
  spotsAdopted: number;
  marketplaceSales: number;
  cleanupSessions: number;
  cycleTokensEarned: number;
  badges: string[];
};

const nfts = [
  { id: 1, name: 'Eco Hero', rarity: 'Legendary', image: require('../assets/images/star.png') },
  { id: 2, name: 'Trash Hunter', rarity: 'Epic', image: require('../assets/images/greencycle.png') },
  { id: 3, name: 'Green Guardian', rarity: 'Rare', image: require('../assets/images/cartoontree.png') },
];

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUser, setCurrentUser] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      console.log('Fetching leaderboard from:', `${API_URL}/leaderboard`);
      const response = await fetch(`${API_URL}/leaderboard`);
      console.log('Leaderboard response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        setLeaderboard(data);
        setError(null);
      } else {
        const errorText = await response.text();
        console.error('Leaderboard fetch failed:', response.status, errorText);
        setError(`Failed to fetch leaderboard: ${response.status}`);
      }
    } catch (err) {
      console.error('Leaderboard network error:', err);
      setError('Network error');
    }
  };

  const fetchCurrentUserStats = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No token found, skipping user stats');
        return;
      }

      console.log('Fetching user stats from:', `${API_URL}/leaderboard/me`);
      const response = await fetch(`${API_URL}/leaderboard/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('User stats response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('User stats data received:', data);
        setCurrentUser(data);
      } else {
        const errorText = await response.text();
        console.error('User stats fetch failed:', response.status, errorText);
      }
    } catch (err) {
      console.error('User stats network error:', err);
    }
  };

  const testBackend = async () => {
    try {
      console.log('Testing backend connection...');
      const response = await fetch(`${API_URL}/leaderboard/test`);
      const text = await response.text();
      console.log('Backend test response:', text);
      alert(`Backend test: ${text}`);
    } catch (err) {
      console.error('Backend test failed:', err);
      alert('Backend test failed: ' + err);
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchLeaderboard(), fetchCurrentUserStats()]);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchLeaderboard(), fetchCurrentUserStats()]);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CC075" />
        <Text style={styles.loadingText}>Loading leaderboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: '#F6F8FB' }} 
      contentContainerStyle={{ paddingBottom: 40 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.header}>Leaderboard</Text>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.testButton} onPress={testBackend}>
            <Text style={styles.testButtonText}>Test Backend Connection</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.card}>
        {leaderboard.length === 0 ? (
          <Text style={styles.emptyText}>No leaderboard data available</Text>
        ) : (
          leaderboard.map((entry, idx) => (
            <View
              key={entry.id}
              style={[
                styles.row, 
                currentUser && entry.id === currentUser.id && styles.currentUserRow
              ]}
            >
              <Text style={[
                styles.rank, 
                idx === 0 && styles.gold, 
                idx === 1 && styles.silver, 
                idx === 2 && styles.bronze
              ]}>
                {idx + 1}
              </Text>
              <Image source={require('../assets/images/greencycle.png')} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={[
                  styles.name, 
                  currentUser && entry.id === currentUser.id && styles.currentUserName
                ]}>
                  {entry.name}
                </Text>
                <View style={styles.badgeRow}>
                  {entry.badges.map((badge, i) => (
                    <Text key={i} style={styles.badge}>{badge}</Text>
                  ))}
                </View>
              </View>
              <Text style={styles.score}>{entry.totalScore}</Text>
            </View>
          ))
        )}
      </View>

      {currentUser && (
        <View style={styles.achievementsCard}>
          <Text style={styles.sectionTitle}>Your Achievements</Text>
          <View style={styles.achievementsRow}>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>🏆</Text>
              <Text style={styles.achievementLabel}>Top Cleaner</Text>
              <Text style={styles.achievementValue}>{currentUser.dumpsReported}</Text>
            </View>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>🌳</Text>
              <Text style={styles.achievementLabel}>Spot Adopter</Text>
              <Text style={styles.achievementValue}>{currentUser.spotsAdopted}</Text>
            </View>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>🛒</Text>
              <Text style={styles.achievementLabel}>Marketplace Seller</Text>
              <Text style={styles.achievementValue}>{currentUser.marketplaceSales}</Text>
            </View>
          </View>
          <View style={styles.achievementsRow}>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>🧹</Text>
              <Text style={styles.achievementLabel}>Cleanup Sessions</Text>
              <Text style={styles.achievementValue}>{currentUser.cleanupSessions}</Text>
            </View>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>💰</Text>
              <Text style={styles.achievementLabel}>$CYCLE Earned</Text>
              <Text style={styles.achievementValue}>{currentUser.cycleTokensEarned}</Text>
            </View>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>⭐</Text>
              <Text style={styles.achievementLabel}>Total Score</Text>
              <Text style={styles.achievementValue}>{currentUser.totalScore}</Text>
            </View>
          </View>
        </View>
      )}

      {/* NFT Badges Section */}
      <View style={styles.nftCard}>
        <Text style={styles.sectionTitle}>Your NFT Badges</Text>
        <View style={styles.nftRow}>
          {nfts.map(nft => (
            <View key={nft.id} style={styles.nftBadge}>
              <Image source={nft.image} style={styles.nftImage} />
              <Text style={styles.nftName}>{nft.name}</Text>
              <Text style={styles.nftRarity}>{nft.rarity}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8FB',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginHorizontal: 18,
    marginBottom: 18,
    padding: 12,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginTop: 60,
    marginBottom: 18,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginHorizontal: 18,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F8FB',
  },
  currentUserRow: {
    backgroundColor: '#F6F8FB',
    borderRadius: 12,
  },
  rank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#eee',
    textAlign: 'center',
    fontWeight: '700',
    color: '#888',
    marginRight: 10,
    lineHeight: 28,
    fontSize: 16,
  },
  gold: { backgroundColor: '#FFD700', color: '#fff' },
  silver: { backgroundColor: '#C0C0C0', color: '#fff' },
  bronze: { backgroundColor: '#CD7F32', color: '#fff' },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  currentUserName: {
    color: '#4CC075',
    fontWeight: '700',
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 2,
    gap: 4,
  },
  badge: {
    fontSize: 18,
    marginRight: 4,
  },
  score: {
    fontSize: 18,
    color: '#4CC075',
    fontWeight: '700',
    marginLeft: 8,
  },
  achievementsCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 18,
    marginBottom: 18,
    padding: 16,
    elevation: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#222',
  },
  achievementsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  achievementCard: {
    alignItems: 'center',
    backgroundColor: '#F6F8FB',
    borderRadius: 12,
    padding: 10,
    minWidth: 80,
    marginHorizontal: 4,
  },
  achievementIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  achievementLabel: {
    fontSize: 12,
    color: '#4CC075',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  achievementValue: {
    fontSize: 14,
    color: '#222',
    fontWeight: '700',
  },
  nftCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 18,
    marginBottom: 18,
    padding: 16,
    elevation: 0,
  },
  nftRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  nftBadge: {
    alignItems: 'center',
    backgroundColor: '#F6F8FB',
    borderRadius: 12,
    padding: 10,
    minWidth: 90,
    marginHorizontal: 4,
  },
  nftImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginBottom: 4,
  },
  nftName: {
    fontSize: 13,
    color: '#222',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  nftRarity: {
    fontSize: 12,
    color: '#4CC075',
    fontWeight: '500',
    textAlign: 'center',
  },
  testButton: {
    backgroundColor: '#4CC075',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 