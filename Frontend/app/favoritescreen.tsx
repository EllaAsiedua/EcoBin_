import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const favorites = [
  { id: '1', title: 'Adopted Spot', subtitle: 'Central Park', color: '#6C63FF' },
  { id: '2', title: 'Marketplace', subtitle: 'Eco Bottle', color: '#00C853' },
  { id: '3', title: 'Waste-as-a-Service', subtitle: 'Professional Pickup', color: '#FF9800' },
];

const recentlyVisited = [
  { id: '1', title: 'Bin Report', subtitle: '2 hours ago', icon: 'delete', color: '#6C63FF' },
  { id: '2', title: 'Marketplace', subtitle: '5 hours ago', icon: 'cart', color: '#00C853' },
  { id: '3', title: 'Adopted Spot', subtitle: '1 day ago', icon: 'map-marker', color: '#FFD600' },
];

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites & Recently Visited</Text>
      <Text style={styles.sectionHeader}>Starred</Text>
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.favCard, { backgroundColor: item.color }] }>
            <Text style={styles.favTitle}>{item.title}</Text>
            <Text style={styles.favSubtitle}>{item.subtitle}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: 24 }}
      />
      <Text style={styles.sectionHeader}>Recently Visited</Text>
      <FlatList
        data={recentlyVisited}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.recentRow}>
            <View style={[styles.icon, { backgroundColor: item.color }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.recentTitle}>{item.title}</Text>
              <Text style={styles.recentSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
  },
  favCard: {
    width: 120,
    height: 90,
    borderRadius: 18,
    marginRight: 12,
    padding: 12,
    justifyContent: 'center',
  },
  favTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  favSubtitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 2,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F8FB',
    borderRadius: 16,
    marginVertical: 6,
    padding: 8,
    shadowOpacity: 0,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 12,
  },
  recentTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  recentSubtitle: {
    fontSize: 12,
    color: '#888',
    fontWeight: '400',
    marginTop: 1,
  },
});

export default FavoriteScreen;