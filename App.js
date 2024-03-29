import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StarterScreen from './screens/StarterScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import TabNavigator from './screens/TabNavigator';
import SellScreen from './screens/SellScreen';
import BuyScreen from './screens/BuyScreen';
import DonateScreen from './screens/DonateScreen';
import LaunchScreen from './screens/LaunchScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LaunchScreen"
          component={LaunchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SellScreen" component={SellScreen} options={{ title: '' }} />
        <Stack.Screen name="BuyScreen" component={BuyScreen} options={{ title: '' }} />
        <Stack.Screen name="DonateScreen" component={DonateScreen} options={{ title: '' }} />
        <Stack.Screen
          name="StarterScreen"
          component={StarterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
