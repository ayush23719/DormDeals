import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebaseConfig } from './firebaseConfig';
import StarterScreen from './screens/StarterScreen';
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'

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
          options={{ title: 'Signup' }}
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
