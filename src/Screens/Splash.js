import { StyleSheet, Text, View, Image, Dimensions, StatusBar, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LocalStorage } from '../services/Api';
const { height, width } = Dimensions.get('window');
import { useDispatch } from 'react-redux'
import * as action from '../redux/actions'
import StringsOfLanguages from '../Constant/LanguageStrings'
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import { _SetAuthToken } from '../services/ApiSauce';
import messaging from '@react-native-firebase/messaging';

const Splash = ({navigation}) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    isLoginScreenPresented: false
  })


  useEffect(()=>{
      navigationHandle()
      requestUserPermission();
  },[])
  
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
    }
  }

  const getFcmToken = async () => {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        await LocalStorage.setFcmToken(fcmToken)
        console.log('--fcmToken : ', fcmToken);
      }
    } catch (error) {
      console.log(error, '-------------error');
    }
  };
  // const isSignedIn = async () => {
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   setState({ isLoginScreenPresented: !isSignedIn });
  //   if(isSignedIn){
  //     navigation.navigate('DrawerNavigator')
  //   }else{
  //     navigation.navigate('Login')
  //   }
  // };

  const navigationHandle = async() => {
    const token = (await LocalStorage.getToken()) || '';

    console.log(token)
    if (token.length !== 0) {
      _SetAuthToken(token);
      setTimeout(()=>{
        navigation.replace('DrawerNavigator')
      },3000)
    }else{
      setTimeout(()=>{
        navigation.replace('GetStarted')
      },3000)
    }
  }

  return (
    <View style={{flex:1}}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"  />
      <Image style={{height, width,}} source={require('../images/splash.png')}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})