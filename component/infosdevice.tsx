import { Text, View,   StyleSheet,Button, TextInput,
  FlatList,
  ScrollView, 
  Alert} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState, useRef } from 'react';
import BleManager from 'react-native-ble-manager';
import Graph from './communication';
import { Buffer } from 'buffer';
// import * as echarts from 'echarts/core';
// import { LineChart } from 'echarts/charts';
// import { GridComponent } from 'echarts/components';
// import { SkiaRenderer, SkiaChart } from '@wuba/react-native-echarts';

// echarts.use([LineChart, GridComponent]);


function InfosDevice(){
  const [serviceUUID, setserviceUUID] = useState<string>('');
  const [characteristicUUID , setcharacteristicUUID ] = useState<string>('');
  const [numberSent , setNumberSent ] = useState <number>();
    //final
  const [sentMessages, setSentMessages] = useState<any[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<number[]>([]);
  const [plotGraph, setPlotGraph] = useState <boolean>(false);
  // write
  // Creates a Buffer containing the bytes [0x01, 0x02, 0x03].


  // const buffer = Buffer.from(numberSent);
 
  const navigation = useNavigation();
  
  const route = useRoute();
  const Infos = route.params;



  console.log('InfosDevice route params:', Infos);

  // Adjust property access according to your data structure
  const infoName: any = Infos?.datas?.name;
  console.log('Device Name:', infoName);

  const infoId: string = Infos?.datas?.id;
  const infoRssi: string = Infos?.datas?.rssi;

  const infoCharacteristics: any[] = Infos?.datas?.characteristics ;
  const infoServices: any[] = Infos?.datas?.services;

  console.log('Device Name:', infoName);
  console.log('Device ID:', infoId);
  console.log('Device RSSI:', infoRssi);
  console.log('Device Characteristics:', infoCharacteristics);
  console.log('Device Services:', infoServices);


  useEffect(()=>{
    console.log("peripheralId ", infoId);
    console.log("serviceUUID", serviceUUID);
    console.log("characteristicUUID", characteristicUUID);
    console.log("numberSent", numberSent);

  },[serviceUUID, characteristicUUID, numberSent])

  const groupedByService = infoServices.map((service: any) => ({
    uuid: service.uuid,
    characteristics: infoCharacteristics.filter( //filter by the same uuid, to match the values
      (char: any) => char.service === service.uuid
    ),
  }));


  async function sendData(peripheral: string, serviceUUID: string, charUUID:string, message:string){
    if (!message) {
      Alert.alert("Empty message !");
      return;
    }
    const data = stringToBytes(message);
    console.log("peripheral to send :", peripheral)
    console.log("serviceUUID to send :", serviceUUID)
    console.log("charUUID to send :", charUUID)
    console.log("Bytes to send :", data)
    try{
      await BleManager.write(peripheral, serviceUUID, charUUID, data);
      console.log("Message sended:", data);
      Alert.alert("Message sended !")
      setPlotGraph(true)
      setReceivedMessages(data)
        } catch (err) {
      Alert.alert("Error to send the message", err instanceof Error ? err.message : String(err));

    }
  }

  function stringToBytes(str:string):number[]{
    return Array.from(new TextEncoder().encode(str))
  }

//  function PlotGraphEchart(){

//   const skiaRef = useRef<any>(null);
  
//     let msg = [51,53,57]
//   useEffect(()=>{

//     const timeStamps = msg.map(() =>
//       new Date().toLocaleTimeString([], { hour12: false })
//     );


//     const option = {
//     xAxis: {
//       type: 'category',
//       data: timeStamps,
//     },
//     yAxis: {
//       type: 'value',
//     },
//     series: [
//       {
//         data: msg,
//         type: 'line',
//         smooth: true, // opcional: curva suave
//       },
//     ],
//   };

//     let chart: any;
//     if (skiaRef.current) {
//       chart = echarts.init(skiaRef.current, 'light', {
//         renderer: 'skia',
//         width: 400,
//         height: 400,
//       });
//       chart.setOption(option);
//     }
//     return () => chart?.dispose();
//   },[])
  
//   return <SkiaChart ref={skiaRef} />;
//  }

  console.log('Grouped by service:', groupedByService);


  return (
  <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Device</Text>
      <View style={styles.deviceInfo}>
        <Text style={styles.label}>🔹 Name: <Text style={styles.value}>{infoName || 'Unknow'}</Text></Text>
        <Text style={styles.label}>🔹 ID: <Text style={styles.value}>{infoId}</Text></Text>
        <Text style={styles.label}>📶 RSSI: <Text style={styles.value}>{infoRssi}</Text></Text>
      </View>

      <Text style={styles.sectionTitle}>Services and characteristics</Text>

      {groupedByService.map((group, index) => (
        <View key={index} style={styles.serviceCard}>
          <Text style={styles.serviceTitle}>🧩 Service: {group.uuid}</Text>
          {group.characteristics.map((char: any, i: number) => (
            <View key={i} style={styles.charBox}>
              <Text style={styles.charText}>🔸 Characteristic: {char.characteristic}</Text>
              <Text style={styles.charText}>
                ⚙️ Properties: {Object.keys(char.properties).join(', ')}
              </Text>
              {char.descriptors && char.descriptors.length > 0 && (
                <Text style={styles.charText}>
                  🧾 Descriptors: {char.descriptors.map((d: any) => d.uuid).join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}

      <View>
        <Text style={styles.sectionTitle}>Communication Log</Text>
        <View style={styles.deviceInfo}>

          <Text style={styles.label}>Make sure to pass (WRITE SERVICE):</Text>
            <TextInput
                style={{ height: 40,color:'black', borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
                placeholder="serviceUUID ->fff0 (for example)"
                placeholderTextColor="gray"
                value={serviceUUID}
                onChangeText={text => setserviceUUID(text)}
            />
            <TextInput
                style={{ height: 40,color:'black', borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
                placeholder="characteristicUUID ->fff1 (for example)"
                placeholderTextColor="gray"
                value={characteristicUUID}
                onChangeText={text => setcharacteristicUUID(text)}
            />
            <TextInput
                style={{ height: 40,color:'black', borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
                placeholder="number to send "
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={numberSent}
                onChangeText={text => setNumberSent(text)}

            />
            {/* <Button title="Submit" onPress={handleSubmit} /> */}
          <Text style={styles.label}>📤 Sent Messages</Text>


          <Button
            title="Send Ping"
            onPress={() => {
            if (numberSent === undefined || isNaN(numberSent)) {
              console.warn("Número inválido para envio.");
              return;
            }
              const id = infoId;
              const service = serviceUUID.trim().toLowerCase();//  UUID correct
              const characteristic = characteristicUUID.trim().toLowerCase(); // UUID correct
              const message = numberSent.toString(); 

              sendData(id, service, characteristic, message);
              setSentMessages((prev) => [...prev, parseInt(message)]);
            }}
          />



          {sentMessages.map((msg, index) => (
            <Text key={index} style={styles.value}>➡️ {msg}</Text>
          ))}
        </View>
        <View style={styles.deviceInfo}>
          {/* <Text style={styles.label}>📥 Received Messages:</Text>


          {receivedMessages.map((msg, index) => (
            <Text key={index} style={styles.value}>⬅️ {msg}</Text>
          ))} */}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  deviceInfo: {
    backgroundColor: '#E0F7FA',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontWeight: 'normal',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  charBox: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#23A7A8',
  },
  charText: {
    fontSize: 14,
    marginBottom: 3,
  },
});

export default InfosDevice