import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StarterScreen from './screens/StarterScreen';
import LoginScreen from './screens/LoginScreen'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StarterScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="StarterScreen"
          component={StarterScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
