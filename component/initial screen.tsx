import {ActivityIndicator, Text, View,FlatList, StyleSheet, NativeEventEmitter, NativeModules, PermissionsAndroid, Touchable, TouchableOpacity, Image, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BleManager from 'react-native-ble-manager';
import React,{useEffect, useState} from 'react';
import home from './home.tsx';
import image1 from '../assets/icons/Forward.png'


function InitialScreen(){

  const [grantedPermission, setGrantedPermission] = useState(false);
  const [connected, setConnect] = useState(false);
    
  const [currentDevice, setCurrentDevice] = useState<string | null>(null);
  const [infoConected, setInfoConected] = useState <any>([])
  const [isScanning, setScanning] = useState(false);
  const [bleDevices, setBleDevices] = useState <any[]>([]);
  const [idDevices, setIdDevices] = useState <any[]>([]);
  const [bleDevicesAllInfo, setBleDevicesAllInfo] = useState <any[]>([]); // Use any[] to store devices with all info

    
  const BleManagerModule = NativeModules.BleManager;
  const BleManagerEmitter = new NativeEventEmitter(BleManagerModule)


  useEffect(() => {
    BleManager.start({ showAlert: false }).then(() => {
      // Success code
      console.log("Module initialized");
    });
  })

  useEffect(()=>{
    BleManager.enableBluetooth()
      .then(() => {
        // Success code
        console.log("The bluetooth is already enabled or the user confirm");
        requestPermissions();
      })
      .catch((error) => {
        // Failure code
        console.log("The user refuse to enable bluetooth", error);
      });

  },[]);

  useEffect(()=>{
    if(connected){
      Alert.alert(`Conected to ${infoConected.name}`);

      let datas = infoConected
    //   let datas = {
    //     "characteristics": [
    //         {
    //             "properties": {
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a00",
    //             "service": "1800"
    //         },
    //         {
    //             "properties": {
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a01",
    //             "service": "1800"
    //         },
    //         {
    //             "properties": {
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a02",
    //             "service": "1800"
    //         },
    //         {
    //             "properties": {
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a04",
    //             "service": "1800"
    //         },
    //         {
    //             "properties": {
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a29",
    //             "service": "180a"
    //         },
    //         {
    //             "properties": {
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a28",
    //             "service": "180a"
    //         },
    //         {
    //             "properties": {
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a50",
    //             "service": "180a"
    //         },
    //         {
    //             "descriptors": [
    //                 {
    //                     "value": null,
    //                     "uuid": "2902"
    //                 }
    //             ],
    //             "properties": {
    //                 "Notify": "Notify",
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a19",
    //             "service": "180f"
    //         },
    //         {
    //             "properties": {
    //                 "WriteWithoutResponse": "WriteWithoutResponse",
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a4e",
    //             "service": "1812"
    //         },
    //         {
    //             "descriptors": [
    //                 {
    //                     "value": null,
    //                     "uuid": "2902"
    //                 },
    //                 {
    //                     "value": null,
    //                     "uuid": "2908"
    //                 }
    //             ],
    //             "properties": {
    //                 "Notify": "Notify",
    //                 "Write": "Write",
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a4d",
    //             "service": "1812"
    //         },
    //         {
    //             "descriptors": [
    //                 {
    //                     "value": null,
    //                     "uuid": "2902"
    //                 },
    //                 {
    //                     "value": null,
    //                     "uuid": "2908"
    //                 }
    //             ],
    //             "properties": {
    //                 "Notify": "Notify",
    //                 "Write": "Write",
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a4d",
    //             "service": "1812"
    //         },
    //         {
    //             "properties": {
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a4b",
    //             "service": "1812"
    //         },
    //         {
    //             "descriptors": [
    //                 {
    //                     "value": null,
    //                     "uuid": "2902"
    //                 }
    //             ],
    //             "properties": {
    //                 "Notify": "Notify",
    //                 "Write": "Write",
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a33",
    //             "service": "1812"
    //         },
    //         {
    //             "properties": {
    //                 "Read": "Read"
    //             },
    //             "characteristic": "2a4a",
    //             "service": "1812"
    //         },
    //         {
    //             "properties": {
    //                 "WriteWithoutResponse": "WriteWithoutResponse"
    //             },
    //             "characteristic": "2a4c",
    //             "service": "1812"
    //         },
    //         {
    //             "properties": {
    //                 "WriteWithoutResponse": "WriteWithoutResponse"
    //             },
    //             "characteristic": "fff1",
    //             "service": "fff0"
    //         },
    //         {
    //             "properties": {
    //                 "Read": "Read"
    //             },
    //             "characteristic": "fff2",
    //             "service": "fff0"
    //         },
    //         {
    //             "properties": {
    //                 "Read": "Read"
    //             },
    //             "characteristic": "fff3",
    //             "service": "fff0"
    //         }
    //     ],
    //     "services": [
    //         {
    //             "uuid": "1800"
    //         },
    //         {
    //             "uuid": "180a"
    //         },
    //         {
    //             "uuid": "180f"
    //         },
    //         {
    //             "uuid": "1812"
    //         },
    //         {
    //             "uuid": "fff0"
    //         }
    //     ],
    //     "advertising": {
    //         "manufacturerData": {},
    //         "txPowerLevel": -2147483648,
    //         "isConnectable": true,
    //         "serviceData": {},
    //         "localName": "BT5.0 Mouse",
    //         "serviceUUIDs": [
    //             "1812"
    //         ],
    //         "manufacturerRawData": {
    //             "bytes": [],
    //             "data": "",
    //             "CDVType": "ArrayBuffer"
    //         },
    //         "rawData": {
    //             "bytes": [
    //                 2,
    //                 1,
    //                 4,
    //                 3,
    //                 3,
    //                 18,
    //                 24,
    //                 3,
    //                 25,
    //                 194,
    //                 3,
    //                 12,
    //                 9,
    //                 66,
    //                 84,
    //                 53,
    //                 46,
    //                 48,
    //                 32,
    //                 77,
    //                 111,
    //                 117,
    //                 115,
    //                 101,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0,
    //                 0
    //             ],
    //             "data": "AgEEAwMSGAMZwgMMCUJUNS4wIE1vdXNlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
    //             "CDVType": "ArrayBuffer"
    //         }
    //     },
    //     "name": "BT5.0 Mouse",
    //     "rssi": -50,
    //     "id": "DB:E0:F8:51:86:F7"
    // }
      // navigation.replace('Infos');
      return  navigation.navigate('Infos', { datas });

    }
  },[connected])

  const requestPermissions = async()=>{
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ])

      if(granted){
          setGrantedPermission(true)
      }
  }
  function stopScanning() {
    setScanning((prev) => {
      if (prev) {
        BleManager.stopScan()
          .then(() => {
            console.log("Scan stopped manually");
          })
          .catch((error) => {
            console.log("Failed to stop scan", error);
          });
        return false;
      }
      return prev;
    });
  }

  const startScanning = () => {

    if(grantedPermission){
      if(!isScanning){
        BleManager.scan([], 10,true).then(() => { //scan for 10 seconds, false not allow duplicates, [] for all services
          // Success code
          setBleDevices([]); // Clear previous devices
          setIdDevices([]); // Clear previous IDs
          console.log("Scan started");
          setScanning(true);

          //check for 5 seconds to get the devices

          setTimeout(() => {
            // stopScanning()
          handleGetConnectionDevices()
          }, 5000);
          console.log("Pass the timeout");


        }).catch((error: any)=>{
          console.log("Scan failed", error);
        })
      }
      setTimeout(() => {
        stopScanning()
      }, 10000);
    }
  }

  const handleGetConnectionDevices = () => {

    BleManager.getDiscoveredPeripherals([])
    .then((peripheralsArray:any[]) => {
    // Success code
        // setBleDevices(peripheralsArray); // Salva o array de objetos
        let formDev : string [] = JSON.stringify(peripheralsArray)
        console.log("Devices found: ", formDev);
        // setBleDevices(formDev); // Atualiza o estado com os dispositivos encontrados
        console.log("Discovered peripherals: " + peripheralsArray);

        let bleFormatted:string [] = [];
        let idsList:string [] = [];
        let bleDevicesAllInfoFormatted:any = [];

        peripheralsArray.map((value,index)=>{

          let obd = Object.entries(value); // Converte o objeto em um array de entradas
          bleDevicesAllInfoFormatted.push(obd); // Adiciona o objeto completo à lista

          let ids = value.id;
          idsList.push(ids); // Adiciona o ID do dispositivo à lista
          setIdDevices(idsList); // Atualiza o estado com os IDs dos dispositivos
          
          if(value.name == null){
            let nome = value.name = `Unnamed Device ${index}`; // Define um nome padrão se não houver nome
            bleFormatted.push(nome)

          } else{
            let originalName = value.name;
            bleFormatted.push(originalName)
          }
        })

        setBleDevicesAllInfo(bleDevicesAllInfoFormatted); 
        setBleDevices(bleFormatted); // Atualiza o estado com os nomes formatados

      

  });
  }

  useEffect(()=>{
    console.log("Formatted Devicess: ", bleDevices);
    console.log("Devices: ", (bleDevicesAllInfo));
    console.log("Id devices: ", (idDevices));
    // console.log("Discovered peripherals: " + peripheralsArray.length);
  })

  // function handleInformations(id:string){

  //   bleDevicesAllInfo.map((arrays, index)=>{
  //     // let arr = value
  //     let arrIds:string[]= []

  //     arrays.map((val:string [], index:number)=>{
  //       // arrIds.push(val[2])
  //       let ids = val[2]

  //       if(ids == id){
  //         setInfoConected(val)
  //         // return val
  //       }

  //     })

  //   });
  //   console.log("infoConected to", infoConected)
  // }

// const onConnect = async (deviceId:string) =>{

// // let str:string = '84:37:D5:4B:60:88';
// // let str:string = 'c8:c7:50:d3:19:7rd';
// let str:string = '0000fef3-0000-1000-8000-00805f9b34fb';
// console.log("Connecting to :", deviceId);

// await BleManager.connect(deviceId)
//   .then(async () => {
//     // Success code
//     console.log("Connected");
//     await new Promise(res => setTimeout(res, 500));

//     const result = awaitBleManager.retrieveServices(deviceId); //initializes the device and retrieves its services
//     console.log("Connected to device:", result);
//     setInfoConected(result)
//     // handleInformations(deviceId)
//   })
//   .catch((error) => {
//     // Failure code
//     console.log("Failed to connect to device", error);
//   });

// }

const onConnect = async (deviceId: string) => {
  console.log("Connecting to device:", deviceId);

  try {
        await new Promise(res => setTimeout(res, 800));

    await BleManager.connect(deviceId);
    console.log("Conected !");
    //wait a moment
    await new Promise(res => setTimeout(res, 800));

    const services = await BleManager.retrieveServices(deviceId);
    console.log("Available services", services);

    setCurrentDevice(deviceId);
    setInfoConected(services);

    setConnect(true)
    //reset the state
    setTimeout(() => {
      setConnect(false)
    }, 2000);

  } catch (error) {
    console.error("Fail to connect:", error);
    Alert.alert(`Fail to connect`);

  }
};


// const onServiceDiscovered = (result:any, item:any)=>{

//   const services = result.services
//   const characteristics = result.characteristics;

//   services.forEach((service:any)=>{
//     const serviceUUID = service.uuid;
//     onChangeCharacteristics(serviceUUID, characteristics, item);

//   })
// }

function handleStyle(){
  if(!isScanning){
    return styles.circle;
  } else {
    return styles.circleGray;
  }
}


const navigation = useNavigation();

  return(
    <View style={styles.container}>
      <TouchableOpacity onPress={startScanning} style={handleStyle()}>
        <Text style={styles.text}>{'Scan'}</Text>
      </TouchableOpacity>
           {bleDevices.length > 0 && !isScanning ? (
                  <View style={styles.dualFlat}>
                          <FlatList
                            data={bleDevices}
                            keyExtractor={(item) => item}
                            renderItem={({ item , index }) => (
                              <View style={styles.deviceItem}>
                                  <Text style={styles.deviceName}>{item}</Text>
                              </View>
                            )}/>
            
                          <FlatList
                            data={idDevices}
                            keyExtractor={(item) => item}
                            renderItem={({ item , index }) => (
                                <TouchableOpacity onPress={()=>onConnect(item)} style={styles.deviceItem}>
                                    <Text style={styles.deviceName}>Connect to Device </Text>
                                    <Image source={image1} style={{marginLeft:20 ,width: 20, height: 20}}/>
                                </TouchableOpacity>
                            )}/>
                  </View>
           ): isScanning ?(
           <View style={styles.noDevices}>
                 <ActivityIndicator size="large" color='#23A7A8' />
            </View>
           ): (
            <View style={styles.noDevices}>
              <Text style={styles.noDevicesText}>No devices</Text>
            </View>
           )
          }

    </View>
  )
}

const styles = StyleSheet.create({
   noDevicesText:{
    fontSize: 18,
    color: '#666',
   },
   noDevices:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
   },
    dualFlat:{
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  deviceItem: {
    padding: 10,
    backgroundColor: '#23A7A8', // Example background color
    display: 'flex',
    flexDirection: 'row',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '400',
  },
  deviceId: {
    fontSize: 14,
    color: '#666',
  },
  circle: {
    width: '50%', // Example width
    height: '30%', // Must be equal to width for a perfect circle
    borderRadius: 100, // Half of the width/height
    backgroundColor: '#23A7A8', // Example background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleGray: {
    width: '50%', // Example width
    height: '30%', // Must be equal to width for a perfect circle
    borderRadius: 100, // Half of the width/height
    backgroundColor: '#6e6e6e', // Example background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF', // Example text color
  },
});

export default InitialScreen;