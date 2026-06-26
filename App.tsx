import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FavoritesProvider } from './src/context/FavoritesContext';
import RootNavigator from './src/navigation/RootNavigator';

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
