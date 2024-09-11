import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import InventoryList from './components/InventoryList';

export default function App() {
  return (
    <View style={styles.container}>
      <InventoryList />
      <StatusBar style="dark" /> {/* Use "dark" or "light" based on your preference */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Changed to a light gray for better contrast
    padding: 16, // Added padding for some space around the edges
  },
});
