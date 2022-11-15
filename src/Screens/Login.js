import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { TextInput } from 'react-native-paper';
import { ButtonStyle } from '../Custom/CustomView';
import { COLORS } from '../Constant/Colors';
import StringsOfLanguages from '../Constant/LanguageStrings'

const Login = ({navigation}) => {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
          <Image style={{ width: '60%', resizeMode: 'contain', alignSelf: 'center' }} source={require('../images/logo.png')} />
          <View style={{marginHorizontal:20}}>
          <TextInput
              label={StringsOfLanguages.mobile}
              value={mobile}
              underlineColor={COLORS.overseaspurple}
              keyboardType="number-pad"
              maxLength={10}
              activeUnderlineColor={COLORS.overseaspurple}
              style={{marginBottom:30, backgroundColor:'#FFF'}}
              Outlined={'disabled'}
              onChangeText={text => setMobile(text)}
          />
          <TextInput
              label={StringsOfLanguages.password}
              underlineColor={COLORS.overseaspurple}
              activeUnderlineColor={COLORS.overseaspurple}
              secureTextEntry
              style={{marginBottom:30, backgroundColor:'#FFF'}}
              value={password}
              Outlined={'disabled'}
              onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity onPress={()=>navigation.navigate('OTP')} style={{ marginTop:10}}><Text style={{textAlign:'right', color:'gray'}}>{StringsOfLanguages.forgotpassword}</Text></TouchableOpacity>
          <View style={{ width: '100%', marginBottom:20, marginTop:30 }}>
              <ButtonStyle
                  title={StringsOfLanguages.login}
                //   height={52}
                  bgColor={'#261750'}
                  // loader={state.isLoading}
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{name : 'DrawerNavigator'}]
                    })
                  }}
              />
          </View>
          {/* <Text>OR SIGN IN WITH</Text> */}
          <View style={{ flexDirection: 'row',marginTop:20, alignSelf:'center' }}>
            <Text style={{ color: 'gray' }}>{StringsOfLanguages.noaccount}? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Register')}><Text style={{ color: COLORS.overseaspurple, textDecorationLine:'underline' }}> {StringsOfLanguages.register}</Text></TouchableOpacity>
          </View>
          </View>
      </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})