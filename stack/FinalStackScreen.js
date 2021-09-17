
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import LoadingScreen from '../screens/LoadingScreen';
import Dashboard from '../screens/Dashboard';
import MainScreen from '../screens/MainScreen';
import ScanScreen from '../screens/ScanScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function FinalStackScreen() {

    function HomeTabs() {
        return (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen 
                name='Me' 
                component={Dashboard} 
                options={{
                tabBarIcon: (size) => (
                    <Ionicons name = "ios-person" size = {28}/>
                ),
                }}
            />
                <Tab.Screen 
                name='Main' 
                component={MainScreen} 
                options={{
                tabBarIcon: (size) => (
                    <Ionicons name = "home" size = {30}/>
                ),
                }}
            />
                <Tab.Screen 
                name='Scan' 
                component={ScanScreen}  
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
                <Stack.Screen name={'Loading'} component={LoadingScreen} options={{ headerShown: false }}/>
                <Stack.Screen name='Home' component={WelcomeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name='Sign Up' component={SignUp} options={{ headerShown: false }}/>
                <Stack.Screen name='Sign In' component={SignIn} options={{ headerShown: false }}/>
                <Stack.Screen name={'Dashboard'} component={HomeTabs}  />
                <Stack.Screen name={'Result'} component={ResultScreen}  />
            </Stack.Navigator>
            </NavigationContainer>
        );
}
