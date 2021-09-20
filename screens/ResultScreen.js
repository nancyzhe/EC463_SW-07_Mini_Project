import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {temp} from '../screens/ScanScreen';

import * as firebase from 'firebase';//import firebase
import 'firebase/firestore';//import firebase

export default function ResultScreen() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const url = temp;
    useEffect(() => {
        fetch(url).then((response) => response.json())
            .then((json) => setData(json.foods[0]))
            .finally(() => setLoading(false));
    })

    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    

    if (setLoading == false) { // if Data is loaded
        let food_name = data.description; //save food name into variable "food_name"
        var length = Object.keys(data.foodNutrients).length;// getting the json array length for nutrient array
        let iterator = data.foodNutrients;
        
        for (let i = 0; i < length; i++) { // looping through all nutrients
            db.collection('users')
                .doc(currentUser.uid)
                .collection('history')
                .doc(food_name)
                .set({
                    name: iterator[i].nutrientName,
                    info: { // nested array
                        value: iterator[i].value,
                        unit: iterator[i].unitName,
                    }
                });
        }
    }

    return (
        <SafeAreaView>
          {isLoading ? (
                <ActivityIndicator />
            ) : (
                    <View>
                        <Text> {data.description} </Text>
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