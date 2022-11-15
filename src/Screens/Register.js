import { StyleSheet, Text, View, SafeAreaView, StatusBar,Image,  FlatList, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { COLORS } from '../Constant/Colors'
import HeaderTop from '../Components/HeaderTop'
import { TextInput } from 'react-native-paper';
import { ButtonStyle } from '../Custom/CustomView';

const Register = ({navigation}) => {
  const [select, setSelect] = useState(0)
  const [fname, setFname] = useState("")
  const [mname, setMname] = useState("")
  const [lname, setLname] = useState("")
  const [number, setNumber] = useState("")
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
    <HeaderTop back={() => navigation.goBack()} title={"Register"} />
          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20, marginHorizontal:20}}>
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
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:20, marginLeft:20}}>I am</Text>
            <FlatList
            numColumns={2}
            // keyExtractor={item => item.id}
            data={languageData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{width:'30%', marginHorizontal:5, }}
                onPress={() => {
                  setSelect(index)
                  // setSelectLang(item.value)
                  // onTapChange(item.value)
                }}>
                <View
                  style={{
                    backgroundColor: index == select ? '#261750' : '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5,
                    paddingVertical: 12,
                    borderRadius: 10,
                    borderWidth:0.5,
                    borderColor: '#261750'
                  }}
                  >
                  <Text
                    style={{
                      fontFamily: 'Poopins',
                      fontSize: 18,
                      fontWeight: '900',
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
          <TextInput
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
              value={number}
              underlineColor={COLORS.overseaspurple}
              keyboardType="number-pad"
              maxLength={10}
              activeUnderlineColor={COLORS.overseaspurple}
              style={{marginBottom:10, backgroundColor:'#F5F5F5', marginHorizontal:20}}
              Outlined={'disabled'}
              onChangeText={text => setNumber(text)}
          />
          <TextInput
              label="Password"
              value={number}
              underlineColor={COLORS.overseaspurple}
              secureTextEntry
              activeUnderlineColor={COLORS.overseaspurple}
              style={{marginBottom:10, marginTop:10, backgroundColor:'#F5F5F5', marginHorizontal:20}}
              Outlined={'disabled'}
              onChangeText={text => setNumber(text)}
          />
          <View style={{ width: '100%', marginBottom:20, marginTop:30 }}>
              <ButtonStyle
                  title={'Register Now'}
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
      </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  nameFields:{
    color:'black'
  }
})