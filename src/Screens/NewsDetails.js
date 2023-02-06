import { StyleSheet, Text, View , SafeAreaView, StatusBar, Image, ScrollView } from 'react-native'
import React from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import StringsOfLanguages from '../Constant/LanguageStrings'

const NewsDetails = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
    <HeaderTop back={() => navigation.goBack()} title={StringsOfLanguages.newsdetails} />
    <ScrollView>
    <View style={{backgroundColor:'#FFF',paddingHorizontal:20, marginTop:20,paddingHorizontal:10,  paddingVertical:10, borderRadius:10,}}>
        <View style={{flexDirection:'row', justifyContent:'space-between',  }}>
            <Text  style={{ color: COLORS.darkpurple,}}>INDIA</Text>
            <Text  style={{ color: COLORS.darkpurple,}}>Posted On Jan 24, 2022 </Text>
        </View>
        <Text style={{ color: COLORS.darkpurple, fontSize: 20, fontWeight:'bold', marginTop:10 }}>Lorem Ipsum</Text>
        <Text style={{ color: COLORS.darkpurple, fontSize: 16,  marginTop:5 , textAlign:'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
        <Image source={require('../images/banner.png')} style={{width:'100%', height:175, resizeMode:'contain'}}/>
        <Text style={{ color: COLORS.darkpurple, fontSize: 16,  marginTop:5 ,textAlign:'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
        <Text style={{ color: COLORS.darkpurple, fontSize: 16,  marginTop:5 ,textAlign:'justify'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
        {/* <View style={{backgroundColor:COLORS.overseaspurple, width:'30%', flexDirection:'row', paddingVertical:10, alignItems:'center', marginTop:20, borderRadius:10, marginBottom:20}}>
            <Image source={require('../images/share.png')} style={{width:28, height:28, resizeMode:'contain', marginLeft:10}}/>
            <Text style={{color:'#FFF', fontSize:20, marginLeft:10}}>Share</Text>
        </View> */}
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default NewsDetails

const styles = StyleSheet.create({})