import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import { ButtonStyle } from '../Custom/CustomView'
import DocumentPicker, { types } from 'react-native-document-picker';
import { Api } from '../services/Api'
import { BASE_URL } from '../services/Config'

const UploadDocuments = ({navigation, route}) => {
  // alert(JSON.stringify(route.params.user,null,2))
  const [passport1, setPassport1] = useState(route.params.user.passportImageF?.name.length > "0" ? `${BASE_URL}${route.params.user.passportImageF.name}`:"")
  const [passport2, setPassport2] = useState(route.params.user.passportImageB?.name.length > "0" ? `${BASE_URL}${route.params.user.passportImageB.name}`: "")
  const [resume, setResume] = useState(route.params.user.resume?.name.length > "0" ? `${BASE_URL}${route.params.user.resume?.name}`: "")
  const [passport1Full, setPassport1Full] = useState()
  const [passport2Full, setPassport2Full] = useState()
  const [resumeFull, setResumeFull] = useState()
  const [userData, setUserData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    getProfileDocs()
  },[])

  const getProfileDocs = async() => {
    setLoading(true)
    const response = await Api.getProfile()
    // alert(JSON)
    setUserData(response.user)
    setLoading(false)
  }

  const getPassport = async(item) => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.images],
      })
        if(response){
          console.log("document picker response ==", response)
          if(item == "1"){
            // alert(JSON.stringify(response,null,2))
            setPassport1Full(response)
            setPassport1(response.uri)
          }else if (item == "2"){
            setPassport2Full(response)
            setPassport2(response.uri)
          }else if(item == "3"){
            setResumeFull(response)
            setResume(response.uri)
          }
        }
    } catch (error) {
      console.log(error)
    }
  }

  const submitDocs = async() => {
    // alert(JSON.stringify("submitted",null,2))
    var formData = new FormData()
    if ("uri" in passport1Full) {
      formData.append('passportImageF', {
        uri: passport1Full.uri,
        type: passport1Full.type,
        name: passport1Full.name,
      })
    }
    if ("uri" in passport2Full) {
      formData.append('passportImageB', {
        uri: passport2Full.uri,
        type: passport2Full.type,
        name: passport2Full.name,
      })
    }
    if ("uri" in resumeFull) {
      formData.append('resume', {
        uri: resumeFull.uri,
        type: resumeFull.type,
        name: resumeFull.name,
      })
    }
    // alert(JSON.stringify(formData,null,2))
    // return
    const response = await Api.uploadDocs(formData)
    alert(JSON.stringify(response.message,null,2))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
      <HeaderTop back={() => navigation.goBack()} title={"Upload Documents"} />
      <ScrollView style={{marginBottom:80}}>
      <View style={{marginLeft:20, marginTop:20}}>
        <Text style={{color:COLORS.overseaspurple,fontSize:16}}>UPLOAD PASSPORT</Text>
        <View style={{flexDirection:'row',}}>
        <TouchableOpacity onPress={()=>getPassport("1")} style={{ marginTop:10, marginBottom:10}}>
          <Image style={{height:100, width:100, marginRight:10}} source={passport1 ? {uri : `${passport1}`} : require('../images/uploaddoc.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>getPassport("2")} style={{flexDirection:'row', marginTop:10, marginBottom:10}}>
          <Image style={{height:100, width:100, marginRight:10}} source={passport2 ? {uri : `${passport2}`} :require('../images/uploaddoc.png')}/>
        </TouchableOpacity>
        </View>

      </View>
        <View style={{borderBottomWidth:1, borderBottomColor:'lightgray',marginTop:10}}></View>
        <View style={{marginLeft:20, marginTop:20}}>
        <Text style={{color:COLORS.overseaspurple,fontSize:16}}>UPLOAD RESUME</Text>
        <View style={{flexDirection:'row', marginTop:10, marginBottom:10}}>
        <TouchableOpacity onPress={()=>getPassport("3")} style={{flexDirection:'row', marginTop:10, marginBottom:10}}>
          <Image style={{height:100, width:100}} source={resume.length > "0" ? {uri : `${resume}`} :require('../images/uploaddoc.png')}/>
        </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{borderBottomWidth:1, borderBottomColor:'lightgray',marginTop:10}}></View>
        <View style={{marginLeft:20, marginTop:20}}>
        <Text style={{color:COLORS.overseaspurple,fontSize:16}}>UPLOAD MEDICAL</Text>
        <View style={{flexDirection:'row', marginTop:10, marginBottom:10}}>
        <Image style={{height:100, width:100, marginRight:10}} source={require('../images/uploaddoc.png')}/>
        </View>
      </View>
      <View style={{borderBottomWidth:1, borderBottomColor:'lightgray',marginTop:10}}></View>
        <View style={{marginLeft:20, marginTop:20}}>
        <Text style={{color:COLORS.overseaspurple, fontSize:16}}>UPLOAD OTHER DOCUMENTS</Text>
        <View style={{flexDirection:'row', marginTop:10, marginBottom:10}}>
        <Image style={{height:100, width:100, marginRight:10}} source={require('../images/uploaddoc.png')}/>
        </View>
      </View> */}
      {/* <View style={{borderBottomWidth:1, borderBottomColor:'lightgray',marginTop:10}}></View>
        <View style={{marginLeft:20, marginTop:20}}>
        <Text style={{color:COLORS.overseaspurple, fontSize:16}}>UPLOAD OTHER DOCUMENTS</Text>
        <View style={{flexDirection:'row', marginTop:10, marginBottom:10}}>
        <Image style={{height:100, width:100, marginRight:10}} source={require('../images/uploaddoc.png')}/>
        </View>
      </View> */}
      </ScrollView>
      <View style={{ width: '100%', position:'absolute', bottom:20 }}>
              <ButtonStyle
                  title={'Submit'}
                  height={52}
                  bgColor={'#261750'}
                  // loader={state.isLoading}
                  onPress={() => {
                      // navigation.navigate('JobOption');
                    submitDocs()
                  }}
              />
          </View>
    </SafeAreaView>
  )
}

export default UploadDocuments

const styles = StyleSheet.create({})