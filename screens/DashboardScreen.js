import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import { useFonts } from 'expo-font';

const Dashboard = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Raleway-Bold': require('../assets/fonts/static/Raleway-Bold.ttf'),
        'Raleway-Medium': require('../assets/fonts/static/Raleway-Medium.ttf'),
        'Raleway': require('../assets/fonts/static/Raleway-Regular.ttf'),
        'Kanit': require('../assets/fonts/Kanit-Regular.ttf'),
        'NanumGothic': require('../assets/fonts/NanumGothic-Regular.ttf'),
    });
    const [firstName, setFirstName] = useState('');
    const [uid, setUid] = useState('');

    useEffect(() => {
        const user = firebase.auth().currentUser;
        const fullName = user.displayName;
        const nameArray = fullName.split(" ");
        const firstName = nameArray[0];
        setFirstName(firstName);
    }, []);

    const signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                navigation.navigate('LoginScreen');
            })
            .catch(error => console.log(error.message));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.greetings}>Hello, {firstName}</Text>
            <View style={styles.buttonContainer}>
                <Text style={styles.welcome}>Looking to Buy, Sell or Donate?</Text>
                <TouchableOpacity style={styles.buy}>
                    <Text style={styles.buyText}>Buy Items</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sell}>
                    <Text style={styles.sellText}>Sell Items</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logOut} onPress={signOut}>
                <Text style={styles.logOutText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        padding: 25,
        flexDirection: 'column',
    },
    greetings: {
        fontFamily: 'Raleway-Bold',
        fontSize: 30,
        marginTop: 50,
        marginRight: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between'
    },
    welcome: {
        fontFamily: 'Raleway-Medium',
        fontSize: 20,
        marginRight: 50,
    },
    buy: {
        marginLeft: -360,
        marginTop: 80,
        backgroundColor: '#000',
        height: 85,
        borderRadius: 15,
        width: 150
    },
    buyText: {
        fontFamily: 'Raleway-Bold',
        color: '#fff',
        marginTop: 25,
        textAlign: 'center',
        fontSize: 20,
    },
    sell: {
        marginLeft: 20,
        backgroundColor: '#000',
        height: 85,
        borderRadius: 15,
        width: 150,
        marginTop: 80,
    },
    sellText: {
        fontFamily: 'Raleway-Bold',
        color: '#fff',
        marginTop: 25,
        textAlign: 'center',
        fontSize: 20,
    },
    logOutText: {
        fontFamily: 'Raleway-Bold',
        color: '#000',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20,

    },
    logOut: {
        marginTop: 350,
        backgroundColor: '#D4ED26',
        height: 55,
        borderRadius: 15,
    },
});

export default Dashboard;
