import { React, useCallback } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
export default function App() {
  // const handleGetStarted = () => {
  //   //next screen
  //   console.log("something...");
  // };
  const [fontsLoaded] = useFonts({
    'Raleway': require('./assets/fonts/static/Raleway-Bold.ttf'),
    'Kanit': require('./assets/fonts/Kanit-Regular.ttf'),
    'NanumGothic': require('./assets/fonts/NanumGothic-Regular.ttf'),
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
        Welcome To DormDeals
      </Text>
      <Text style={styles.description}>
        Buy, Sell or donate your old hostel stuff with just a few clicks. It's that easy!
      </Text>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 40,
  },
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginTop: 90,
  },
  heading: {
    fontFamily: 'Raleway',
    fontSize: 40,
    marginTop: 130,
  },
  description: {
    fontFamily: 'Raleway',
    fontSize: 20,
    marginTop: 10,
  },
  button: {
    height: 50,
    width: 320,
    marginTop: 50,
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 10,
  },
  buttonText: {
    fontFamily: 'Raleway',
    color: '#fff',
    fontSize: 20,

  },
});

