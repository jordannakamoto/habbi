import { Button, FlatList, SafeAreaView, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';
import { SupabaseContext } from '../context/SupabaseContext';
import styles from './styles1';

const HomeScreen = ({ navigation }) => {
  const { user, activities } = useContext(SupabaseContext);
  const [recommendedActivities, setRecommendedActivities] = useState([]);

  useEffect(() => {
    refreshActivities();
  }, [activities]);

  const refreshActivities = () => {
    const randomActivities = activities.sort(() => 0.5 - Math.random()).slice(0, 10);
    setRecommendedActivities(randomActivities);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <Text style={styles.largeTitle}>Home Screen</Text>
        {user ? (
          <Text>Logged in as {user.email}</Text>
        ) : (
          <Text>Not logged in</Text>
        )} */}
        {/* <Text style={styles.Title}>Recommendations</Text> */}
        <FlatList
          data={recommendedActivities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={stylesHome.activityItem}>
              <Text style={stylesHome.activityTitle}>{item.title}</Text>
              <Text style={stylesHome.activityDuration}>{item.time_requirement}</Text>
            </View>
          )}
        />
        <Button title="Refresh Activities" onPress={refreshActivities} />

      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const stylesHome = StyleSheet.create({
  // ... your styles here
  activityItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  activityTitle: {
    fontSize: 14,
    // fontWeight: 'bold',
  },
  activityDuration: {
    fontSize: 14,
    color: '#666',
  },
});
