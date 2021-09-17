import React, { useState, useEffect, Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Button, Dimensions, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
//import { initializeApp, firebase } from "firebase/app";
//import { getAuth, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
//import { GoogleAuthProvider } from "firebase/auth";
import * as Google from 'expo-google-app-auth';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDatabase, ref, set } from 'firebase/database';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

//import { GoogleSignin } from '@react-native-google-signin/google-signin';

/*GoogleSignin.configure({
    webClientId: '59732661679-dvotc3hag913mcvcog08o7uj1rffeuvm.apps.googleusercontent.com',
});*/

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "barcode-miniproject.firebaseapp.com",
    projectId: "barcode-miniproject",
    storageBucket: "barcode-miniproject.appspot.com",
    messagingSenderId: "59732661679",
    appId: "1:59732661679:web:7ab3faaf49809a9ef6cb5a",
    measurementId: "G-CYXHYG9Q0C"
};
// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//var database = firebase.database();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


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
    

    //const provider = new GoogleAuthProvider();
    //const auth = getAuth();
    /*signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    })/*
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
          <Text>
            Hello, whatever your name is
          </Text>
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


const web_head = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=';
const web_tail = '&api_key=DEMOKEY';
let temp = '';

function ScanPage({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    
    
    

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        temp = web_head + data.substring(1) + web_tail; //create url for api and save into variable
        return (
            Alert.alert(
                'Scanned!',
                `Bar code with type ${type} and data ${data} has been scanned!`,
                )
        );
        
    }
    



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
            {scanned && <Button title={'Go to Result'} onPress={() => navigation.navigate('Scan Result')} />}
        </View>
    );
    
}

//

/*function communicate_api(scan_url)  {
    return fetch(scan_url)
        .then((response) => response.json())
        .then((json) => {
            return json.foods;
        })

}*/



function ResultPage() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const url = temp;
    useEffect(() => {
        fetch(url).then((response) => response.json())
            .then((json) => setData(json.foods[0]))
            .finally(() => setLoading(false));
    })

    //let name_temp = JSON.stringify(data.lowercaseDescription);
    //let nutrition_temp = 

    //writeUserData(data); save data to firebase

    //let food_name = search_result.lowercaseDescription;
    return (
        <SafeAreaView>
          {isLoading ? (
                <ActivityIndicator />
            ) : (
                    <View>
                        <FlatList
                            data={data.foodNutrients}
                            keyExtractor={({ nutrientId }) => nutrientId}
                            renderItem={({ item }) => (
                                <Text>
                                    {item.nutrientName}
                                    {item.value}
                                    {item.unitName}
                                </Text>
                            )}
                        />
                    </View>
                )}
            
        </SafeAreaView>
    );
}

/*
 * 
 
 */


function writeUserData(packet) {
    const db = getDatabase();
    /*set(ref(db, 'history/demo_history'), {
        name: name
        //info: nutrition
    });*/
    setDoc(doc(db, 'history'), packet);
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

    function HomeTabs() {
        return (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen 
                  name='Me' 
                  component={MyPage} 
                  options={{
                  tabBarIcon: (size) => (
                    <Ionicons name = "ios-person" size = {28}/>
                  ),
                }}
               />
                <Tab.Screen 
                  name='Main' 
                  component={MainPage} 
                  options={{
                  tabBarIcon: (size) => (
                    <Ionicons name = "home" size = {30}/>
                  ),
                }}
              />
                <Tab.Screen 
                  name='Scan' 
                  component={ScanPage}  
                  options={{
                  tabBarIcon: (size) => (
                  <Ionicons name = "barcode-sharp" size = {30}/>
                ),
              }}
            />
            </Tab.Navigator>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Food Tracker" component={HomeTabs} />
                <Stack.Screen name="Scan Result" component={ResultPage} />
            </Stack.Navigator>
        </NavigationContainer>
        
        );
    
}

