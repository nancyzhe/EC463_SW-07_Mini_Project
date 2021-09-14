import React, { useState, useEffect, Component } from 'react';
import { Button, Dimensions, StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


const { width } = Dimensions.get('window');

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    Alert.alert(
      'Item Scanned',
      "Bar code with type ${type} and data ${data} has been scanned!",
      [
        {text: 'Save', onPress: () => setScanned(false), style: 'cancel'},
        {text: 'Discard', onPress: () => setScanned(false), style: 'cancel'},
      ],
      { cancelable: false }
    )   
  };


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFill, styles.container]}
        >
          <View style={styles.layerTop}>
            <Text style={styles.description}>Scan your barcode</Text>
          </View>
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft}/>
            <View style={styles.focused}>
          </View>
          <View style={styles.layerRight}/>
          </View>
          <View style={styles.layerBottom}/>
         </BarCodeScanner>
        </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonStyle}>
          <Button title={'History'} />
      </View>
      <View style={styles.buttonStyle}>
          <Button title={"Scan"}/>
      </View>
  </View>
  </>
    );
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
  buttonStyle: {
    flex: 1,
    marginBottom: "3%"
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