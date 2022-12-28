import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import StringsOfLanguages from '../Constant/LanguageStrings'
import { Api } from '../services/Api'

const Industry = ({navigation}) => {
    const [list ,setList] = useState([])
    useEffect(()=>{
        getCategory()
    },[])

    const getCategory = async() => {
        const ct = await Api.getcategory()
        // alert(JSON.stringify(ct,null,2))
        setList(ct.data)
    }
    const data = [
        {
            icon: require('../images/marketing.png'),
            title:'Marketing'
        },
        {
            icon: require('../images/const.png'),
            title:'Construction'
        },
        {
            icon: require('../images/manu.png'),
            title:'Manufacture'
        },
        {
            icon: require('../images/oil.png'),
            title:'Oil & Gas'
        },
        {
            icon: require('../images/hospitality.png'),
            title:'Hospitality'
        },
        {
            icon: require('../images/it.png'),
            title:'IT'
        },
        {
            icon: require('../images/account.png'),
            title:'Accounting'
        },
        {
            icon: require('../images/bank.png'),
            title:'Banking'
        },
        {
            icon: require('../images/engineer.png'),
            title:'Engineering'
        },
        {
            icon: require('../images/fin.png'),
            title:'Finance'
        },
        {
            icon: require('../images/medical.png'),
            title:'Medical'
        },
        {
            icon: require('../images/manage.png'),
            title:'Management'
        },
    ]  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={() => navigation.goBack()} title={StringsOfLanguages.industry} />
          <FlatList
            data={list}
            numColumns={3}
            renderItem={({item})=>(
                <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate('IndustryJobList',{title:item.title})} style={{alignItems:'center', backgroundColor:'#FFF', width:'28%', paddingVertical:10, margin:10, borderRadius:10,}}>
                    <Image source={item.icon} style={{width:72, height:72}}/>
                    <Text style={{color:'gray', marginTop:10, fontSize:16}}>{item.title}</Text>
                </TouchableOpacity>
            )}
          />
      </SafeAreaView>
  )
}

export default Industry

const styles = StyleSheet.create({})