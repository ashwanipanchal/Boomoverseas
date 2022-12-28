import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { TextInput } from 'react-native-paper';
import { ButtonStyle } from '../Custom/CustomView';
import { COLORS } from '../Constant/Colors';
import StringsOfLanguages from '../Constant/LanguageStrings'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Api, LocalStorage } from '../services/Api';
import Toast from 'react-native-simple-toast';
import { _SetAuthToken } from '../services/ApiSauce';
import { BASE_URL } from '../services/Config';
// import { LoginButton, AccessToken, Profile } from 'react-native-fbsdk-next';

const Login = ({navigation}) => {


    GoogleSignin.configure();
    const [mobile, setMobile] = useState("");
    const [user, setUser] = useState();
    const [password, setPassword] = useState("");

    const [state, setState] = useState({userInfo: {}});

    // getInfoFromToken = token => {
    //   const PROFILE_REQUEST_PARAMS = {
    //     fields: {
    //       string: 'id, name,  first_name, last_name',
    //     },
    //   };
    //   const profileRequest = new GraphRequest(
    //     '/me',
    //     {token, parameters: PROFILE_REQUEST_PARAMS},
    //     (error, result) => {
    //       if (error) {
    //         console.log('login info has error: ' + error);
    //       } else {
    //         setState({userInfo: result});
    //         console.log('result:', result);
    //       }
    //     },
    //   );
    //   new GraphRequestManager().addRequest(profileRequest).start();
    // };

    const signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn()
        alert(JSON.stringify(userInfo,null,2))
        LocalStorage.setGoogleUserDetail(JSON.stringify(userInfo));
        navigation.replace('DrawerNavigator')
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          console.log("no can" +  error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          console.log("no prog" +  error)
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          console.log("no ava" +  error)
        } else {
          // some other error happened
          console.log(error)
        }
        console.log(error)
      }
    };

    // const getPR = async() =>{
    //   const currentProfile = await Profile.getCurrentProfile()
    //   alert(JSON.stringify(currentProfile,null,2))
    //   console.log(currentProfile)
    // }
    // getPR()

    const onLoginHandler = async() => {
      
      const body = {
        number:mobile,
        password:password
      }
      
      // return
      const res = await Api.boomSignin(body)
      // alert(JSON.stringify(res,null,2))
      // console.log(res)
      // return
      // const response = await fetch(`${BASE_URL}signin`, {
      //   // const response = await fetch(`${BASE_URL}get-chat-history/2`, {
      //   method: 'POST',
      //   headers: {
      //     "Accept": "application/json",
      //     'Content-Type': 'application/json',
      //   },
      //   body:JSON.stringify({
      //     number:mobile,
      //     password:password
      //   })
      // })
      // const jsonres = await response.json()
      // alert(JSON.stringify(jsonres,null,2))
      // console.log(jsonres)
      const {status, user, token, message} = res
      if(status){
        Toast.show(message)
        LocalStorage.setUserDetail(JSON.stringify(user));
        LocalStorage.setToken(token);
        // getFcmToken()
        _SetAuthToken(token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'DrawerNavigator' }]
        })
      }else{
        alert(jsonres.message)
      }
      // const body = {
      //   number: mobile,
      //   password: password
      // }
      // // alert(JSON.stringify(body,null,2))
      // // return
      // const res = await Api.boomSignin(body)
      // console.log(res)
      // alert(JSON.stringify(res,null,2))
    }
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
          <Image style={{ width: '60%', resizeMode: 'contain', alignSelf: 'center' }} source={require('../images/logo.png')} />
          <ScrollView style={{marginHorizontal:20}}>
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
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [{name : 'DrawerNavigator'}]
                    // })
                    onLoginHandler()
                  }}
              />
          </View>
          {/* <Text style={{color:COLORS.darkpurple, marginLeft:10, fontSize:18, marginTop:20, marginBottom:30}}>OR SIGNIN WITH</Text>
          <TouchableOpacity  style={{backgroundColor:'#3b5998', flexDirection:'row', alignItems:'center', justifyContent:'center',paddingVertical:12, borderRadius:30, marginBottom:20, elevation:7}}>
            <Image source={require('../images/fb.png')} style={{width:24, height:24, resizeMode:'contain'}}/>
            <Text style={{color:'#fff', fontSize:18,marginLeft:10}}>Continue with facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>signIn()} style={{backgroundColor:'#db4a39', flexDirection:'row', alignItems:'center', justifyContent:'center',paddingVertical:12, borderRadius:30,elevation:7}}>
            <Image source={require('../images/google.png')}style={{width:24, height:24, resizeMode:'contain'}}/>
            <Text style={{color:'#fff', fontSize:18,marginLeft:10}}>Continue with Google</Text>
          </TouchableOpacity> */}
          <View style={{ flexDirection: 'row',marginTop:20, alignSelf:'center' }}>
            <Text style={{ color: 'gray' }}>{StringsOfLanguages.noaccount}? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Register')}><Text style={{ color: COLORS.overseaspurple, textDecorationLine:'underline' }}> {StringsOfLanguages.register}</Text></TouchableOpacity>
          </View>
        {/* <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          // disabled={this.state.isSigninInProgress}
        /> */}
       {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>           */}
          </ScrollView>
      </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})