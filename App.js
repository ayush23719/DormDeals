import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StarterScreen from './screens/starterScreen';
import loginScreen from './screens/loginScreen'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StarterScreen">
        <Stack.Screen
          name="StarterScreen"
          component={StarterScreen}
        />
        <Stack.Screen
          name="loginScreen"
          component={loginScreen}
          options={{ title: 'Login' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
