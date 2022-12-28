import { StyleSheet, Text, View, SafeAreaView, StatusBar,Image,TextInput } from 'react-native'
import React,{useState} from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import { ButtonStyle } from '../Custom/CustomView'
import StringsOfLanguages from '../Constant/LanguageStrings'
import { LocalStorage } from '../services/Api'
import { BASE_URL } from '../services/Config'

const Search = ({navigation}) => {
  const[title, setTitle] = useState("")
  const[loc, setLoc] = useState("")
  const[ind, setInd] = useState("")
  const[exp, setExp] = useState("")
  const[minsal, setMinsal] = useState("")
  const[jobList, setJobList] = useState([])

  const getjobs = async() => {
    if(!title){
      alert("Please enter job title")
      return
    }
    if(!loc){
      alert("Please enter Location")
      return
    }
    if(!ind){
      alert("Please enter Industry")
      return
    }
    if(!exp){
      alert("Please enter Experience")
      return
    }
    if(!minsal){
      alert("Please enter Min Salart")
      return
    }
    const token = (await LocalStorage.getToken()) || '';
    // alert(JSON.stringify(token,null,2))
    console.log(token)
    const btoken = `Bearer ${token}`;
    // alert(JSON.stringify(ind))
    const response = await fetch(`${BASE_URL}search/${title}/${loc}/${ind}/${exp}/${minsal}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": btoken,
      }
    })
    const jsonres = await response.json()
    // alert(JSON.stringify(jsonres,null,2))
    const {status, data} = jsonres;
    if(status){
      setJobList(data)
      navigation.navigate('SearchResult', data)
    }
  }

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={() => navigation.goBack()} title={StringsOfLanguages.search} />
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', marginHorizontal:20,marginTop:20,elevation:4, paddingLeft:20, borderRadius:5, height:60}}>
            <Image source={require('../images/search.png')} style={{height:24, width:24, resizeMode:'contain'}}/>
            <TextInput cursorColor={COLORS.darkpurple} value={title} onChangeText={text => setTitle(text)} style={{marginLeft:6,width:'100%', color:'#000'}} placeholder={StringsOfLanguages.jobsearchtitle} placeholderTextColor={'gray'}/>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', marginHorizontal:20,marginTop:15, elevation:4, paddingLeft:20, borderRadius:5, height:60}}>
            <Image source={require('../images/location.png')} style={{height:24, width:24, resizeMode:'contain'}}/>
            <TextInput cursorColor={COLORS.darkpurple} value={loc} onChangeText={text => setLoc(text)} style={{marginLeft:6,width:'100%', color:'#000'}} placeholder={StringsOfLanguages.location} placeholderTextColor={'gray'}/>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', marginHorizontal:20,marginTop:15, elevation:4, paddingLeft:20, borderRadius:5, height:60}}>
            <Image source={require('../images/experience.png')} style={{height:24, width:24, resizeMode:'contain'}}/>
            <TextInput cursorColor={COLORS.darkpurple} value={ind} onChangeText={text => setInd(text)} style={{marginLeft:6,width:'100%', color:'#000'}} placeholder={StringsOfLanguages.industry} placeholderTextColor={'gray'}/>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', marginHorizontal:20,marginTop:15, elevation:4, paddingLeft:20, borderRadius:5, height:60}}>
            <Image source={require('../images/basicsalary.png')} style={{height:24, width:24, resizeMode:'contain'}}/>
            <TextInput cursorColor={COLORS.darkpurple} value={exp} onChangeText={text => setExp(text)} style={{marginLeft:6,width:'100%', color:'#000'}} placeholder={StringsOfLanguages.workexp} placeholderTextColor={'gray'}/>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#fff', marginHorizontal:20,marginTop:15, elevation:4, paddingLeft:20, borderRadius:5, height:60}}>
            <Image source={require('../images/experience.png')} style={{height:24, width:24, resizeMode:'contain'}}/>
            <TextInput cursorColor={COLORS.darkpurple} value={minsal} onChangeText={text => setMinsal(text)} style={{marginLeft:6, width:'100%', color:'#000'}} placeholder={StringsOfLanguages.minsalary} placeholderTextColor={'gray'}/>
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
                    getjobs()
                  }}
              />
          </View>
      </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})