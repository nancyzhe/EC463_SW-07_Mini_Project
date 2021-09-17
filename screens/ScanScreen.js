import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


function ScanScreen({ navigation }) {
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

export default ScanScreen;