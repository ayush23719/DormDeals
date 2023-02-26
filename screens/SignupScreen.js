import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
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
    const [displayNamePlaceholderPos] = useState(new Animated.Value(35));
    const [emailPlaceholderPos] = useState(new Animated.Value(35));
    const [passwordPlaceholderPos] = useState(new Animated.Value(35));
    const [displayNamePlaceholderColor, setDisplayNamePlaceholderColor] = useState('#828282');
    const [emailPlaceholderColor, setEmailPlaceholderColor] = useState('#828282');
    const [passwordPlaceholderColor, setPasswordPlaceholderColor] = useState('#828282');
    const [displayNamePlaceholderwidth, setDisplayNamePlaceholderwidth] = useState(45);
    const [emailPlaceholderwidth, setEmailPlaceholderwidth] = useState(40);
    const [passwordPlaceholderwidth, setPasswordPlaceholderwidth] = useState(65);
    const [borderDisplayName, setBorderDisplayName] = useState('#c7c7c7');
    const [borderEmail, setBorderEmail] = useState('#c7c7c7');
    const [borderPassword, setBorderPassword] = useState('#c7c7c7');
    useEffect(() => {
        setDisplayNamePlaceholderColor(displayName === '' ? '#828282' : '#D4ED26');
        setEmailPlaceholderColor(email === '' ? '#828282' : '#D4ED26');
        setPasswordPlaceholderColor(password === '' ? '#828282' : '#D4ED26');
        setDisplayNamePlaceholderwidth(displayName === '' ? 45 : 45);
        setEmailPlaceholderwidth(email === '' ? 40 : 40);
        setPasswordPlaceholderwidth(password === '' ? 70 : 70);
        setBorderDisplayName(displayName === '' ? '#c7c7c7' : '#D4ED26');
        setBorderEmail(email === '' ? '#c7c7c7' : '#D4ED26');
        setBorderPassword(password === '' ? '#c7c7c7' : '#D4ED26');
    }, [email, password]);
    const registerUser = () => {
        if (email === '' || password === '') {
            Alert.alert('Please enter all the details!');
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
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Create An Account</Text>
                <Text style={styles.headerDesc}>Create your account in less than a minute. Enter your name, email address and password.</Text>
            </View>
            <View style={styles.formGroup}>
                <Animated.Text
                    style={[styles.placeholder, { marginLeft: 20, top: displayNamePlaceholderPos, color: displayNamePlaceholderColor, width: displayNamePlaceholderwidth }]}
                >
                    Name
                </Animated.Text>
                <TextInput
                    style={[styles.inputStyle, { borderColor: borderDisplayName }]}
                    value={displayName}
                    onChangeText={(val) => updateInputVal(val, 'displayName')}
                    onFocus={() => {
                        {
                            Animated.timing(displayNamePlaceholderPos, {
                                toValue: 10,
                                duration: 200,
                                useNativeDriver: false,
                            }).start();
                        }; setDisplayNamePlaceholderColor('#D4ED26'); setDisplayNamePlaceholderwidth(45);
                        setBorderDisplayName('#D4ED26');
                    }}
                    onBlur={() => {
                        {
                            if (displayName.length === 0) {
                                Animated.timing(displayNamePlaceholderPos, {
                                    toValue: 35,
                                    duration: 200,
                                    useNativeDriver: false,
                                }).start();
                            }
                        }; setDisplayNamePlaceholderColor(displayName === '' ? '#828282' : '#D4ED26');
                        setBorderDisplayName(displayName === '' ? '#c7c7c7' : '#D4ED26')
                    }}
                />
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
                        }; setPasswordPlaceholderColor(email === '' ? '#828282' : '#D4ED26');
                        setBorderPassword(password === '' ? '#c7c7c7' : '#D4ED26')
                    }} />
                <TouchableOpacity style={styles.button} onPress={() => registerUser()}>
                    <Text style={styles.buttonText}>Create an Account</Text>
                </TouchableOpacity>
                <Text
                    style={styles.loginText}>
                    Already have an account? <Text style={{ color: '#D4ED26' }} onPress={() => navigation.navigate('LoginScreen')}>Log In</Text>
                </Text>
            </View>
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
    placeholder: {
        zIndex: 1,
        backgroundColor: '#fff',
        fontFamily: 'Raleway',
        fontSize: 15,
    },

    formGroup: {
        marginTop: 30
    },
    inputStyle: {
        height: 55,
        width: '100%',
        marginBottom: 0,
        paddingBottom: 8,
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
        backgroundColor: '#D4ED26',
        height: 55,
        borderRadius: 15,
        paddingBottom: 10,
        marginTop: 30,
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
        marginTop: 440,
        textAlign: 'center',
        marginLeft: 60,
        fontSize: 15,
        position: 'absolute',
    },
});

export default Signup;
