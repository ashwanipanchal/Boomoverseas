import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert, Linking } from 'react-native'
import React,{useEffect, useState}from 'react'
import store from './src/redux/store';
import StackNavigator from './src/Navigator/StackNavigator';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";
LogBox.ignoreAllLogs();//Ignore all log notifications
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import inAppMessaging from "@react-native-firebase/in-app-messaging";
import NoInternetScreen from './src/Screens/NoInternetScreen';

const App = () => {
  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isConnected){
        <NoInternetScreen/>
      }
    });
  },[])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Alert.alert(
      //   `${remoteMessage.notification?.title}`,
      //   `${remoteMessage.notification?.body}`,
      //   [
      //     { text: 'Go', onPress: onLogoutHandler(remoteMessage) },
      //   ],
      //   { cancelable: false },
      // );
      alert(JSON.stringify(remoteMessage,null,2))
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})