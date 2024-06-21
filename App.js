// App.js

import GlobalNavigation from './src/navigation/GlobalNavigation';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SupabaseProvider } from './src/context/SupabaseProvider';

const App = () => {
  return (
    <SupabaseProvider>
        <GlobalNavigation />
    </SupabaseProvider>
  );
};

export default App;
