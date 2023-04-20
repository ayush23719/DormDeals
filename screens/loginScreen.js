import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import firebase from '../database/firebase';
import { useFonts } from 'expo-font';
const Login = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Raleway-Bold': require('../assets/fonts/static/Raleway-Bold.ttf'),
        'Raleway-Medium': require('../assets/fonts/static/Raleway-Medium.ttf'),
        'Raleway': require('../assets/fonts/static/Raleway-Regular.ttf'),
        'Kanit': require('../assets/fonts/Kanit-Regular.ttf'),
        'NanumGothic': require('../assets/fonts/NanumGothic-Regular.ttf'),
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const updateInputVal = (val, prop) => {
        if (prop === 'email') {
            setEmail(val);
        } else {
            setPassword(val);
        }
    };
    const [emailPlaceholderPos] = useState(new Animated.Value(35));
    const [passwordPlaceholderPos] = useState(new Animated.Value(35));
    const [emailPlaceholderColor, setEmailPlaceholderColor] = useState('#828282');
    const [passwordPlaceholderColor, setPasswordPlaceholderColor] = useState('#828282');
    const [emailPlaceholderwidth, setEmailPlaceholderwidth] = useState(40);
    const [passwordPlaceholderwidth, setPasswordPlaceholderwidth] = useState(65);
    const [borderEmail, setBorderEmail] = useState('#c7c7c7');
    const [borderPassword, setBorderPassword] = useState('#c7c7c7');
    useEffect(() => {
        setEmailPlaceholderColor(email === '' ? '#828282' : '#D4ED26');
        setPasswordPlaceholderColor(password === '' ? '#828282' : '#D4ED26');
        setEmailPlaceholderwidth(email === '' ? 40 : 40);
        setPasswordPlaceholderwidth(password === '' ? 70 : 70);
        setBorderEmail(email === '' ? '#c7c7c7' : '#D4ED26');
        setBorderPassword(password === '' ? '#c7c7c7' : '#D4ED26');
    }, [email, password]);
    const userLogin = () => {
        if (email === '' || password === '') {
            Alert.alert('Please enter all the details!');
        } else {
            setIsLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log(res);
                    console.log('User logged-in successfully!');
                    setEmail('');
                    setPassword('');
                    setIsLoading(false);
                    navigation.navigate('DashboardScreen');
                })
                .catch((error) => {
                    setIsLoading(false);
                    setErrorMessage('Incorrect details! Please check the email address or password and try again.');
                });
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
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome back,</Text>
                <Text style={styles.headerDesc}>We're happy to see you again. Enter your email address and password.</Text>
            </View>
            <View style={styles.formGroup}>
                <Animated.Text
                    style={[styles.placeholder, { marginLeft: 20, top: emailPlaceholderPos, color: emailPlaceholderColor, width: emailPlaceholderwidth }]}
                >
                    Email
                </Animated.Text>
                <TextInput
                    style={[styles.inputStyle, { borderColor: borderEmail }]}
                    value={email}
                    onChangeText={(val) => updateInputVal(val, 'email')}
                    onFocus={() => {
                        {
                            Animated.timing(emailPlaceholderPos, {
                                toValue: 10,
                                duration: 200,
                                useNativeDriver: false,
                            }).start();
                        }; setEmailPlaceholderColor('#D4ED26'); setEmailPlaceholderwidth(40);
                        setBorderEmail('#D4ED26');
                    }}
                    onBlur={() => {
                        {
                            if (email.length === 0) {
                                Animated.timing(emailPlaceholderPos, {
                                    toValue: 35,
                                    duration: 200,
                                    useNativeDriver: false,
                                }).start();
                            }
                        }; setEmailPlaceholderColor(email === '' ? '#828282' : '#D4ED26');
                        setBorderEmail(email === '' ? '#c7c7c7' : '#D4ED26')
                    }}
                />
                <Animated.Text
                    style={[styles.placeholder, { marginLeft: 20, top: passwordPlaceholderPos, color: passwordPlaceholderColor, width: passwordPlaceholderwidth }]}
                >
                    Password
                </Animated.Text>
                <TextInput
                    style={[styles.inputStyle, { borderColor: borderPassword }]}
                    value={password}
                    onChangeText={(val) => updateInputVal(val, 'password')}
                    maxLength={15}
                    secureTextEntry={true}
                    onFocus={() => {
                        {
                            Animated.timing(passwordPlaceholderPos, {
                                toValue: 10,
                                duration: 200,
                                useNativeDriver: false,
                            }).start();
                        }; setPasswordPlaceholderColor('#D4ED26'); setPasswordPlaceholderwidth(70);
                        setBorderPassword('#D4ED26');
                    }}
                    onBlur={() => {
                        {
                            if (password.length === 0) {
                                Animated.timing(passwordPlaceholderPos, {
                                    toValue: 35,
                                    duration: 200,
                                    useNativeDriver: false,
                                }).start();
                            }
                        }; setPasswordPlaceholderColor(password === '' ? '#828282' : '#D4ED26');
                        setBorderPassword(password === '' ? '#c7c7c7' : '#D4ED26')
                    }} />
                <TouchableOpacity style={styles.button} onPress={() => userLogin()}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <Text
                    style={styles.loginText}>
                    Don't have an account? <Text style={{ color: '#D4ED26' }} onPress={() => navigation.navigate('SignupScreen')}>Sign Up</Text>
                </Text>
            </View>
            {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
        backgroundColor: '#fff'
    },
    header: {
        marginTop: -50,
    },
    headerText: {
        fontFamily: 'Raleway-Bold',
        fontSize: 35,
        marginBottom: 10
    },
    headerDesc: {
        fontFamily: 'Raleway',
        fontSize: 16,
        color: '#828282'
    },
    formGroup: {
        marginTop: 30,
    },
    placeholder: {
        zIndex: 1,
        backgroundColor: '#fff',
        fontFamily: 'Raleway',
        fontSize: 15,
    },
    inputStyle: {
        height: 55,
        width: '100%',
        marginBottom: 0,
        paddingLeft: 20,
        alignSelf: "center",
        borderColor: "#c7c7c7",
        borderWidth: 1,
        fontFamily: 'Raleway',
        fontSize: 15,
        borderRadius: 15

    },
    buttonText: {
        fontFamily: 'Raleway-Bold',
        color: '#000',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20,

    },
    button: {
        marginTop: 30,
        backgroundColor: '#D4ED26',
        height: 55,
        borderRadius: 15,
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
    },
    loginText: {
        fontFamily: 'Raleway-Bold',
        color: '#000',
        marginTop: 400,
        textAlign: 'center',
        marginLeft: 60,
        fontSize: 15,
        position: 'absolute',
    },
    error: {
        fontFamily: 'Raleway',
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 15,
    }
});

export default Login;