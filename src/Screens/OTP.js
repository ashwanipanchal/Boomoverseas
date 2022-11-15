import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image } from 'react-native'
import React,{useState} from 'react'
import { COLORS } from '../Constant/Colors'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import HeaderTop from '../Components/HeaderTop'
import { ButtonStyle } from '../Custom/CustomView'

const OTP = ({navigation}) => {
    const [otp, setOtp] = useState('');
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={()=>navigation.goBack()} title={"MOBILE VERIFICATION"} />
          <Image source={require('../images/otpHeader.png')} style={{ alignSelf: 'center', marginVertical: 20 }} />
        <Text style={{ color: COLORS.overseaspurple, textAlign: 'center', fontSize: 18 }}>We have sent you an SMS with an OTP code to your number for verification</Text>
          <OTPInputView
          style={styles.otpInput}
          pinCount={4}
          code={otp}
          onCodeChanged={text => {
            setOtp(text.replace(/[^0-9]/g, ''));
          }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
        <Text style={{color:'black', textAlign:'center', marginTop:20, fontSize:16}}>Didn't recieve the OTP?</Text>
        <Text style={{color:COLORS.overseaspurple, textAlign:'center', marginTop:10, fontSize:16}}>RESEND CODE</Text>
        <View style={{ width: '100%', marginTop:40 }}>
              <ButtonStyle
                  title={'Submit'}
                //   height={52}
                  bgColor={'#261750'}
                  // loader={state.isLoading}
                  onPress={() => {
                    //   navigation.navigate('JobOption');
                  }}
              />
          </View>
      </SafeAreaView>
  )
}

export default OTP

const styles = StyleSheet.create({
    otpInput: {
        height: 60,
        marginTop: 50,
        marginVertical: 20,
        marginHorizontal: 30,
      },
      underlineStyleBase: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        // borderRadius: 10,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
        fontWeight: '500',
        color: '#100C08',
      },
      underlineStyleHighLighted: {
        width: 60,
        height: 60,
        // borderRadius: 10,
        fontFamily: 'Poppins',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#fff',
      },
})