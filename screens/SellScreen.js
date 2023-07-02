import React, { useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { NativeBaseProvider, extendTheme, Heading, Text, Checkbox, Link, Input, Button, Box, Flex, Center } from 'native-base';
const Sell = ({ navigation }) => {
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
    const styles = StyleSheet.create({
        button: {
            fontSize: 18,
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
    const [phone, setPhone] = useState('');
    const [isDonated, setIsDonated] = useState(false);
    const [image, setImage] = useState(null);
    const updateInputVal = (val, prop) => {
        if (prop === 'title') {
            setTitle(val);
        } else if (prop === 'phone') {
            setPhone(val);
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

    const sellItem = () => {
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

                    navigation.navigate('DashboardScreen');
                    Alert.alert('Success', 'Item added to donations!');
                })
                .catch((error) => {
                    console.error('Error adding item to donated items: ', error);

                    Alert.alert('Error', 'Could not add item. Please try again later.');
                });
        } else {
            itemsRef
                .add(item)
                .then(() => {
                    console.log('Item added to items');

                    navigation.navigate('DashboardScreen');
                    Alert.alert('Success', 'Your item was successfully posted!');
                })
                .catch((error) => {
                    console.error('Error adding item to items: ', error);

                    Alert.alert('Error', 'Could not add item. Please try again later.');
                });
        }
    };
    return (
        <NativeBaseProvider theme={theme}>
            <Box flex={1} p={4} justifyContent="center" alignItems="center">
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
                </View>
            </Box>
        </NativeBaseProvider>
    );
};
export default Sell;