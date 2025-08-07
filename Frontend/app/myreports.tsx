import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const dummyReports = [
  { id: '1', title: 'Overflowing Bin', description: 'Bin at Kotei Road is full.', status: 'Pending' },
  { id: '2', title: 'Illegal Dump', description: 'Trash dumped near Delisa Hostel.', status: 'Resolved' },
  { id: '3', title: 'Burning Waste', description: 'Someone burning waste at Amen Main Hostel.', status: 'In Progress' },
];

export default function MyReportsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Reports</Text>
      <FlatList
        data={dummyReports}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#222',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  desc: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    marginBottom: 8,
  },
  status: {
    fontSize: 13,
    color: '#4CC075',
    fontWeight: '600',
  },
});