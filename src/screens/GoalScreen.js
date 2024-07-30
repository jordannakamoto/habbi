import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import styles from './styles1';

// Dummy data for goals
const dummyGoals = [
  { id: '1', title: 'Reduce neck pain' },
  { id: '2', title: 'Improve professionalism' },
  { id: '3', title: 'Eat better nutritionally' },
  { id: '4', title: 'Build portfolio' },
  { id: '5', title: 'Improve mental well being' },
  { id: '6', title: 'Develop a board or card game' },
  { id: '7', title: 'Start a Youtube channel' },
  { id: '8', title: 'Improve home economic discipline' },

];

const GoalScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <Text style={styles.largeTitle}>Goal Screen</Text> */}
        <FlatList
          data={dummyGoals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={customStyles.goalItem}>
              <Text style={customStyles.goalTitle}>{item.title}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={customStyles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default GoalScreen;

const customStyles = StyleSheet.create({
  goalItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  goalTitle: {
    fontSize: 13,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
