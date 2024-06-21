import { SafeAreaView, Text, View } from 'react-native';

// screens/LoginScreen.js
import React from 'react';
import styles from './styles1';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.largeTitle}>Login Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
