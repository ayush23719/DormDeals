import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { NativeBaseProvider, extendTheme, Box, Heading, Text, Image, Center, AspectRatio } from 'native-base';
import firebase from '../database/firebase';

const Buy = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const itemsRef = firebase.firestore().collection('items');
            const snapshot = await itemsRef.get();
            const itemsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setItems(itemsData);
        };

        fetchItems();
    }, []);

    const renderCard = ({ item }) => {
        return (
            <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }} mb={4}>
                <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                        <Image source={{ uri: item.imageURL }} alt="image" />
                    </AspectRatio>
                    <Center bg="violet.500" _dark={{ bg: "violet.400" }} _text={{ color: "warmGray.50", fontWeight: "700", fontSize: "xs" }} position="absolute" bottom="0" left="0" px="3" py="1.5">
                        PHOTOS
                    </Center>
                </Box>
                <Box p="4" space={3}>
                    <Heading size="md" ml="-1">
                        {item.title}
                    </Heading>
                    <Text fontSize="xs" _light={{ color: "violet.500" }} _dark={{ color: "violet.400" }} fontWeight="500" ml="-0.5" mt="-1">
                        Seller's Phone: {item.phone}
                    </Text>
                    <Text fontWeight="400">{item.description}</Text>
                </Box>
            </Box>
        );
    };

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Box pl={4} pr={-10} pt={4}>
                    <Box ml={-1}>
                        <Heading mb={4} fontSize="4xl" textAlign="left" ml={-5}>
                            Buy Items
                        </Heading>
                        <Text fontSize="lg" mb={4} textAlign="left" ml={-5}>
                            Explore a wide range of items available for purchase.
                            Find the perfect item for you!
                        </Text>
                    </Box>
                </Box>
                <FlatList
                    data={items}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    listContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});

export default Buy;
