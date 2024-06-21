// App.js

import GlobalNavigation from './src/navigation/GlobalNavigation';
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
