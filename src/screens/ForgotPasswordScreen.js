import { SafeAreaView, Text, View } from 'react-native';

// screens/ForgotPasswordScreen.js
import React from 'react';
import styles from './styles1';

const ForgotPasswordScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.largeTitle}>Forgot Password Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
