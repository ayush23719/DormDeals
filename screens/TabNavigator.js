import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from 'react-native-vector-icons';
import Dashboard from './DashboardScreen';
import BuyScreen from './BuyScreen';
import SellScreen from './SellScreen';
import DonateScreen from './DonateScreen';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home'; // Set the icon name for the Home tab
                } else if (route.name === 'Buy') {
                    iconName = 'shopping-cart'; // Set the icon name for the Profile tab
                }
                else if (route.name === 'Sell') {
                    iconName = 'dollar-sign'; // Set the icon name for the Profile tab
                }
                else if (route.name === 'Donations') {
                    iconName = 'hand-holding-heart'; // Set the icon name for the Profile tab
                }

                return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
        })}>
            <Tab.Screen name="Home" component={Dashboard} />
            <Tab.Screen name="Buy" component={BuyScreen} />
            <Tab.Screen name="Sell" component={SellScreen} />
            <Tab.Screen name="Donations" component={DonateScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
