import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const dummyDumps = [
  { id: '1', location: 'Kotei Road', description: 'Overflowing bin near the junction.' },
  { id: '2', location: 'Delisa Hostel', description: 'Illegal dumping behind the hostel.' },
  { id: '3', location: 'Amen Main Hostel', description: 'Burning waste at the back entrance.' },
  { id: '4', location: 'R and B Hostel', description: 'Trash scattered near the entrance.' },
  { id: '5', location: 'Amandah Hostel', description: 'Uncollected waste piling up.' },
  { id: '6', location: 'Shakes and Dessert', description: 'Overflowing bin beside the shop.' },
  { id: '7', location: 'Chick’N Capra', description: 'Illegal dumping in the parking lot.' },
  { id: '8', location: 'Adom Bi Heights', description: 'Burning waste near the fence.' },
  { id: '9', location: 'Delisa Hostel', description: 'Overflowing bin at the back.' },
  { id: '10', location: 'Kotei Road', description: 'Trash dumped in the gutter.' },
  { id: '11', location: 'Amen Main Hostel', description: 'Uncollected waste at the side.' },
  { id: '12', location: 'R and B Hostel', description: 'Overflowing bin at the main gate.' },
  { id: '13', location: 'Amandah Hostel', description: 'Illegal dumping behind the hostel.' },
  { id: '14', location: 'Shakes and Dessert', description: 'Burning waste in the open.' },
  { id: '15', location: 'Chick’N Capra', description: 'Overflowing bin near the kitchen.' },
  { id: '16', location: 'Adom Bi Heights', description: 'Trash scattered in the yard.' },
  { id: '17', location: 'Delisa Hostel', description: 'Uncollected waste at the entrance.' },
  { id: '18', location: 'Kotei Road', description: 'Illegal dumping beside the road.' },
  { id: '19', location: 'Amen Main Hostel', description: 'Overflowing bin at the back.' },
  { id: '20', location: 'R and B Hostel', description: 'Burning waste near the hostel.' },
  { id: '21', location: 'Amandah Hostel', description: 'Overflowing bin at the side.' },
  { id: '22', location: 'Shakes and Dessert', description: 'Trash dumped in the parking lot.' },
  { id: '23', location: 'Chick’N Capra', description: 'Uncollected waste near the entrance.' },
  { id: '24', location: 'Adom Bi Heights', description: 'Illegal dumping at the back.' },
  { id: '25', location: 'Delisa Hostel', description: 'Burning waste at the side.' },
  { id: '26', location: 'Kotei Road', description: 'Overflowing bin at the junction.' },
  { id: '27', location: 'Amen Main Hostel', description: 'Trash scattered at the entrance.' },
  { id: '28', location: 'R and B Hostel', description: 'Illegal dumping in the yard.' },
  { id: '29', location: 'Amandah Hostel', description: 'Burning waste at the back.' },
  { id: '30', location: 'Shakes and Dessert', description: 'Overflowing bin at the side.' },
];

export default function AllDumpsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Dumps</Text>
      <FlatList
        data={dummyDumps}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={styles.desc}>{item.description}</Text>
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
  location: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CC075',
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    color: '#555',
  },
});