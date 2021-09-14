import React, { useState, useEffect, Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
//import auth from '@react-native-firebase/auth';
//import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import * as Google from 'expo-google-app-auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

//import { GoogleSignin } from '@react-native-google-signin/google-signin';

/*GoogleSignin.configure({
    webClientId: '59732661679-dvotc3hag913mcvcog08o7uj1rffeuvm.apps.googleusercontent.com',
});*/

const firebaseConfig = {
    apiKey: "AIzaSyDyXuRrPDxYFQEUT4qJDjhM6lzdx3sRnU8",
    authDomain: "barcode-miniproject.firebaseapp.com",
    projectId: "barcode-miniproject",
    storageBucket: "barcode-miniproject.appspot.com",
    messagingSenderId: "59732661679",
    appId: "1:59732661679:web:7ab3faaf49809a9ef6cb5a",
    measurementId: "G-CYXHYG9Q0C"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);





function Login() {
    signInWithGoogleAsync= async () => {
        try {
            const result = await Google.logInAsync({
                //androidClientId: YOUR_CLIENT_ID_HERE,
                behavior: 'web',
                iosClientId: '59732661679-ehn1dhjot8b1b2ojvtaqatt23suu7vik.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Button title={'Login With Google'} onPress={() => { this.signInWithGoogleAsync }} />
        </View>
    );
                //this.props.navigation.navigate('Login')
}


function MyPage() {
    

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    })
        /*onAuthStateChanged(user => {
            if (!user) {

                signInWithPopup(provider);
                //this.prop.navigation.navigate('Login')
            }
            else {
                
            }
        });*/
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            Hello, {user.name}
        </View>
    );
    }


    /*return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            Hello, {user.name}
        </View>
    );*/


    /*async function onGoogleButtonPress() {
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }*/
    function GoogleSignIn() {
        return (
            <Button
                title="Google Sign-In"
                onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
            />
        );
    }






const Tab = createBottomTabNavigator();

function ScanPage() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const web_head = 'https://api.nal.usda.gov/fdc/v1/food/';
    const web_tail = '?api_key=DEMO_KEY';
    var temp;

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        temp = web_head + data + web_tail; //create url for api and save into variable
        console.log(temp);//log url onto console
    }
    /*var communicate_api = (link) => {
        json = fetch(temp, method: 'GET')
            .then((response) => response.json())
            .then((json)) ==> {
                return json.
            }

    }*/



    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const opacity = 'rgba(0, 0, 0, .6)';
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: "center",
        },
        description: {
            fontSize: 20,
            marginTop: "70%",
            textAlign: "center",
            color: "white",
        },
        layerTop: {
            flex: 2,
            backgroundColor: opacity
        },
        layerCenter: {
            flex: 1,
            flexDirection: 'row'
        },
        layerLeft: {
            flex: 1,
            backgroundColor: opacity
        },
        focused: {
            flex: 10
        },
        layerRight: {
            flex: 1,
            backgroundColor: opacity
        },
        layerBottom: {
            flex: 2,
            backgroundColor: opacity
        },
    });

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={[StyleSheet.absoluteFill, styles.container]}
            >
                <View style={styles.layerTop}>
                    <Text style={styles.description}>Scan your barcode</Text>
                </View>
                <View style={styles.layerCenter}>
                    <View style={styles.layerLeft} />
                    <View style={styles.focused}>
                    </View>
                    <View style={styles.layerRight} />
                </View>
                <View style={styles.layerBottom} />
            </BarCodeScanner>
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => { setScanned(false) }} />}
        </View>
    );
    
}

function MainPage() {
    return (
        <View>
            <Text>Welcome</Text>
        </View>
        );
}



export default function App() {
    
    /*onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;

            
        } else {
            // User is signed out
            return (
                <View>
                    <Button title={'Login With Google'} onPress={() => { Login }} />
                </View>
            );
        }
    });*/

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Main' component={MainPage} />
                <Tab.Screen name='Scan' component={ScanPage} />
                <Tab.Screen name='Me' component={MyPage} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

