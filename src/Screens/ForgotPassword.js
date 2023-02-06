import { StyleSheet, Text, View, SafeAreaView, StatusBar, } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../Constant/Colors'
import HeaderTop from '../Components/HeaderTop'
import { TextInput } from 'react-native-paper';
import { ButtonStyle } from '../Custom/CustomView';
import { Api } from '../services/Api';
import Toast from 'react-native-simple-toast';

const ForgotPassword = ({navigation}) => {
    const [number, setNumber] = useState('')
    const nextHandler = async() => {
        if(!number){
            Toast.show('Please enter your mobile number');
            return;
        }
        const body = {
            number
        }
        // alert(JSON.stringify(body,null,2))
        // return
        const res = await Api.forgotPassword(body)
        const {status, otp, message} = res
        if(status){
            alert(otp)
            navigation.navigate("OTPForgot", res)
        }else{
            alert(message)
        }
    }
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={() => navigation.goBack()} title={"Forgot Password"} />
          <TextInput
              label={"Enter Number"}
              underlineColor={COLORS.overseaspurple}
              keyboardType="number-pad"
              maxLength={10}
              activeUnderlineColor={COLORS.overseaspurple}
              style={{ marginVertical: 20, backgroundColor: '#FFF', marginHorizontal:20 }}
              value={number}
              Outlined={'disabled'}
              onChangeText={text => setNumber(text.replace(/[^0-9]/g, ''))}
          />
          <View style={{ width: '100%', marginBottom: 20, marginTop: 30 }}>
              <ButtonStyle
                title={"Next"}
                bgColor={'#261750'}
                // loader={state.isLoading}
                onPress={() => {
                nextHandler()
                }}
              />
          </View>
      </SafeAreaView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})