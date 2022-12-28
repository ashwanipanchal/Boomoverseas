import { StyleSheet, Text, View, SafeAreaView, StatusBar,Image,  FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import { COLORS } from '../Constant/Colors'
import HeaderTop from '../Components/HeaderTop'
// import { TextInput } from 'react-native-paper';
import { ButtonStyle } from '../Custom/CustomView';
import Toast from 'react-native-simple-toast'
import { BASE_URL } from '../services/Config';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { Api } from '../services/Api';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment/moment';


const Register = ({navigation}) => {
  const [select, setSelect] = useState(0)
  const [fname, setFname] = useState("")
  const [mname, setMname] = useState("")
  const [lname, setLname] = useState("")
  const [number, setNumber] = useState("")
  const [option, setOption] = useState("Male")
  const [email, setEmail] = useState("")
  const [passport, setPassport] = useState("")
  const [trade, setTrade] = useState([])
  const [tradeValue, setTradeValue] = useState("")
  const [otherTradeValue, setOtherTradeValue] = useState("")
  const [password, setPassword] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dob, setDob] = useState();
  useEffect(()=>{
      getCategory()
  },[])
  const getCategory = async() => {
      const ct = await Api.getcategory()
      const{status, data} = ct
      if (status) {
        let tempArray = [];
        for (let value of data) {
          tempArray.push({label : value.title, value: value.title});
          // tempArray.push({ label: value.name, value: value.id });
        }
        // console.log(tempArray)
        setTrade(tempArray);
      }
  }

  const languageData = [
      {
          "title": "Male",
          "blackIcon": require('../images/maleblack.png'),
          "whiteIcon": require('../images/malewhite.png')
      },
      {
          "title": "Female",
          "blackIcon": require('../images/femaleblack.png'),
          "whiteIcon": require('../images/femalewhite.png')
      },
  ]

  const onRegisterHandler = async() => {
    if (!fname) {
      Toast.show('Please enter your first name');
      return;
    }
    if (!number) {
      Toast.show('Please enter your mobile number');
      return;
    }
    if (!dob) {
      Toast.show('Please enter your Date of Birth');
      return;
    }
    if (!dob) {
      Toast.show('Please select your trade');
      return;
    }
    if (!password) {
      Toast.show('Please enter your password');
      return;
    }

    setIsLoading(true)
    const body = {
        number:number,
        password:password,
        email:email,
        firstName:fname,
        lastName:lname,
        sex: option,
        dob: dob,
        passport: passport,
        trade: tradeValue == 'Other' ? otherTradeValue : tradeValue
    }
    // alert(JSON.stringify(body,null,2))
    // return
    const response = await Api.boomSignup(body)
    // alert(JSON.stringify(response,null,2))
    // return
    const {status, otp, message} = response
    if(status){
      alert(otp)
      Toast.show(message);
      setIsLoading(false)
      navigation.replace('OTP', response);
    }else{
      alert(response.message)
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setDob(date)
    hideDatePicker();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
    <HeaderTop back={() => navigation.goBack()} title={"Register"} />
    <ScrollView>
          {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20, marginHorizontal:20}}>
          <TextInput
              label="First Name"
              value={fname}
              underlineColor={COLORS.overseaspurple}
              activeUnderlineColor={COLORS.overseaspurple}
              style={{marginBottom:30,width:'33%',backgroundColor:"#f5f5f5"}}
              Outlined={'disabled'}
              onChangeText={text => setFname(text)}
          />
          <TextInput
              label="Middle Name"
              value={mname}
              underlineColor={COLORS.overseaspurple}
              activeUnderlineColor={COLORS.overseaspurple}
              style={{marginBottom:30, width:'33%',backgroundColor:"#f5f5f5", marginHorizontal:5}}
              Outlined={'disabled'}
              onChangeText={text => setMname(text)}
          />
          <TextInput
              label="Last Name"
              value={lname}
              underlineColor={COLORS.overseaspurple}
              activeUnderlineColor={COLORS.overseaspurple}
              style={{marginBottom:30,width:'33%',backgroundColor:"#f5f5f5"}}
              Outlined={'disabled'}
              onChangeText={text => setLname(text)}
          />
          </View> */}
          <Text style={{color:COLORS.overseaspurple, marginHorizontal:20, marginVertical:10}}>First Name<Text style={{color:'red'}}>*</Text></Text>
            <TextInput
              value={fname}
              onChangeText={text => setFname(text)}
              style={{ height:52, fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black', backgroundColor:"#f7f7f7" , borderWidth:1, marginHorizontal:20, marginBottom:10, borderRadius:6, borderColor:"#f7f7f7", paddingLeft:10}}
              placeholder={'First Name'}
              placeholderTextColor={'lightgray'}
            />
          {/* </View> */}
          <Text style={{color:COLORS.overseaspurple, marginHorizontal:20, marginVertical:10}}>Last Name</Text>
            <TextInput
              value={lname}
              onChangeText={text => setLname(text)}
              style={{ height:52, fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black', backgroundColor:"#f7f7f7" , borderWidth:1, marginHorizontal:20, marginBottom:10, borderRadius:6, borderColor:"#f7f7f7", paddingLeft:10}}
              placeholder={'Last Name'}
              placeholderTextColor={'lightgray'}
            />
            <Text style={{color:COLORS.overseaspurple, marginHorizontal:20, marginVertical:10}}>Mobile No.<Text style={{color:'red'}}>*</Text></Text>

            <TextInput
              value={number}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={text => setNumber(text)}
              style={{ height:52, fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black', backgroundColor:"#f7f7f7" , borderWidth:1, marginHorizontal:20, marginBottom:10, borderRadius:6, borderColor:"#f7f7f7", paddingLeft:10}}
              placeholder={'Mobile No.'}
              placeholderTextColor={'lightgray'}
            />
            <Text style={{color:COLORS.overseaspurple, marginHorizontal:20, marginVertical:10}}>Email</Text>

            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={{ height:52, fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black', backgroundColor:"#f7f7f7" , borderWidth:1, marginHorizontal:20, marginBottom:10, borderRadius:6, borderColor:"#f7f7f7", paddingLeft:10}}
              placeholder={'Email'}
              placeholderTextColor={'lightgray'}
            />
            
            <Text style={{color:COLORS.overseaspurple, marginHorizontal:20, marginVertical:10}}>DOB<Text style={{color:'red'}}>*</Text></Text>

            <View onPress={()=>showDatePicker()} style={{ height:52, justifyContent:'center', fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black', backgroundColor:"#f7f7f7" , borderWidth:1, marginHorizontal:20, marginBottom:10, borderRadius:6, borderColor:"#f7f7f7", paddingLeft:10,}}>
            <Text style={{color:'#000',paddingVertical:5}} onPress={()=>showDatePicker()}>{!dob ? <Text style={{color:'lightgray', fontSize:16}}>Date</Text> : moment(dob).format("DD/MMM/YYYY")}</Text>
            </View>
            
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          maximumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
            <View style={{}}>
            <Text style={{color:'black',  marginLeft:20, marginBottom:10}}>Gender</Text>
            <FlatList
            numColumns={2}
            // keyExtractor={item => item.id}
            data={languageData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{width:'20%', marginLeft:10, }}
                onPress={() => {
                  setSelect(index)
                  setOption(item.title)
                  // onTapChange(item.value)
                }}>
                <View
                  style={{
                    backgroundColor: index == select ? '#261750' : '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5,
                    paddingVertical: 8,
                    borderRadius: 10,
                    borderWidth:0.5,
                    borderColor: '#261750'
                  }}
                  >
                  <Text
                    style={{
                      fontFamily: 'Poopins',
                      fontSize: 16,
                      // fontWeight: '900',
                      color: index == select ? "#fff" : '#261750',
                      textAlign: 'center',
                    }}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          </View>
            <Text style={{color:COLORS.overseaspurple, marginHorizontal:20,  marginTop:20, marginBottom:10}}>Passport Number</Text>

            <TextInput
              value={passport}
              onChangeText={text => setPassport(text)}
              style={{ height:52, fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black', backgroundColor:"#f7f7f7" , borderWidth:1, marginHorizontal:20, marginBottom:10, borderRadius:6, borderColor:"#f7f7f7", paddingLeft:10}}
              placeholder={'Passport Number'}
              placeholderTextColor={'lightgray'}
            />
            <Text style={{color:COLORS.overseaspurple, marginHorizontal:20, marginVertical:10}}>Select Trade<Text style={{color:'red'}}>*</Text></Text>

            <View style={{ }}>
            <Dropdown
              // value="Select Trade"
              placeholder={"Select Trade"}
              placeholderTextColor={"lightgray"}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select User Type'}
              // icon="cheveron-down"
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/dropdown.png')}
              dropdownOffset={{ top: 0, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '90%', left: '5%', marginTop: 10 }}
              dropdownPosition={-4.5}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={trade}
              onChangeText={(value, index, data) => {
                // alert(JSON.stringify(data[index].value,null,2))
                setTradeValue( data[index].value)
              }}
            />
          </View>
          {tradeValue == "Other" &&
          <>
          <Text style={{color:COLORS.overseaspurple, marginHorizontal:20,  marginTop:20, marginBottom:10}}>Trade Name</Text>
            <TextInput
              value={otherTradeValue}
              onChangeText={text => setOtherTradeValue(text)}
              style={{ height:52, fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black', backgroundColor:"#f7f7f7" , borderWidth:1, marginHorizontal:20, marginBottom:10, borderRadius:6, borderColor:"#f7f7f7", paddingLeft:10}}
              placeholder={'Trade Name'}
              placeholderTextColor={'lightgray'}
            />
            </>
            }
            <Text style={{color:COLORS.overseaspurple, marginHorizontal:20, marginVertical:10}}>Password</Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={text => setPassword(text)}
              style={{ height:52, fontSize: 16, fontFamily: 'Poppins-SemiBold', color: 'black', backgroundColor:"#f7f7f7" , borderWidth:1, marginHorizontal:20, marginBottom:10, borderRadius:6, borderColor:"#f7f7f7", paddingLeft:10}}
              placeholder={'Password'}
              placeholderTextColor={'lightgray'}
            />
          
          {/* <TextInput
              label="Mobile Number"
              value={number}
              underlineColor={COLORS.overseaspurple}
              keyboardType="number-pad"
              maxLength={10}
              activeUnderlineColor={COLORS.overseaspurple}
              style={{marginBottom:10, marginTop:10, backgroundColor:'#F5F5F5', marginHorizontal:20}}
              Outlined={'disabled'}
              onChangeText={text => setNumber(text)}
          />
          <TextInput
              label="Email"
              value={email}
              underlineColor={COLORS.overseaspurple}
              activeUnderlineColor={COLORS.overseaspurple}
              style={{marginBottom:10, backgroundColor:'#F5F5F5', marginHorizontal:20}}
              Outlined={'disabled'}
              onChangeText={text => setEmail(text)}
          />
          <TextInput
              label="Password"
              value={password}
              underlineColor={COLORS.overseaspurple}
              secureTextEntry
              activeUnderlineColor={COLORS.overseaspurple}
              style={{marginBottom:10, marginTop:10, backgroundColor:'#F5F5F5', marginHorizontal:20}}
              Outlined={'disabled'}
              onChangeText={text => setPassword(text)}
          /> */}
          <View style={{ width: '100%', marginBottom:20, marginTop:30 }}>
              <ButtonStyle
                  title={'Register Now'}
                //   height={52}
                  bgColor={'#261750'}
                  loader={isLoading}
                  onPress={() => {
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [{name : 'DrawerNavigator'}]
                    // })
                    onRegisterHandler()
                  }}
              />
          </View>
          </ScrollView>
      </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  nameFields:{
    color:'black'
  },
  drops: {
    height: 50,
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#f7f7f7',
    marginHorizontal: 20,
    // elevation: 2,
  },
})