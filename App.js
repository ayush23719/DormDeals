import { React, useCallback } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
export default function App() {
  // const handleGetStarted = () => {
  //   //next screen
  //   console.log("something...");
  // };
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat-VariableFont_wght.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image source={require('./assets/starter_icon.png')} style={styles.image} />
      <Text style={styles.heading}>
        Welcome to DormDeals
      </Text>
      <Text style={styles.description}>
        Buy, Sell or donate your old hostel stuff with just a few clicks. It's that easy!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  heading: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 110,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 90,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

