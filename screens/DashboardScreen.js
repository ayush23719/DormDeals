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
            <Text style={styles.welcome}>Looking to Buy, Sell or Donate?</Text>
            <TouchableOpacity style={styles.button} onPress={signOut}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'space-between',
        padding: 25,
        flexDirection: 'column',
    },
    greetings: {
        fontFamily: 'Raleway-Bold',
        fontSize: 30,
        marginTop: 50,
        marginRight: 100,
    },
    welcome: {
        fontFamily: 'Raleway-Bold',
        fontSize: 20,
        marginBottom: 420,
        marginRight: 50,
    },
    buttonText: {
        fontFamily: 'Raleway-Bold',
        color: '#000',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20,

    },
    button: {
        marginTop: 100,
        backgroundColor: '#D4ED26',
        height: 55,
        borderRadius: 15,
    },
});

export default Dashboard;
