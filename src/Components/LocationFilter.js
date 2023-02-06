import { StyleSheet, Text, View, TextInput, Image, FlatList } from 'react-native'
import React from 'react'
import { COLORS } from '../Constant/Colors'

const LocationFilter = () => {
    const data = [
        {
            name : "Delhi",
            id:1
        },
        {
            name : "NCR",
            id:2
        },
        {
            name : "Mumbai",
            id:3
        },
        {
            name : "Chennai",
            id:4
        },
        {
            name : "Pune",
            id:5
        },
        {
            name : "Hyderabad",
            id:6
        },
    ]
  return (
    <View>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:10, borderBottomColor:'#E5E4E2', borderBottomWidth:1, paddingVertical:7, }}>
        <TextInput placeholder='Search' selectionColor={COLORS.darkpurple} placeholderTextColor={"#E5E4E2"} style={{fontSize:16, flex:1, }}/>
        <Image source={require('../images/loupe.png')} style={{width:20, height:20, resizeMode:'contain'}}/>
      </View>
      <FlatList
        data={data}
        renderItem={({item})=>(
            <View style={{padding:20, borderBottomColor:'#E5E4E2', borderBottomWidth:1, flexDirection:'row', alignItems:'center'}}>
                <View style={{borderWidth:1, borderRadius:3, borderColor:COLORS.darkpurple,width:16, height:16, marginRight:10}}>
                </View>
                <Text style={{fontSize:16, color:COLORS.darkpurple}}>{item.name}</Text>
            </View>
        )}
      />
    </View>
  )
}

export default LocationFilter

const styles = StyleSheet.create({})