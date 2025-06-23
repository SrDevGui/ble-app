/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import ConnectDevice from './component/home.tsx';
import InitialScreen from './component/initial screen.tsx';
import ScanDevicesScreen from './component/home.tsx'
import PeripheralDetailsScreen from './component/PeripheralDetailsScreen.tsx'
import  InfosDevice  from './component/infosdevice.tsx';
// import CommunicationScreen from './component/communication.tsx';



import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function AppScreen() {
  const navigation = useNavigation();

  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NewAppScreen templateFileName="App.tsx" /> */}
      <ConnectDevice />
    </View>
  );
}


const RootStack = createNativeStackNavigator({
  initialRouteName: 'Initial',
  screens:{ 
    Initial: {
      screen: InitialScreen,
      options: {
        headerShown: false,
        title: 'Initial Screen',
      }
    },
    Home: {
      screen: AppScreen,
      options: {
        title: 'Main',
        headerShown: true,

      }
    },
    //only to test
    Test:{
      screen:ScanDevicesScreen,
      options:{
        headerShown:true,
        title: 'Test Screen',

      }
    },
    //only to test
    PeripheralDetails:{
      screen:PeripheralDetailsScreen,
        options:{
          headerShown:false,
          title: 'Test Screen',

      }
    },
    Infos:{
      screen:InfosDevice,
      options:{
          headerShown:true,
          title: 'Informations',

      }
    },
    // CommunicationScreen:{
    //   screen:CommunicationScreen,
    //   options:{
    //       headerShown:true,
    //       title: 'Graph',

    //   }
    // }
    
  }

});

const Navigation = createStaticNavigation(RootStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App(){
  return(
    <Navigation/>
  )
};
