import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StarterScreen from './screens/StarterScreen';
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import DashboardScreen from './screens/DashboardScreen'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StarterScreen" >
        <Stack.Screen
          name="StarterScreen"
          component={StarterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ title: 'Dashboard' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
