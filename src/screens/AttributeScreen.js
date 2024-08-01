import { SafeAreaView, Text, View } from 'react-native';

// screens/HomeScreen.js
import React from 'react';
import styles from './styles1';

const AttributeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.largeTitle}>Attribute Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default AttributeScreen;
