import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyProfile = {
  name: 'Umar',
  email: 'umar@example.com',
  walletAddress: '0x1234...abcd',
  roles: ['User', 'Recycler'],
  avatar: require('../assets/images/greencycle.png'),
  achievements: [
    { id: 1, title: 'Top 5 on Leaderboard', desc: 'You are ranked #4 this week!' },
    { id: 2, title: 'Most Reports', desc: 'Reported 12 dumps this month.' },
    { id: 3, title: 'Adopted Spots', desc: 'Adopted 3 locations.' },
  ],
};

export default function ProfileScreen() {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#F6F8FB' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.card}>
          <Image source={dummyProfile.avatar} style={styles.avatar} />
          <Text style={styles.name}>{dummyProfile.name}</Text>
          <Text style={styles.email}>{dummyProfile.email}</Text>
          <Text style={styles.wallet}>Wallet: <Text style={{ color: '#4CC075', fontWeight: '700' }}>{dummyProfile.walletAddress}</Text></Text>
          <Text style={styles.roles}>Roles: {dummyProfile.roles.join(', ')}</Text>
        </View>
        <View style={styles.achievementsCard}>
          <Text style={styles.achievementsHeader}>Leaderboard Achievements</Text>
          {dummyProfile.achievements.map(a => (
            <View key={a.id} style={styles.achievementRow}>
              <View style={styles.achievementDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.achievementTitle}>{a.title}</Text>
                <Text style={styles.achievementDesc}>{a.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    margin: 18,
    marginTop: 32,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  wallet: {
    fontSize: 15,
    color: '#222',
    marginBottom: 4,
  },
  roles: {
    fontSize: 14,
    color: '#4CC075',
    marginBottom: 10,
  },
  achievementsCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginHorizontal: 18,
    marginTop: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementsHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4CC075',
    marginBottom: 16,
    textAlign: 'center',
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  achievementDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CC075',
    marginRight: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  achievementDesc: {
    fontSize: 13,
    color: '#888',
    fontWeight: '400',
    marginTop: 1,
  },
}); 