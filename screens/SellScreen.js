import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import * as firebase from '../database/firebase';
import { Checkbox } from 'galio-framework';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { Box, NativeBaseProvider, Center, Container, Flex, Spacer, Input } from 'native-base';

const Sell = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Raleway-Bold': require('../assets/fonts/static/Raleway-Bold.ttf'),
        'Raleway-Medium': require('../assets/fonts/static/Raleway-Medium.ttf'),
        'Raleway': require('../assets/fonts/static/Raleway-Regular.ttf'),
        'Kanit': require('../assets/fonts/Kanit-Regular.ttf'),
        'NanumGothic': require('../assets/fonts/NanumGothic-Regular.ttf'),
    });
    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [phone, setPhone] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    // const [isDonated, setIsDonated] = useState(false);
    // const [image, setImage] = useState(null);
    // const [uploading, setUploading] = useState(false);
    // const updateInputVal = (val, prop) => {
    //     if (prop === 'title') {
    //         setTitle(val);
    //     } else if (prop === 'phone') {
    //         setPhone(val);
    //     }
    //     else {
    //         setDescription(val);
    //     }

    // };

    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //     }
    // };

    // const uploadImage = async () => {
    //     const blob = await new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();
    //         xhr.onload = function () {
    //             resolve(xhr.response);
    //         };
    //         xhr.onerror = function (e) {
    //             reject(new TypeError("Network request failed"));
    //         };
    //         xhr.responseType = "blob";
    //         xhr.open("GET", uri, true);
    //         xhr.send(null);
    //     });
    // };
    // const ref = firebase.storage().ref().child("images/" + image);
    // const snapshot = ref.put(blob);
    // snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED)
    const sellItem = () => {
        setIsLoading(true);
        const userID = firebase.auth().currentUser.uid;
        const itemsRef = firebase.firestore().collection('items');
        const donatedItemsRef = firebase.firestore().collection('donatedItems');

        const item = {
            title: title,
            description: description,
            phone: phone,
            isDonated: isDonated,
            userID: userID,
        };

        if (isDonated) {
            donatedItemsRef
                .add(item)
                .then(() => {
                    console.log('Item added to donated items');
                    setIsLoading(false);
                    navigation.navigate('DashboardScreen');
                    Alert.alert('Success', 'Item added to Donations');
                })
                .catch((error) => {
                    console.error('Error adding item to donated items: ', error);
                    setIsLoading(false);
                    Alert.alert('Error', 'Could not add item. Please try again later.');
                });
        } else {
            itemsRef
                .add(item)
                .then(() => {
                    console.log('Item added to items');
                    setIsLoading(false);
                    navigation.navigate('DashboardScreen');
                    Alert.alert('Success', 'Item added to Buy Items.');
                })
                .catch((error) => {
                    console.error('Error adding item to items: ', error);
                    setIsLoading(false);
                    Alert.alert('Error', 'Could not add item. Please try again later.');
                });
        }
    };

    // const [titlePlaceholderPos] = useState(new Animated.Value(35));
    // const [descriptionPlaceholderPos] = useState(new Animated.Value(35));
    // const [phonePlaceholderPos] = useState(new Animated.Value(35));
    // const [titlePlaceholderColor, setTitlePlaceholderColor] = useState('#828282');
    // const [descriptionPlaceholderColor, setDescriptionPlaceholderColor] = useState('#828282');
    // const [phonePlaceholderColor, setPhonePlaceholderColor] = useState('#828282');
    // const [titlePlaceholderwidth, setTitlePlaceholderwidth] = useState(37);
    // const [descriptionPlaceholderwidth, setDescriptionPlaceholderwidth] = useState(85);
    // const [phonePlaceholderwidth, setPhonePlaceholderwidth] = useState(50);
    // const [borderTitle, setBorderTitle] = useState('#c7c7c7');
    // const [borderDescription, setBorderDescription] = useState('#c7c7c7');
    // const [borderPhone, setBorderPhone] = useState('#c7c7c7');

    // useEffect(() => {
    //     setTitlePlaceholderColor(title === '' ? '#828282' : '#D4ED26');
    //     setDescriptionPlaceholderColor(description === '' ? '#828282' : '#D4ED26');
    //     setPhonePlaceholderColor(phone === '' ? '#828282' : '#D4ED26');
    //     setTitlePlaceholderwidth(title === '' ? 37 : 37);
    //     setDescriptionPlaceholderwidth(description === '' ? 85 : 85);
    //     setPhonePlaceholderwidth(phone === '' ? 50 : 50);
    //     setBorderTitle(title === '' ? '#c7c7c7' : '#D4ED26');
    //     setBorderDescription(description === '' ? '#c7c7c7' : '#D4ED26');
    //     setBorderPhone(phone === '' ? '#c7c7c7' : '#D4ED26');
    // }, [title, description, phone]);


    // if (isLoading) {
    //     return (
    //         <View style={styles.preloader}>
    //             <ActivityIndicator size="large" color="#9E9E9E" />
    //         </View>
    //     );
    // }

    return (
        <NativeBaseProvider>
            <Center>
                <Container flex="1">
                    <Flex direction="column" mt="70" alignItems="center" justifyContent="center">
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Sell Your Item</Text>
                            <Text style={styles.headerDesc}>List your item to sell in just a few steps. Enter the following details.</Text>
                        </View>
                    </Flex>
                    <Flex direction="column" alignItems="center" justifyContent="center">
                        <Input size="md" mt="170" placeholder="md Input" />
                    </Flex>

                    {/* <View style={styles.formGroup}>
                <TouchableOpacity style={styles.image} onPress={pickImage}>
                    <Text style={styles.imageText}>Attach Image</Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image }} style={{ width: 20, height: 20 }} />}
                <Animated.Text
                    style={[styles.placeholder, { marginLeft: 20, top: titlePlaceholderPos, color: titlePlaceholderColor, width: titlePlaceholderwidth }]}
                >
                    Title
                </Animated.Text>
                <TextInput
                    style={[styles.inputStyle, { borderColor: borderTitle }]}
                    value={title}
                    onChangeText={(val) => updateInputVal(val, 'title')}
                    onFocus={() => {
                        {
                            Animated.timing(titlePlaceholderPos, {
                                toValue: 10,
                                duration: 200,
                                useNativeDriver: false,
                            }).start();
                        }; setTitlePlaceholderColor('#D4ED26'); setTitlePlaceholderwidth(37);
                        setBorderTitle('#D4ED26');
                    }}
                    onBlur={() => {
                        {
                            if (title.length === 0) {
                                Animated.timing(titlePlaceholderPos, {
                                    toValue: 35,
                                    duration: 200,
                                    useNativeDriver: false,
                                }).start();
                            }
                        }; setTitlePlaceholderColor(title === '' ? '#828282' : '#D4ED26');
                        setBorderTitle(title === '' ? '#c7c7c7' : '#D4ED26')
                    }}
                />
                <Animated.Text
                    style={[styles.placeholder, { marginLeft: 20, top: descriptionPlaceholderPos, color: descriptionPlaceholderColor, width: descriptionPlaceholderwidth }]}
                >
                    Description
                </Animated.Text>
                <TextInput
                    style={[styles.inputStyle, { borderColor: borderDescription, height: 150, padding: 15, textAlignVertical: 'top' }]}
                    value={description}
                    onChangeText={(val) => updateInputVal(val, 'description')}
                    multiline={true}
                    numberOfLines={8}
                    onFocus={() => {
                        {
                            Animated.timing(descriptionPlaceholderPos, {
                                toValue: 10,
                                duration: 200,
                                useNativeDriver: false,
                            }).start();
                        }; setDescriptionPlaceholderColor('#D4ED26'); setDescriptionPlaceholderwidth(85);
                        setBorderDescription('#D4ED26');
                    }}
                    onBlur={() => {
                        {
                            if (description.length === 0) {
                                Animated.timing(descriptionPlaceholderPos, {
                                    toValue: 35,
                                    duration: 200,
                                    useNativeDriver: false,
                                }).start();
                            }
                        }; setDescriptionPlaceholderColor(description === '' ? '#828282' : '#D4ED26');
                        setBorderDescription(description === '' ? '#c7c7c7' : '#D4ED26')
                    }} />
                <Animated.Text
                    style={[styles.placeholder, { marginLeft: 20, top: phonePlaceholderPos, color: phonePlaceholderColor, width: phonePlaceholderwidth }]}
                >
                    Phone
                </Animated.Text>
                <TextInput
                    style={[styles.inputStyle, { borderColor: borderPhone }]}
                    value={phone}
                    onChangeText={(val) => updateInputVal(val, 'phone')}


                    onFocus={() => {
                        {
                            Animated.timing(phonePlaceholderPos, {
                                toValue: 10,
                                duration: 200,
                                useNativeDriver: false,
                            }).start();
                        }; setPhonePlaceholderColor('#D4ED26'); setPhonePlaceholderwidth(50);
                        setBorderPhone('#D4ED26');
                    }}
                    onBlur={() => {
                        {
                            if (description.length === 0) {
                                Animated.timing(phonePlaceholderPos, {
                                    toValue: 35,
                                    duration: 200,
                                    useNativeDriver: false,
                                }).start();
                            }
                        }; setPhonePlaceholderColor(phone === '' ? '#828282' : '#D4ED26');
                        setBorderPhone(phone === '' ? '#c7c7c7' : '#D4ED26')
                    }} />
                <Checkbox color="success" label="Donate This Item" checkboxStyle={styles.checkbox} labelStyle={styles.label} onChange={(isChecked) => setIsDonated(isChecked)} />

                <TouchableOpacity style={styles.button} onPress={() => { sellItem; uploadImage }}>
                    <Text style={styles.buttonText}>Post Item</Text>
                </TouchableOpacity>

            </View> */}

                </Container >
            </Center>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 20,
        backgroundColor: '#fff',
        overflowY: 'auto'
    },
    header: {
        marginTop: -30,
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
    image: {
        marginTop: 30,
        backgroundColor: '#000',
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center'
    },
    imageText: {
        fontFamily: 'Raleway-Bold',
        color: '#fff',
        fontSize: 20,
        marginTop: -10,
    },
    buttonText: {
        fontFamily: 'Raleway-Bold',
        color: '#000',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20,

    },
    button: {
        marginTop: 60,
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
    checkbox: {
        marginTop: 10,
        marginLeft: 10,
    },
    label: {
        fontFamily: 'Raleway',
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10
    },
});

export default Sell;