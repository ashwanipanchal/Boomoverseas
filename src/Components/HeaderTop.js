
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { COLORS } from '../Constant/Colors'

const HeaderTop = (props) => {
    return (
        <View style={{backgroundColor:COLORS.overseaspurple, height:58, flexDirection:'row', alignItems:'center', elevation:10}}>
            <TouchableOpacity style={{ paddingVertical:10}} onPress={()=>props.back()}>
                <Image source={require('../images/arrow.png')} style={{ height: 22, width: 22, marginHorizontal:20 }} />
            </TouchableOpacity>
            <Text style={{fontSize:18, color:'#FFF'}}>{props.title}</Text>
        </View>
    )
}
export default HeaderTop