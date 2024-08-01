// navigation/GlobalNavigation.js

// import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
// import RegisterScreen from '../screens/RegisterScreen';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import AttributeScreen from '../screens/AttributeScreen';
import GoalScreen from '../screens/GoalScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TabNavigator from './TabNavigator';
import { useSupabase } from '../context/useSupabase';

const Stack = createStackNavigator();

const GlobalNavigation = () => {
  // We check if the user is logged in
  const { isLoggedIn } = useSupabase();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'Home' : 'Login'}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        {/* Only authenticated users can access the home */}
        {isLoggedIn ? (
          <>
          <Stack.Screen name="Main" component={TabNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            
            {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
            {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
          </>
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GlobalNavigation;
