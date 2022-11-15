import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native'
import React from 'react'
import HomeHeader from '../Components/HomeHeader'
import { COLORS } from '../Constant/Colors'

const Profile = ({navigation}) => {
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HomeHeader leftIcon={require('../images/arrow.png')}  menuOption={() => navigation.goBack()} title={"Profile"} secondRightIcon={require('../images/edit.png')} rightOption={() => navigation.navigate('EditProfile')} />
          <ScrollView>
              <View style={{ backgroundColor: COLORS.overseaspurple, height: 160 }}></View>
              <Image source={require('../images/profile.png')} style={{ alignSelf: 'center', marginTop: -100 }} />
              <Text style={{ color: COLORS.darkpurple, textAlign: 'center', fontSize: 26, fontWeight: '700' }}>John Doe</Text>
              <Text style={{ color: COLORS.darkpurple, textAlign: 'center', fontSize: 18 }}>Application Developer</Text>
              <View style={{backgroundColor:'#FFF', marginHorizontal:20, marginTop:40, paddingVertical:20, paddingHorizontal:10, borderRadius:10}}>
                <Text style={{ color: COLORS.darkpurple, fontSize:18 , marginBottom:10}}>Summary</Text>
                <View style={{borderBottomColor:'lightgray', borderBottomWidth:1}}></View>
                <Text style={{ color: COLORS.darkpurple, marginTop:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
              </View>
              <View style={{backgroundColor:'#FFF', marginHorizontal:20, marginTop:40, paddingVertical:20, paddingHorizontal:10, borderRadius:10}}>
                <Text style={{ color: COLORS.darkpurple, fontSize:18 , marginBottom:10}}>Experience</Text>
                <View style={{borderBottomColor:'lightgray', borderBottomWidth:1}}></View>
                <Text style={{ color: COLORS.darkpurple, marginTop:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
              </View>
              <View style={{backgroundColor:'#FFF', marginHorizontal:20, marginTop:40, paddingVertical:20, paddingHorizontal:10, borderRadius:10}}>
                <Text style={{ color: COLORS.darkpurple, fontSize:18 , marginBottom:10}}>Education</Text>
                <View style={{borderBottomColor:'lightgray', borderBottomWidth:1}}></View>
                <Text style={{ color: COLORS.darkpurple, marginTop:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
              </View>
          </ScrollView>
      </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})