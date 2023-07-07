import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import firebase from '../database/firebase';
import { useFonts } from 'expo-font';
import PieChart from 'react-native-pie-chart';
import { NativeBaseProvider, extendTheme, Heading, IconButton } from 'native-base';

const Dashboard = () => {
    const theme = extendTheme({
        fonts: {
            heading: 'Raleway',
            body: 'Raleway',
        },
    });

    const [fontsLoaded] = useFonts({
        'Raleway-Bold': require('../assets/fonts/static/Raleway-Bold.ttf'),
        'Raleway-Medium': require('../assets/fonts/static/Raleway-Medium.ttf'),
        'Raleway': require('../assets/fonts/static/Raleway-Regular.ttf'),
        'Kanit': require('../assets/fonts/Kanit-Regular.ttf'),
        'NanumGothic': require('../assets/fonts/NanumGothic-Regular.ttf'),
    });
    const [firstName, setFirstName] = useState('');
    const [totalItems, setTotalItems] = useState(0);
    const [donationItems, setDonationItems] = useState(0);
    const [sellingItems, setSellingItems] = useState(0);

    const statsContainerStyle = {
        alignItems: 'center',
        marginTop: 20,
    };

    const pieChartContainerStyle = {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    };

    useEffect(() => {
        const user = firebase.auth().currentUser;
        const fullName = user.displayName;
        const nameArray = fullName.split(' ');
        const firstName = nameArray[0];
        setFirstName(firstName);
        // Fetch data from Firebase to calculate the stats 
        const itemsRef = firebase
            .firestore()
            .collection('items')
            .where('userID', '==', user.uid);
        const donatedItemsRef = firebase
            .firestore()
            .collection('donatedItems')
            .where('userID', '==', user.uid); // Filter items by user ID

        Promise.all([donatedItemsRef.get(), itemsRef.get()])
            .then(([donatedItemsSnapshot, itemsSnapshot]) => {
                const donationItems = donatedItemsSnapshot.size;
                const sellingItems = itemsSnapshot.size;
                setDonationItems(donationItems);
                setSellingItems(sellingItems);
                setTotalItems(donationItems + sellingItems);
            })
            .catch((error) => {
                console.log('Error fetching data:', error);
            });
    }, []);


    const chart_wh = 300;

    const pieChartData = [donationItems, sellingItems];
    const sliceColor = ['#d4ed26', '#000000'];

    // Check if data has been fetched
    const isDataFetched = totalItems !== 0;


    return (
        <NativeBaseProvider theme={theme}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.greetingsContainer}>
                    <Heading mb={4} fontSize="4xl">
                        Hello, {firstName}
                    </Heading>
                </View>
                <View style={styles.statsContainer}>
                    <Heading mb={4} fontSize="xl">
                        Your Statistics:
                    </Heading>
                    <View style={statsContainerStyle}>
                        {isDataFetched ? (
                            <>
                                <View style={pieChartContainerStyle}>
                                    <PieChart
                                        widthAndHeight={chart_wh}
                                        series={pieChartData}
                                        sliceColor={sliceColor}
                                        coverRadius={0.65}
                                    />
                                </View>
                                <View style={styles.legendsContainer}>
                                    <View style={styles.legendItem}>
                                        <View
                                            style={[
                                                styles.legendIcon,
                                                { backgroundColor: sliceColor[0] },
                                            ]}
                                        />
                                        <Text style={styles.legendText}>Donation Items</Text>
                                    </View>
                                    <View style={styles.legendItem}>
                                        <View
                                            style={[
                                                styles.legendIcon,
                                                { backgroundColor: sliceColor[1] },
                                            ]}
                                        />
                                        <Text style={styles.legendText}>Selling Items</Text>
                                    </View>
                                </View>
                                <Text style={styles.statsText}>Total Items Posted: {totalItems}</Text>
                                <Text style={styles.statsText}>Donation Items: {donationItems}</Text>
                                <Text style={styles.statsText}>Selling Items: {sellingItems}</Text>
                            </>
                        ) : (
                            <>
                                <View style={pieChartContainerStyle}>
                                    <PieChart
                                        widthAndHeight={chart_wh}
                                        series={[1]}
                                        sliceColor={['gray']}
                                        coverRadius={0.65}
                                    />
                                </View>
                                <View style={styles.legendsContainer}>
                                    <View style={styles.legendItem}>
                                        <View
                                            style={[styles.legendIcon, { backgroundColor: 'gray' }]}
                                        />
                                        <Text style={styles.legendText}>No Items Posted</Text>
                                    </View>
                                </View>
                                <Text style={styles.statsText}>Total Items Posted: 0</Text>
                                <Text style={styles.statsText}>Donation Items: 0</Text>
                                <Text style={styles.statsText}>Selling Items: 0</Text>
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    greetingsContainer: {
        marginBottom: 20,
    },
    statsContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    statsText: {
        fontSize: 16,
        marginBottom: 5,
    },
    legendsContainer: {
        marginTop: 20,
        flexDirection: 'column',
        paddingHorizontal: 50,
        marginBottom: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    legendIcon: {
        width: 15,
        height: 15,
        marginRight: 5,
        borderRadius: 10,
    },
    legendText: {
        fontSize: 14,
    },
});

export default Dashboard;
