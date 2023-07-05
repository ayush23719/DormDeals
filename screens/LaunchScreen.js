import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import firebase from '../database/firebase';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const LaunchScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const fadeAnim = new Animated.Value(0);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            navigation.navigate(isLoggedIn ? 'TabNavigator' : 'StarterScreen');
        }, 5000);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.animationContainer}>
                <LottieView
                    source={require('../assets/launch_icon.json')}
                    autoPlay
                    loop
                    style={styles.animation}
                />
            </View>
            <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
                DormDeals
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    animationContainer: {
        marginBottom: 20,
        width: width * 0.5,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: '100%',
        height: '100%',
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default LaunchScreen;
