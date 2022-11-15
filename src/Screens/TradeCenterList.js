import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, FlatList, Image } from 'react-native'
import React from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import StringsOfLanguages from '../Constant/LanguageStrings'

const TradeCenterList = ({navigation}) => {
  const data =  [
    {
      title: 'GRC Trade Center',
      address: 'A-23 Jyoti bhawan, Commercial Complex, New Delhi 110009',
      number: '+91 9876543210'
    },
    {
      title: 'GRC Trade Center',
      address: 'A-23 Jyoti bhawan, Commercial Complex, New Delhi 110009',
      number: '+91 9876543210'
    }
  ]
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
    <HeaderTop back={() => navigation.goBack()} title={StringsOfLanguages.tradecenterlist} />
    <ScrollView>
        <Text style={{color:COLORS.darkpurple, marginLeft:20, marginTop:10, marginBottom:10}}>NEW DELHI</Text>
        <View style={{backgroundColor:'#f9f9f9', padding:10}}>
            <FlatList
              data={data}
              renderItem={({item})=>(
                <View style={{backgroundColor:'#FFF', flexDirection:'row', marginVertical:10, justifyContent:'space-between', marginHorizontal:4, paddingHorizontal:8, paddingVertical:8}}>
                  <View style={{width:'60%', justifyContent:'center'}}>
                    <Text style={{color:'#000',fontSize:18, fontWeight:'bold'}}>{item.title}</Text>
                    <Text style={{color:'gray'}}>{item.address}</Text>
                    <View style={{flexDirection:'row'}}>
                      <Image source={require('../images/whatsapp.png')} style={{width: 22, height:22}}/>
                      <Text style={{color:'gray', marginLeft:5}}>{item.number}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{color:'gray', textAlign:'center'}}>Direction</Text>
                    <Image source={require('../images/map.png')} style={{width: 80, height:80}}/>
                  </View>
                </View>
              )}
            />
        </View>
        <Text style={{color:COLORS.darkpurple, marginLeft:20, marginTop:10, marginBottom:10}}>NOIDA</Text>
        <View style={{backgroundColor:'#f9f9f9', padding:10}}>
            <FlatList
              data={data}
              renderItem={({item})=>(
                <View style={{backgroundColor:'#FFF', flexDirection:'row', marginVertical:10, justifyContent:'space-between', marginHorizontal:4, paddingHorizontal:8, paddingVertical:8}}>
                  <View style={{width:'60%', justifyContent:'center'}}>
                    <Text style={{color:'#000', fontSize:18, fontWeight:'bold'}}>{item.title}</Text>
                    <Text style={{color:'gray'}}>{item.address}</Text>
                    <View style={{flexDirection:'row'}}>
                      <Image source={require('../images/whatsapp.png')} style={{width: 22, height:22}}/>
                      <Text style={{color:'gray', marginLeft:5}}>{item.number}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{color:'gray', textAlign:'center'}}>Direction</Text>
                    <Image source={require('../images/map.png')} style={{width: 80, height:80}}/>
                  </View>
                </View>
              )}
            />
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default TradeCenterList

const styles = StyleSheet.create({})