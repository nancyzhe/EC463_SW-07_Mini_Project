import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Scanner from './screens/Scanner';

function SignIn() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign in</Text>
    </View>
  );
}

function ScanPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

function Profile() {
  return (
      <View>
          <Text>Welcome</Text>
      </View>
      );
}
const Tab = createBottomTabNavigator();


function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
        <Tab.Screen 
          name='Me' 
          component={Profile} 
          options={{
           tabBarIcon: (size) => (
             <Ionicons name = "ios-person" size = {28}/>
            ),
          }}
        />
        <Tab.Screen 
          name='Main' 
          component={SignIn} 
          options={{
            tabBarIcon: (size) => (
              <Ionicons name = "home" size = {30}/>
            ),
          }}
        />
        <Tab.Screen 
        name='Scan' 
        component={Scanner}  
        options={{
          tabBarIcon: (size) => (
            <Ionicons name = "barcode-sharp" size = {30}/>
          ),
        }}
        />
    </Tab.Navigator>
</NavigationContainer>

  );
}

export default App;
