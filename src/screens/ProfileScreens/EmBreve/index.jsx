import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmBreve() {
  return (
  <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text
        variant="displaySmall"
        children="Em breve..."
    />
    
  </SafeAreaView>);

};
