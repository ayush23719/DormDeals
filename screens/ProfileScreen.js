import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../database/firebase';
import { Alert, Input, HStack, IconButton, CloseIcon, NativeBaseProvider } from 'native-base';

const Profile = ({ navigation }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertDescription, setAlertDescription] = useState('');
    const [alertStatus, setAlertStatus] = useState('info');


    const handleAlertClose = () => {
        setShowAlert(false);
    };
    const [fontsLoaded] = useFonts({
        Raleway: require('../assets/fonts/static/Raleway-Regular.ttf'),
    });

    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleUpdateProfile = () => {
        if (newName.trim() === '' && newPassword.trim() === '') {
            setAlertDescription('Please enter a new name or password.');
            setAlertStatus('error');
            setShowAlert(true);
            return;
        }

        const user = firebase.auth().currentUser;
        const promises = [];

        if (newName.trim() !== '') {
            promises.push(user.updateProfile({ displayName: newName }));
        }

        if (newPassword.trim() !== '') {
            promises.push(user.updatePassword(newPassword));
        }

        Promise.all(promises)
            .then(() => {
                // Update successful
                console.log('Profile updated successfully!');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'TabNavigator' }],
                });
            })
            .catch((error) => {
                // An error occurred
                console.log('Error updating profile:', error);
            });
    };


    const handleLogout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign out successful
                navigation.navigate('LoginScreen');
            })
            .catch((error) => {
                // An error occurred
                console.log('Error logging out:', error);
            });
    };

    if (!fontsLoaded) {
        return null; // You can render a loading spinner here while the fonts are being loaded
    }

    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Edit Your Profile</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Change Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new name"
                        value={newName}
                        onChangeText={(text) => setNewName(text)}
                    />
                    <Text style={styles.labelText}>Change Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new password"
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                        <Text style={styles.buttonText}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="black" style={styles.logoutIcon} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
                {showAlert && (
                    <Alert status={alertStatus} onClose={handleAlertClose} variant="left-accent">
                        <HStack flexShrink={1} space={2} justifyContent="space-between">
                            <HStack space={2} flexShrink={1}>
                                <Alert.Icon mt="1" />
                                <Text fontSize="md" color="coolGray.800">
                                    {alertDescription}
                                </Text>
                            </HStack>
                            <IconButton variant="unstyled" _focus={{
                                borderWidth: 0
                            }} icon={<CloseIcon size="3" />} _icon={{
                                color: "coolGray.600"
                            }} onPress={handleAlertClose} />
                        </HStack>
                    </Alert>
                )
                }
            </ScrollView>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    headingContainer: {
        marginBottom: 20,
    },
    headingText: {
        fontFamily: 'Raleway',
        fontSize: 24,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 20,
    },
    labelText: {
        fontFamily: 'Raleway',
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        fontFamily: 'Raleway',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    errorText: {
        fontFamily: 'Raleway',
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#d4ed26',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontFamily: 'Raleway',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logoutIcon: {
        marginRight: 10,
    },
    logoutText: {
        fontFamily: 'Raleway',
        fontSize: 16,
    },
});

export default Profile;
