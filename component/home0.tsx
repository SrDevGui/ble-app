import { Text, View, StyleSheet, PermissionsAndroid, Platform, NativeEventEmitter, NativeModules, Button, FlatList, Linking, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';


import BleManager, { Peripheral } from 'react-native-ble-manager';

//Native Modules access
const BleManagerModule = NativeModules.BleManager;
const bleEmmiter = new NativeEventEmitter(BleManagerModule);


const openAppSettings = () => {
  Linking.openSettings();
};

const checkAndRequestBLEPermissions = async () => {
  if (Platform.OS === 'android') {

    const apiLevel = await Platform.Version;

    if (apiLevel < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission Required',
          message: 'This app needs access to your location to discover Bluetooth devices.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      console.log('Location permission granted:', granted);
    } else {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      const isGranted =
        result['android.permission.BLUETOOTH_CONNECT'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.BLUETOOTH_SCAN'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
        result['android.permission.ACCESS_FINE_LOCATION'] ===
        PermissionsAndroid.RESULTS.GRANTED;

        if(!isGranted) {
          console.log('Bluetooth permissions not granted');
    }
    }
  } 
};

function HomeScreen(){

  const [devices, setDevices] = useState<Peripheral[]>([]);
  const [scanning, setScanning] = useState(false);

  useEffect(()=>{
      // checkAndRequestBLEPermissions()
      BleManager.start({ showAlert: false }).then(() => {
        // Success code
        console.log("Module initialized");
      });


    const handleDiscoverPeripheral = (peripheral:Peripheral)=>{
      console.log('Discover:', peripheral.name || 'Unnamed', peripheral.id);

      setDevices(prev=>{
        const exists = prev.find(p=>p.id === peripheral.id);
        if(!exists) return [...prev, peripheral];
        return prev;
      }
      )
    }

    bleEmmiter.addListener('BleManagerDiscoverPeripheral',handleDiscoverPeripheral)
    return ()=>{
      bleEmmiter.removeAllListeners('BleManagerDiscoverPeripheral')
    };
},[]);


  const startScan = () => {
    console.log('Start scan');
    
    if (!scanning) {
      setDevices([]);
      setScanning(true);
      BleManager.scan([], 5, true)
        .then(() => {
          console.log('Scanning...');
        })
        .catch(err => console.error('Scan error', err))
        .finally(() => {
          setTimeout(() => setScanning(false), 10); // stop scan flag
        });
    }
  };


  return (
    <View style={styles.main}>
      <Text style={{fontSize:18}}>Available devices</Text>
      <Button title={scanning ? 'Scanning...' : 'Start scan'} onPress={startScan}  />
      <Button title="request permissions" onPress={checkAndRequestBLEPermissions} />
      <FlatList 
        data={devices}
        keyExtractor={item=>item.id}
        renderItem={({item})=>(
          <View>
            <Text>{item.name || 'Without name'}</Text>
            <Text>{item.id}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#F5FCFF',
  },
  deviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
})

export default HomeScreen;