import { Button, SafeAreaView, Text, View } from 'react-native';

// screens/HomeScreen.js
import React from 'react';
import styles from './styles1';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.largeTitle}>Home Screen</Text>
        <Button
          title="Go to Goal Screen"
          onPress={() => navigation.navigate('Goal')}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
