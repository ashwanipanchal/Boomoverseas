import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image } from 'react-native'
import React from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import { ButtonStyle } from '../Custom/CustomView'

const UploadDocuments = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
      <HeaderTop back={() => navigation.goBack()} title={"Upload Documents"} />
      <View style={{marginLeft:20, marginTop:20}}>
        <Text style={{color:COLORS.overseaspurple,fontSize:16}}>UPLOAD PASSPORT</Text>
        <View style={{flexDirection:'row', marginTop:10, marginBottom:10}}>
          <Image style={{height:100, width:100, marginRight:10}} source={require('../images/uploaddoc.png')}/>
          <Image style={{height:100, width:100}} source={require('../images/uploaddoc.png')}/>
        </View>
      </View>
        <View style={{borderBottomWidth:1, borderBottomColor:'lightgray',marginTop:10}}></View>
        <View style={{marginLeft:20, marginTop:20}}>
        <Text style={{color:COLORS.overseaspurple,fontSize:16}}>UPLOAD RESUME</Text>
        <View style={{flexDirection:'row', marginTop:10, marginBottom:10}}>
        <Image style={{height:100, width:100, marginRight:10}} source={require('../images/uploaddoc.png')}/>
          {/* <Image style={{height:100, width:100}} source={require('../images/uploaddoc.png')}/> */}
        </View>
      </View>
      <View style={{borderBottomWidth:1, borderBottomColor:'lightgray',marginTop:10}}></View>
        <View style={{marginLeft:20, marginTop:20}}>
        <Text style={{color:COLORS.overseaspurple,fontSize:16}}>UPLOAD MEDICAL</Text>
        <View style={{flexDirection:'row', marginTop:10, marginBottom:10}}>
        <Image style={{height:100, width:100, marginRight:10}} source={require('../images/uploaddoc.png')}/>
          {/* <Image style={{height:100, width:100}} source={require('../images/uploaddoc.png')}/> */}
        </View>
      </View>
      <View style={{borderBottomWidth:1, borderBottomColor:'lightgray',marginTop:10}}></View>
        <View style={{marginLeft:20, marginTop:20}}>
        <Text style={{color:COLORS.overseaspurple, fontSize:16}}>UPLOAD OTHER DOCUMENTS</Text>
        <View style={{flexDirection:'row', marginTop:10, marginBottom:10}}>
        <Image style={{height:100, width:100, marginRight:10}} source={require('../images/uploaddoc.png')}/>
          {/* <Image style={{height:100, width:100}} source={require('../images/uploaddoc.png')}/> */}
        </View>
      </View>
      <View style={{ width: '100%', position:'absolute', bottom:20 }}>
              <ButtonStyle
                  title={'Continue'}
                  height={52}
                  bgColor={'#261750'}
                  // loader={state.isLoading}
                  onPress={() => {
                      // navigation.navigate('JobOption');
                      settext(selectedLang)
                  }}
              />
          </View>
    </SafeAreaView>
  )
}

export default UploadDocuments

const styles = StyleSheet.create({})