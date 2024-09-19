import { StatusBar } from 'expo-status-bar';
import InventoryList from './components/InventoryList';
 import React from 'react';
 import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
          <Text style={styles.title}>Start App1!</Text>
          <InventoryList />
          <StatusBar style="dark" />
          <Text style={styles.title}>Start App2!</Text>
    </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF69B4',
    padding: 16,
  },
  title: {
    fontSize: 34,
    marginBottom: 16,
    color: '#9ACD32',
  },
});
