import { SafeAreaView, Text, View } from 'react-native';

// screens/RegisterScreen.js
import React from 'react';
import styles from './styles1';

const RegisterScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.largeTitle}>Register Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
