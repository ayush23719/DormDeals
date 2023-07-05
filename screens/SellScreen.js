import React, { useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import firebase from '../database/firebase';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { NativeBaseProvider, extendTheme, Heading, Text, Checkbox, Link, Input, Button, Box, Flex, Center, Spinner, InputLeftAddon, Alert, IconButton, CloseIcon, HStack } from 'native-base';
const Sell = ({ navigation }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertDescription, setAlertDescription] = useState('');
    const [alertStatus, setAlertStatus] = useState('info');


    const handleAlertClose = () => {
        setShowAlert(false);
    };


    const [loading, setLoading] = useState(false);
    const cancelRef = useRef();
    const theme = extendTheme({
        fonts: {
            heading: 'Raleway',
            body: 'Raleway',
            mono: 'Raleway',
        },
        components: {
            Button: {
                baseStyle: {
                    _pressed: {
                        bg: 'black',
                    },
                    _hover: {
                        bg: 'gray.900',
                    },
                },
                variants: {
                    solidBlack: {
                        bg: 'black',
                    },
                },
                defaultProps: {
                    variant: 'solidBlack',
                },
            },
        },

    });


    const [fontsLoaded] = useFonts({
        'Raleway-Bold': require('../assets/fonts/static/Raleway-Bold.ttf'),
        'Raleway-Medium': require('../assets/fonts/static/Raleway-Medium.ttf'),
        'Raleway': require('../assets/fonts/static/Raleway-Regular.ttf'),
        'Kanit': require('../assets/fonts/Kanit-Regular.ttf'),
        'NanumGothic': require('../assets/fonts/NanumGothic-Regular.ttf'),
    });
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [isDonated, setIsDonated] = useState(false);
    const [image, setImage] = useState(null);
    const updateInputVal = (val, prop) => {
        if (prop === 'title') {
            setTitle(val);
        } else if (prop === 'phone') {
            setPhone(val);
        }
        else if (prop === 'price') {
            setPrice(val);
        }
        else {
            setDescription(val);
        }

    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const [imageURL, setImageURL] = useState(null);

    const uploadImage = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const filename = Date.now().toString();

            const storageRef = firebase.storage().ref().child(`images/${filename}`);
            await storageRef.put(blob);

            const url = await storageRef.getDownloadURL();
            setImageURL(url); // Update the imageURL state
            return url; // Return the URL from the function
        } catch (error) {
            console.error('Error uploading image: ', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
    };

    const sellItem = async () => {
        if (!title || !description || !phone) {
            setAlertTitle('Error');
            setAlertDescription('Please fill in all the required fields.');
            setAlertStatus('error');
            setShowAlert(true);
            return;
        }
        if (!image) {
            setAlertTitle('Error');
            setAlertDescription('Please upload an image.');
            setAlertStatus('error');
            setShowAlert(true);
            return;
        }

        if (!isDonated && !price) {
            setAlertTitle('Error');
            setAlertDescription('Please fill in the price field.');
            setAlertStatus('error');
            setShowAlert(true);
            return;
        }
        setLoading(true);
        const userID = firebase.auth().currentUser.uid;
        const itemsRef = firebase.firestore().collection('items');
        const donatedItemsRef = firebase.firestore().collection('donatedItems');

        const item = {
            title: title,
            description: description,
            phone: phone,
            isDonated: isDonated,
            userID: userID,
            price: price,
        };

        if (image) {
            try {
                const uploadedImageUrl = await uploadImage(image);
                item.imageURL = uploadedImageUrl;

                if (isDonated) {
                    donatedItemsRef
                        .add(item)
                        .then(() => {
                            console.log('Item added to donated items');
                            setShowAlert(true);
                            setAlertStatus('success');
                            setAlertDescription('Your item was successfully posted!');
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'TabNavigator' }],
                            });
                        })
                        .catch((error) => {
                            console.error('Error adding item to donated items: ', error);
                            setShowAlert(true);
                            setAlertDescription('Error adding item to donated items. Please try again later.');
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                } else {
                    itemsRef
                        .add(item)
                        .then(() => {
                            console.log('Item added to items');
                            setShowAlert(true);
                            setAlertStatus('success');
                            setAlertDescription('Your item was successfully posted!');
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'TabNavigator' }],
                            });
                        })
                        .catch((error) => {
                            console.error('Error adding item to items: ', error);
                            setShowAlert(true);
                            setAlertStatus('error');
                            setAlertDescription('Error posting your item. Please try again later.');
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                }
            } catch (error) {
                console.error('Error uploading image: ', error);
                setShowAlert(true);
                setAlertDescription('Error uploading image. Please try again later.');
                setLoading(false);
            }
        } else {
            // No image selected
            if (isDonated) {
                donatedItemsRef
                    .add(item)
                    .then(() => {
                        console.log('Item added to donated items');
                        setShowAlert(true);
                        setAlertStatus('success');
                        setAlertDescription('Item added to donations!');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'TabNavigator' }],
                        });

                    })
                    .catch((error) => {
                        console.error('Error adding item to donated items: ', error);
                        setShowAlert(true);
                        setAlertStatus('error');
                        setAlertDescription('Error adding item to donated items. Please try again later.');
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                itemsRef
                    .add(item)
                    .then(() => {
                        console.log('Item added to items');
                        setShowAlert(true);
                        setAlertStatus('success');
                        setAlertDescription('Your item was successfully posted!');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'TabNavigator' }],
                        });
                    })
                    .catch((error) => {
                        console.error('Error adding item to items: ', error);
                        setShowAlert(true);
                        setAlertStatus('error');
                        setAlertDescription('Error posting your item. Please try again later.');
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    };


    return (
        <NativeBaseProvider theme={theme}>
            <Box flex={1} p={4} justifyContent="center" alignItems="center">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1, width: '100%', paddingTop: 20, paddingBottom: 20 }}>
                        <Heading mb={4} fontSize="4xl">
                            Sell Your Item
                        </Heading>
                        <Text fontSize="lg" mb={4}>
                            List your item to sell in just a few steps. Just enter the following details!
                        </Text>
                        <Box mb={2}>
                            <Input placeholder="Title" fontSize="md" value={title} onChangeText={(val) => updateInputVal(val, 'title')} />
                        </Box>
                        <Box mb={2}>
                            <Input placeholder="Description" multiline minHeight={120} textAlignVertical="top" fontSize="md" value={description} onChangeText={(val) => updateInputVal(val, 'description')} />
                        </Box>
                        <Box mb={2} flexDirection="row" alignItems="center">
                            <InputLeftAddon children="Rupees (₹)" width="30%" height={50} />
                            <Input flex={1} placeholder="Price" fontSize="md" height={50} value={price} onChangeText={(val) => updateInputVal(val, 'price')} isDisabled={isDonated} />
                        </Box>
                        <Box mb={2}>
                            <Input placeholder="Phone Number" fontSize="md" value={phone} onChangeText={(val) => updateInputVal(val, 'phone')} />
                        </Box>

                        <Flex direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox value="donate" colorScheme="primary" accessibilityLabel="Donated Items" size="md" onChange={(isChecked) => setIsDonated(isChecked)} />
                                <Text ml={2} fontSize="md">
                                    Donate Item
                                </Text>
                            </View>
                            <Link _text={{ fontSize: 'md' }} onPress={pickImage}>
                                Attach Image
                            </Link>
                        </Flex>
                        {image && (
                            <Box alignItems="center" mb={4}>
                                <Image source={{ uri: image }} style={{ width: 300, height: 150 }} />
                            </Box>
                        )}
                        {loading ? (
                            <Center flex={1}>
                                <Spinner accessibilityLabel="Loading" />
                            </Center>
                        ) : (
                            <Center>
                                <Box height={60} width="100%" mb={4}>
                                    <TouchableOpacity onPress={sellItem} activeOpacity={0.7}>
                                        <Box
                                            bg="black"
                                            py={4}
                                            px={6}
                                            borderRadius="md"
                                            alignItems="center"
                                            width="100%"
                                            _hover={{
                                                bg: 'gray.700',
                                            }}
                                        >
                                            <Text color="white" fontSize={18}>
                                                Post Item
                                            </Text>
                                        </Box>
                                    </TouchableOpacity>
                                </Box>
                            </Center>
                        )}
                    </View>
                </ScrollView>
            </Box>
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
        </NativeBaseProvider >
    );
};
export default Sell;