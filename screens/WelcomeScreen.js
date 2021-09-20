import {ImageBackground, StyleSheet, View, Text, Image} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function WelcomeScreen ({navigation}) {
  return (
     <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to Your Food Tracker</Text>
      </View>
      <Image
      styles={styles.logo}
      source={require('../images/logo.png')}>
      </Image>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')} >
        <Text style={styles.buttonText}>Sign Up</Text>
       </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
     </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#ADD8E6',
    padding: 5,
    margin: '2%'
  },
  logo: {
    width: 20,
    height: 20,
    resizeMode: 'contain' 
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center'
  },
  inlineText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'navy',
    textAlign: 'center',
    marginTop: '5%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  titleContainer: {
    position: 'absolute',
    top: 200,
  },
});
