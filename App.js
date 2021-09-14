import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scanner from './components/Scanner';

function SignIn({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign in</Text>
      <Button
        title="Start Scanning"
        onPress={() => navigation.navigate('Scan_BarCode')}
        />
    </View>
  );
}

function Scan_BarCode({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "SignIn"
          component = {SignIn}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name = "Scan_BarCode"
          component = {Scanner}
          options={{ title: 'Scan' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
