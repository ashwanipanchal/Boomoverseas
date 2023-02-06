import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../Constant/Colors'

const HomeHeader = (props) => {
  return (
    <View style={{ backgroundColor: COLORS.overseaspurple, height: 58, flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', elevation:8 }}>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{paddingVertical:6}} onPress={()=>props.menuOption()}>
          <Image source={props.leftIcon} style={{ height: 20, width: 20, marginHorizontal: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: '#FFF', }}>{props.title}</Text>
      </View>
      <View style={{ flexDirection:'row'}}>
        <TouchableOpacity style={{ paddingVertical:6, }} onPress={()=>props.leftOption()}>
          <Image source={props.firstRightIcon} style={{ height: 22, width: 22,marginHorizontal:14 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical:6,}} onPress={()=>props.rightOption()}>
          <Image source={props.secondRightIcon} style={{ height: 22, width: 22,marginHorizontal:14  }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({})