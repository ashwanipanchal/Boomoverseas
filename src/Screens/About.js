import { StyleSheet, Text, View,SafeAreaView, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'

const About = ({navigation}) => {
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={() => navigation.goBack()} title={"About"} />
          <ScrollView>
          <View style={{marginHorizontal:20, marginTop:20}}>
            <Text style={{ color: COLORS.darkpurple, marginTop:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
          </View>
          <View style={{marginHorizontal:20, marginTop:20}}>
            <Text style={{ color: COLORS.darkpurple, marginTop:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
          </View>
          <View style={{marginHorizontal:20, marginTop:20}}>
            <Text style={{ color: COLORS.darkpurple, marginTop:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
          </View>
          <View style={{marginHorizontal:20, marginTop:20}}>
            <Text style={{ color: COLORS.darkpurple, marginTop:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
          </View>
          <View style={{marginHorizontal:20, marginTop:20}}>
            <Text style={{ color: COLORS.darkpurple, marginTop:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
          </View>
          <View style={{marginHorizontal:20, marginTop:20}}>
            <Text style={{ color: COLORS.darkpurple, marginTop:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
          </View>
          <View style={{marginHorizontal:20, marginTop:20}}>
            <Text style={{ color: COLORS.darkpurple, marginTop:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
          </View>
          <View style={{marginHorizontal:20, marginTop:20}}>
            <Text style={{ color: COLORS.darkpurple, marginTop:14}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
          </View>
          </ScrollView>
      </SafeAreaView>
  )
}

export default About

const styles = StyleSheet.create({})