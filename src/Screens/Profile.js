import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Image, ActivityIndicator, TouchableOpacity, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeader from '../Components/HomeHeader'
import { COLORS } from '../Constant/Colors'
import { Api, LocalStorage } from '../services/Api'
import { useIsFocused } from '@react-navigation/native'
import { BASE_URL } from '../services/Config'
import Toast from 'react-native-simple-toast';

const Profile = ({navigation, route}) => {
  const focus = useIsFocused()
  const [loading, setLoading] = useState(false)
  const [summeryText, setSummeryText] = useState(false)
  // const [summeryTextValue, setSummeryTextValue] = useState("")
  const [user, setUser] = useState()
  useEffect(()=>{
    // alert(JSON.stringify(summeryText,null,2))
    getProfile()
  },[focus])
  const getProfile = async() => {
    setLoading(true)

    const jj = (await LocalStorage.getUserDetail() || "")
    const user2 = JSON.parse(jj)
    // console.log(user2)
    // return
    const body = {
      "number" : user2.number
    }

    const user = await Api.getProfile(body)
    // alert(JSON.stringify(user,null,2))
    setUser(user)
    setLoading(false)
  }

  const changeSummery = () => {
    setSummeryText(!summeryText)
  }

  // const updateSummary = async() => {
  //   if(!summeryTextValue){
  //     Toast.show('Please enter some imputs');
  //     return
  //   }

  //   const body = {
  //     summary : summeryTextValue
  //   }
  //   const res = await Api.addSummary(body)
  // }
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HomeHeader leftIcon={require('../images/arrow.png')}  menuOption={() => navigation.goBack()} title={"Profile"} secondRightIcon={require('../images/edit.png')} rightOption={() => navigation.navigate('EditProfile', user)} />
      {loading ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><ActivityIndicator size={'large'} color={COLORS.overseaspurple}/></View>:
      <ScrollView>
        <View style={{ backgroundColor: COLORS.overseaspurple, height: 160 }}></View>
        {(user &&
        <View style={{elevation:9}}>
          <Image source={user.user.profile_pic.name.length > 0 ? {uri : `${BASE_URL}${user.user.profile_pic.name}`} : require('../images/profile.png')} style={{ alignSelf: 'center', marginTop: -100, width: 200, height: 200, borderRadius: 100 }} />
        </View>)}
        {(user &&
        <>
        <Text style={{ color: COLORS.darkpurple, textAlign: 'center', fontSize: 26, fontWeight: '700' }}>{user.user.firstName} {user.user.lastName}</Text>
        <Text style={{ color: COLORS.darkpurple, textAlign: 'center', fontSize: 18 }}>{user.user.trade}</Text>
        </>)}
        <View style={{ backgroundColor: '#FFF', marginHorizontal: 20, marginTop: 40, paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10, elevation:5 }}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Summary</Text>
            {/* <TouchableOpacity onPress={()=>changeSummery()}>
              <Image source={summeryText ? require('../images/accept.png') : require('../images/plus.png')} style={{height:18, width:18, resizeMode:'contain', marginRight:10}}/>
            </TouchableOpacity> */}
          </View>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1 }}></View>
          {(user &&
            <Text style={{ color: COLORS.darkpurple, marginTop: 14 }}>{user.user.summary}</Text>
          )}
          {summeryText &&
          <>
          <TextInput placeholderTextColor={'#000'} multiline = {true} onChangeText={text => setSummeryTextValue(text)}value={summeryTextValue} style={{textAlign:'auto', marginBottom:5,borderColor:'#000', borderWidth:0.5, marginTop:5, color:'#000'}} editable={summeryText}/>
          {/* <Text style={{ color: COLORS.darkpurple, marginTop: 14 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text> */}
          <Button onPress={()=> updateSummary()} style={{marginTop:5}} title='Update'/>
          </>}
        </View>
        {(user &&
        <View style={{ backgroundColor: '#FFF', marginHorizontal: 20, marginTop: 40, paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10, elevation:5  }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Experience</Text>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1 }}></View>
          <Text style={{ color: COLORS.darkpurple, marginTop: 14 }}>Work Experience: <Text style={{color: COLORS.darkpurple, marginTop: 14, fontWeight:'800'}}>{user.user?.exp}</Text></Text>
          <Text style={{ color: COLORS.darkpurple, marginTop: 14 }}>Foreign Experience: <Text style={{color: COLORS.darkpurple, marginTop: 14, fontWeight:'800'}}>{user.user?.foreignExp}</Text></Text>
        </View>)}
        {(user &&
        <View style={{ backgroundColor: '#FFF', marginHorizontal: 20, marginTop: 40, paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10, elevation:5  }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Education</Text>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1 }}></View>
          <Text style={{ color: COLORS.darkpurple, marginTop: 14 }}>Qualification: <Text style={{color: COLORS.darkpurple, marginTop: 14, fontWeight:'800'}}>{user.user?.qualification}</Text></Text>
          <Text style={{ color: COLORS.darkpurple, marginTop: 14 }}>Technical Qualification: <Text style={{color: COLORS.darkpurple, marginTop: 14, fontWeight:'800'}}>{user.user?.techQualification}</Text></Text>
        </View>)}
        {(user &&
        <View style={{ backgroundColor: '#FFF', marginHorizontal: 20, marginTop: 40, paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10, elevation:5  }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Industry</Text>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1 }}></View>
          <Text style={{ color: COLORS.darkpurple, marginTop: 14 }}><Text style={{color: COLORS.darkpurple, marginTop: 14, fontWeight:'800'}}>{user.user?.trade}</Text></Text>
        </View>)}
        {(user &&
        <View style={{ backgroundColor: '#FFF', marginHorizontal: 20, marginTop: 40, marginBottom:20, paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10, elevation:5  }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Attached Resume</Text>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 1 }}></View>
          <Text style={{ color: COLORS.darkpurple, marginTop: 14 }}>{user?.user.resume?.name}</Text>
        </View>
        )}
      </ScrollView>}
      </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})