
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { COLORS } from '../Constant/Colors'

const HeaderTop = (props) => {
    return (
        <View style={{backgroundColor:COLORS.overseaspurple, height:58, flexDirection:'row', alignItems:'center', elevation:10}}>
            <TouchableOpacity style={{ paddingVertical:12}} onPress={()=>props.back()}>
                <Image source={require('../images/arrow.png')} style={{ height: 20, width: 20, marginHorizontal:20 }} />
            </TouchableOpacity>
            <Text style={{fontSize:20, color:'#FFF'}}>{props.title}</Text>
        </View>
    )
}
export default HeaderTop