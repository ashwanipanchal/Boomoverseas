import { StyleSheet, Text, View, SafeAreaView, StatusBar,Image,TextInput } from 'react-native'
import React from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import { ButtonStyle } from '../Custom/CustomView'
import StringsOfLanguages from '../Constant/LanguageStrings'

const Search = ({navigation}) => {
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={() => navigation.goBack()} title={StringsOfLanguages.search} />
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', marginHorizontal:20,marginTop:20, paddingLeft:20, borderRadius:5, height:60}}>
            <Image source={require('../images/search.png')} style={{height:24, width:24, resizeMode:'contain'}}/>
            <TextInput style={{marginLeft:6,width:'100%', color:'#000'}} placeholder={StringsOfLanguages.jobsearchtitle} placeholderTextColor={'gray'}/>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', marginHorizontal:20,marginTop:20, paddingLeft:20, borderRadius:5, height:60}}>
            <Image source={require('../images/location.png')} style={{height:24, width:24, resizeMode:'contain'}}/>
            <TextInput style={{marginLeft:6,width:'100%', color:'#000'}} placeholder={StringsOfLanguages.location} placeholderTextColor={'gray'}/>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', marginHorizontal:20,marginTop:20, paddingLeft:20, borderRadius:5, height:60}}>
            <Image source={require('../images/experience.png')} style={{height:24, width:24, resizeMode:'contain'}}/>
            <TextInput style={{marginLeft:6,width:'100%', color:'#000'}} placeholder={StringsOfLanguages.industry} placeholderTextColor={'gray'}/>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', marginHorizontal:20,marginTop:20, paddingLeft:20, borderRadius:5, height:60}}>
            <Image source={require('../images/basicsalary.png')} style={{height:24, width:24, resizeMode:'contain'}}/>
            <TextInput style={{marginLeft:6,width:'100%', color:'#000'}} placeholder={StringsOfLanguages.workexp} placeholderTextColor={'gray'}/>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', marginHorizontal:20,marginTop:20, paddingLeft:20, borderRadius:5, height:60}}>
            <Image source={require('../images/experience.png')} style={{height:24, width:24, resizeMode:'contain'}}/>
            <TextInput style={{marginLeft:6, width:'100%', color:'#000'}} placeholder={StringsOfLanguages.minsalary} placeholderTextColor={'gray'}/>
          </View>
          <View style={{ width: '100%', marginTop:30 }}>
              <ButtonStyle
                  title={StringsOfLanguages.findjob}
                  height={52}
                  bgColor={'#261750'}
                  // loader={state.isLoading}
                  onPress={() => {
                      // navigation.navigate('JobOption');
                    //   settext(selectedLang)
                  }}
              />
          </View>
      </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})