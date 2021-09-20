import React from 'react';
import { StyleSheet, Text, View } from 'react-native';  

export default function MainScreen() {
    return (
        <View>
           <Text style={styles.text}>Scanned Food History</Text>
        </View>
        );
}


const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 30,
        fontStyle: 'italic',
        marginTop: '5%',
        marginBottom: '10%',
        fontWeight: 'bold',
        color: 'navy',
      },
});