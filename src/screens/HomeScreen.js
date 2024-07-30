import { Button, SafeAreaView, Text, View } from 'react-native';

// screens/HomeScreen.js
import React from 'react';
import styles from './styles1';
import { useSupabase } from '../context/useSupabase';

const HomeScreen = ({ navigation }) => {
  const { user } = useSupabase();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.largeTitle}>Home Screen</Text>
        {user ? (
          <Text>Logged in as {user.email}</Text>
        ) : (
          <Text>Not logged in</Text>
        )}
        <Text style={styles.Title}>Recommendations</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
