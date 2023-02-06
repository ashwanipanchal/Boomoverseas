import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import LocationFilter from '../Components/LocationFilter'
import IndustryFilter from '../Components/IndustryFilter'
import SalaryFilter from '../Components/SalaryFilter'
import { Api } from '../services/Api'
import SortFilter from '../Components/SortFilter'

const Filter = ({navigation}) => {

    const [selected, setSelected] = useState('sort')
    const [list, setList] = useState([])

    useEffect(()=>{
        // getIndustry()
    },[])

    const getIndustry = async() => {
        const response = await Api.getcategory()
        setList(response.data)
    }

    const renderScreen = () => {
        switch(selected){
            case 'sort':
            return <SortFilter/>

            case 'location':
            return <LocationFilter/>

            case 'industry':
            return <IndustryFilter list = {list}/>

            case 'salary':
            return <SalaryFilter/>
        }
    }
  return (
    <View style={{ flex: 1, backgroundColor: 'f1f1f1' }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
      <HeaderTop back={() => navigation.goBack()} title={"Set Filter"} />
      <View style={{flexDirection:'row', flex:1, }}>
        <View style={{backgroundColor:'#E5E4E2',width:'35%',justifyContent:'space-between'}}>
            <View>
            <TouchableOpacity onPress={()=>setSelected('sort')}>
                <Text style={{backgroundColor: selected == 'sort' ? '#fff' : '#E5E4E2', borderLeftColor:selected == 'sort' ? 'lightgreen' : 'lightgray',borderLeftWidth:8, paddingHorizontal:20, paddingVertical:20, color:COLORS.overseaspurple, textAlign:"left", fontSize:16}}>Sort</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSelected('location')}>
                <Text style={{backgroundColor: selected == 'location' ? '#fff' : '#E5E4E2', borderLeftColor:selected == 'location' ? 'lightgreen' : 'lightgray',borderLeftWidth:8,paddingHorizontal:20, paddingVertical:20, color:COLORS.overseaspurple, textAlign:"left", fontSize:16}}>Location</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSelected('industry')}>
                <Text style={{backgroundColor: selected == 'industry' ? '#fff' : '#E5E4E2', borderLeftColor:selected == 'industry' ? 'lightgreen' : 'lightgray',borderLeftWidth:8,paddingHorizontal:20, paddingVertical:20, color:COLORS.overseaspurple, textAlign:"left", fontSize:16}}>Industry</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setSelected('salary')}>
                <Text style={{backgroundColor: selected == 'salary' ? '#fff' : '#E5E4E2', borderLeftColor:selected == 'salary' ? 'lightgreen' : 'lightgray',borderLeftWidth:8,paddingHorizontal:20, paddingVertical:20, color:COLORS.overseaspurple, textAlign:"left", fontSize:16}}>Salary</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={{padding:20, backgroundColor:'#404040'}}>
                <Text style={{textAlign:'center', color:'#fff'}}>CLEAR ALL</Text>
            </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'#fff',width:'65%', justifyContent:'space-between'}}>
            <View>
                {renderScreen()}
            </View>
            <TouchableOpacity style={{padding:20, backgroundColor:COLORS.overseaspurple}}>
                <Text style={{textAlign:'center', color:'#fff'}}>APPLY FILTERS</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Filter


const styles = StyleSheet.create({})