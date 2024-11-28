import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function ClientReport() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>B</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Cor de fundo opcional
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Cor do texto
  },
});