import { StyleSheet, Text, View, Image, Dimensions, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { LocalStorage } from '../services/Api';
const { height, width } = Dimensions.get('window');
import { useDispatch } from 'react-redux'
import * as action from '../redux/actions'
import StringsOfLanguages from '../Constant/LanguageStrings'

const Splash = ({navigation}) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    navigationHandle()
  },[])
  const navigationHandle = async() => {
    const lang = (await LocalStorage.getLanguage() || '')
    // alert(JSON.stringify(lang,null,2))
    if(lang){
      setTimeout(()=>{
        LocalStorage.setLanguage(lang)
        dispatch(action.Language(lang))
        StringsOfLanguages.setLanguage(lang)
        navigation.replace('GetStarted')
      },3000)
    }else{
      setTimeout(()=>{
        navigation.replace('SelectLanguage')
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