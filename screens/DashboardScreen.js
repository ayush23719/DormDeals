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
            <View style={styles.main}>
                <Text style={styles.greetings}>Hello, {firstName}</Text>
                <Text style={styles.welcome}>Looking to Buy, Sell or Donate?</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buy}>
                        <Text style={styles.buyText}>Buy Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sell}>
                        <Text style={styles.sellText}>Sell Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.donations}>
                        <Text style={styles.donateText}>Donations</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.logOut} onPress={signOut}>
                <Text style={styles.logOutText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        paddingLeft: 25,
        paddingTop: 55,
        paddingRight: 25,
        flexDirection: 'column',

    },
    main: {
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    greetings: {
        fontFamily: 'Raleway-Bold',
        fontSize: 30,
    },
    welcome: {
        paddingTop: 30,
        fontFamily: 'Raleway-Medium',
        fontSize: 20,
    },
    buttonContainer: {
        flexWrap: 'wrap',
        paddingTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buy: {
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
        backgroundColor: '#000',
        height: 85,
        borderRadius: 15,
        width: 150,
    },
    sellText: {
        fontFamily: 'Raleway-Bold',
        color: '#fff',
        marginTop: 25,
        textAlign: 'center',
        fontSize: 20,
    },
    donations: {
        backgroundColor: '#000',
        height: 85,
        borderRadius: 20,
        flexGrow: 4,
        marginTop: 20,
    },
    donateText: {
        fontFamily: 'Raleway-Bold',
        color: '#fff',
        marginTop: 25,
        textAlign: 'center',
        fontSize: 25,
    },
    logOut: {
        marginTop: 420,
        width: "100%",
        backgroundColor: '#D4ED26',
        height: 55,
        borderRadius: 15,
    },
    logOutText: {
        fontFamily: 'Raleway-Bold',
        color: '#000',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20,

    },

});

export default Dashboard;
