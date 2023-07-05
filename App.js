import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StarterScreen from './screens/StarterScreen';
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import TabNavigator from './screens/TabNavigator'
import SellScreen from './screens/SellScreen'
import BuyScreen from './screens/BuyScreen'
import DonateScreen from './screens/DonateScreen'
import firebase from './database/firebase';

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SellScreen" component={SellScreen} options={{ title: '' }} />
            <Stack.Screen name="BuyScreen" component={BuyScreen} options={{ title: '' }} />
            <Stack.Screen name="DonateScreen" component={DonateScreen} options={{ title: '' }} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="StarterScreen"
              component={StarterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
