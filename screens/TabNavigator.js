import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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
                    iconName = 'home-outline';
                } else if (route.name === 'Buy') {
                    iconName = 'cart-outline';
                }
                else if (route.name === 'Add') {
                    iconName = 'add-circle-outline';
                }
                else if (route.name === 'Donations') {
                    iconName = 'heart-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}>
            <Tab.Screen name="Home" component={Dashboard} />
            <Tab.Screen name="Buy" component={BuyScreen} />
            <Tab.Screen name="Add" component={SellScreen} />
            <Tab.Screen name="Donations" component={DonateScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
