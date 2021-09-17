import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {temp} from '../screens/ScanScreen';


export default function ResultScreen() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const url = temp;
    useEffect(() => {
        fetch(url).then((response) => response.json())
            .then((json) => setData(json.foods[0]))
            .finally(() => setLoading(false));
    })

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