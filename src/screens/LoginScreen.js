import { Button, SafeAreaView } from 'react-native';

import React from 'react';
import styles from './styles1';
import { useSupabase } from '../context/useSupabase'; // Import context hook

const LoginScreen = () => {
  const { performOAuth, sendMagicLink } = useSupabase(); // Use functions from context

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={performOAuth} title="Sign in with Google" />
    </SafeAreaView>
  );
};

export default LoginScreen;
