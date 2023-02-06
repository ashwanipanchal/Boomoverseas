import { StyleSheet, Text, View, FlatList,  } from 'react-native'
import React from 'react'
import { COLORS } from '../Constant/Colors'

const SalaryFilter = () => {
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
      {/* <FlatList
        data={data}
        renderItem={({item})=>(
            <View style={{padding:20, borderBottomColor:'#E5E4E2', borderBottomWidth:1, flexDirection:'row', alignItems:'center'}}>
                <View style={{borderWidth:1, borderRadius:3, borderColor:COLORS.darkpurple,width:16, height:16, marginRight:10}}>
                </View>
                <Text style={{fontSize:16, color:COLORS.darkpurple}}>{item.name}</Text>
            </View>
        )}
      /> */}
    </View>
  )
}

export default SalaryFilter

const styles = StyleSheet.create({})