import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function BuyChatScreen() {
  const params = useLocalSearchParams();
  const { title, artisan } = params;

  const [message, setMessage] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Seller</Text>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.seller}>Seller: {artisan}</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity
        style={styles.sendBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Message sent successfully!</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F8FB', padding: 24 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#222' },
  itemTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#4CC075' },
  seller: { fontSize: 15, color: '#888', marginBottom: 16 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sendBtn: {
    backgroundColor: '#4CC075',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sendText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: '#222',
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#4CC075',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});