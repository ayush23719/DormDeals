import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StarterScreen from './screens/StarterScreen';
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import DashboardScreen from './screens/DashboardScreen'
import SellScreen from './screens/SellScreen'
import BuyScreen from './screens/BuyScreen'
import DonateScreen from './screens/DonateScreen'
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SellScreen"
          component={SellScreen}
          options={{ title: '' }} />
        <Stack.Screen name="BuyScreen"
          component={BuyScreen}
          options={{ title: '' }} />
        <Stack.Screen name="DonateScreen"
          component={DonateScreen}
          options={{ title: '' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
