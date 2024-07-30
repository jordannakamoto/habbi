import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import ActivityScreen from '../screens/ActivityScreen';
import GoalScreen from '../screens/GoalScreen';
import HomeScreen from '../screens/HomeScreen';
import React from 'react';

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  goal: GoalScreen,
  home: HomeScreen,
  activity: ActivityScreen,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'transparent' }}
    style={styles.tabBar}
    renderLabel={({ route, focused, color }) => (
      <Text style={[styles.label, focused ? styles.labelFocused : null]}>
        {route.title}
      </Text>
    )}
  />
);

const TabNavigator = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'goal', title: 'Goals' },
    { key: 'home', title: 'Home' },
    { key: 'activity', title: 'Activities' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'white',
    paddingTop: 50,
  },
  label: {
    color: '#6c6c6c',
    margin: 8,
  },
  labelFocused: {
    color: 'black',
  },
});
