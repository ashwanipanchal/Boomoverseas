import { StyleSheet, Text, View, Image, Dimensions, StatusBar, Platform } from 'react-native'
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


const Splash = ({navigation}) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    isLoginScreenPresented: false
  })


  useEffect(()=>{
    checkToken();
      navigationHandle()
    // isSignedIn()
  },[])
  


  // const inAppUpdates = new SpInAppUpdates(
  //   false // isDebug
  // );
  // // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
  // inAppUpdates.checkNeedsUpdate({ curVersion: '0.0.8' }).then((result) => {
  //   alert(JSON.stringify(result,null,2))
  //   if (result.shouldUpdate) {
  //     let updateOptions = {};
  //     if (Platform.OS === 'android') {
  //       // android only, on iOS the user will be promped to go to your app store page
  //       updateOptions = {
  //         updateType: IAUUpdateKind.FLEXIBLE,
  //       };
  //     }
  //     inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
  //   }
  // });

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