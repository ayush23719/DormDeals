import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import { useFonts } from 'expo-font';
const Signup = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Raleway-Bold': require('../assets/fonts/static/Raleway-Bold.ttf'),
        'Raleway-Medium': require('../assets/fonts/static/Raleway-Medium.ttf'),
        'Raleway': require('../assets/fonts/static/Raleway-Regular.ttf'),
        'Kanit': require('../assets/fonts/Kanit-Regular.ttf'),
        'NanumGothic': require('../assets/fonts/NanumGothic-Regular.ttf'),
    });

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const updateInputVal = (val, prop) => {
        if (prop === 'displayName') {
            setDisplayName(val);
        } else if (prop === 'email') {
            setEmail(val);
        } else {
            setPassword(val);
        }
    };

    const registerUser = () => {
        if (email === '' || password === '') {
            Alert.alert('Enter details to signup!');
        } else {
            setIsLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: displayName
                    });
                    console.log('User registered successfully!');
                    setDisplayName('');
                    setEmail('');
                    setPassword('');
                    setIsLoading(false);
                    navigation.navigate('LoginScreen');
                })
                .catch((error) => setErrorMessage(error.message));
        }
    };

    if (isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Create An Account</Text>
                <Text style={styles.headerDesc}>Create your account in less than a minute. Enter your Name, Email and Password.</Text>
            </View>
            <TextInput
                style={styles.inputStyle}
                placeholder="Name"
                value={displayName}
                onChangeText={(val) => updateInputVal(val, 'displayName')}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                value={email}
                onChangeText={(val) => updateInputVal(val, 'email')}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={password}
                onChangeText={(val) => updateInputVal(val, 'password')}
                maxLength={15}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => registerUser()}>
                <Text style={styles.buttonText}>Create An Account</Text>
            </TouchableOpacity>
            <Text
                style={styles.loginText}
                onPress={() => navigation.navigate('LoginScreen')}>
                Already Registered? Click here to login
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    header: {
        marginBottom: 300
    },
    headerText: {
        fontFamily: 'Raleway-Bold',
        fontSize: 35,
        marginBottom: 10
    },
    headerDesc: {
        fontFamily: 'Raleway',
        fontSize: 16,
        color: '#b3b2b1'
    },
    inputStyle: {
        height: 50,
        width: '100%',
        marginBottom: 15,
        paddingBottom: 10,
        paddingLeft: 10,
        alignSelf: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        fontFamily: 'Raleway',
        fontSize: 18,
        borderRadius: 10

    },
    buttonText: {
        fontFamily: 'Raleway',
        color: '#fff',
        marginTop: 25,
        textAlign: 'center',
        fontSize: 18,

    },
    button: {
        backgroundColor: '#D4ED26',
        height: 50,
        borderRadius: 10,
        paddingBottom: 10
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});

export default Signup;
