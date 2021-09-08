import React, { useState, useEffect } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const { width } = Dimensions.get('window');

export default function App() {
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
            <View style={styles.layerLeft}/>
            <View style={styles.focused}>
          </View>
          <View style={styles.layerRight}/>
          </View>
          <View style={styles.layerBottom}/>
         </BarCodeScanner>
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => { setScanned(false) }} />}
        </View>
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