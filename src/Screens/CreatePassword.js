import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import { TextInput } from 'react-native-paper';
import { ButtonStyle } from '../Custom/CustomView';
import { Api } from '../services/Api';
import Toast from 'react-native-simple-toast';

const CreatePassword = ({navigation, route}) => {
    // alert(JSON.stringify(route.params,null,2))
    const [password, setPassword] = useState('')
    const [conPassword, setConPassword] = useState('')

    const nextHandler = async() => {
        if (!password) {
            Toast.show('Please enter your password');
            return;
          }
          if (!conPassword) {
            Toast.show('Please enter your confirm password');
            return;
          }
          if (password != conPassword) {
            Toast.show('Password and Confirm password not match');
            return;
          }
        const body = {
            number : route.params,
            password
        }
        const res = await Api.createPassword(body)
        const {status} = res
        if(status){
            Toast.show('Password updated successfully');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
              })
        }
    }
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={() => navigation.goBack()} title={"Create Password"} />
          <TextInput
              label={"Enter Password"}
              underlineColor={COLORS.overseaspurple}
              activeUnderlineColor={COLORS.overseaspurple}
              secureTextEntry
              style={{ marginVertical: 20, backgroundColor: '#FFF', marginHorizontal:20 }}
              value={password}
              Outlined={'disabled'}
              onChangeText={text => setPassword(text)}
          />
          <TextInput
              label={"Enter Confirm Password"}
              underlineColor={COLORS.overseaspurple}
              secureTextEntry
              activeUnderlineColor={COLORS.overseaspurple}
              style={{ marginVertical: 20, backgroundColor: '#FFF', marginHorizontal:20 }}
              value={conPassword}
              Outlined={'disabled'}
              onChangeText={text => setConPassword(text)}
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

export default CreatePassword

const styles = StyleSheet.create({})