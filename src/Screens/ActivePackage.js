import { StyleSheet, Text, View, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../Constant/Colors'
import HeaderTop from '../Components/HeaderTop'
import { Api, LocalStorage } from '../services/Api'

const ActivePackage = ({navigation}) => {
  const [user, setUser] = useState()
  const [loading, setloading] = useState(false)
  useEffect(()=>{
    getUserData()
  },[])

  const getUserData = async() => {
    setloading(true)

    const jj = (await LocalStorage.getUserDetail() || "")
    const user2 = JSON.parse(jj)
    // return
    const body = {
      "number" : user2.number
    }
    const response = await Api.getProfile(body)
    // alert(JSON.stringify(response,null,2))
    const {sucess, user}=response 
    setUser(user)
    setloading(false)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
    <HeaderTop back={() => navigation.goBack()} title={"Active Package"} />
    {loading ? <ActivityIndicator size={'large'}/>:
    <View style={{backgroundColor:"#fff", height:120, justifyContent:'center'}}>
        <Text style={{color:COLORS.overseaspurple, textAlign:'center', fontWeight:'800', fontSize:16}}>{user?.activeJobs > "0" ? `Active Jobs: ${user.activeJobs} ` :"No Active Package"}</Text>
    </View>}
    </SafeAreaView>
  )
}

export default ActivePackage

const styles = StyleSheet.create({})