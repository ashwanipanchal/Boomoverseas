import { StyleSheet, Text, View, StatusBar, TextInput, Button, Switch , Image, FlatList} from 'react-native'
import React,{useReducer, useEffect,useState} from 'react'
import { COLORS } from '../Constant/Colors';
import HeaderTop from '../Components/HeaderTop';
import userReducer from '../Constant/userReducer';
import { ActivityIndicator } from 'react-native';

const Gallery = ({navigation, route}) => {
const [ImageData, setImageData] = useState()
const [loading, isLoading] = useState(false)
  useEffect(()=>{
    getImages()
  },[])

  const getImages = async() => {
    isLoading(true)
    fetch('http:192.168.1.54:3000/get_test_image')
    .then((response) => response.json())
    .then((responseJson) => {
      // alert(JSON.stringify(responseJson,null,2))
      // return
      setImageData(responseJson.data)
      isLoading(false)
      // alert(JSON.stringify(ImageData,null,2))
    })
    .catch((error) => {
        console.error(error);
    });

    // fetch('http:192.168.1.54:3000/get_test_image',{
    //   method:"GET"
    // }).then(data => data.json()).then(res = alert(JSON.stringify(res,null,2)))
  }

  const initialState = {
    name : route.params.name,
    email : "",
    phone : "",
    password: "",
    age: "",
    toggle: false
  }
  const [userData, dispatch] = useReducer(userReducer, initialState)

  return (
    <View style={{ flex: 1, backgroundColor: 'f1f1f1' }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
      <HeaderTop back={() => navigation.goBack()} title={'Gallary'} />
      {/* <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ color: COLORS.overseaspurple }}>No Images</Text>
      </View> */}
      {/* <TextInput style={{color:'#000', backgroundColor: 'gray', marginTop:10, marginHorizontal:10}} value={userData.name} onChangeText={text => dispatch({type: "Name" , value: text})}/>
      <TextInput style={{color:'#000', backgroundColor: 'gray', marginTop:10, marginHorizontal:10}} value={userData.email} onChangeText={text => dispatch({type: "Email" , value: text})}/>
      <TextInput style={{color:'#000', backgroundColor: 'gray', marginTop:10, marginHorizontal:10}} value={userData.phone} onChangeText={text => dispatch({type: "Phone" , value: text})}/>
      <TextInput style={{color:'#000', backgroundColor: 'gray', marginTop:10, marginHorizontal:10}} value={userData.password} onChangeText={text => dispatch({type: "Password" , value: text})}/>
      <TextInput style={{color:'#000', backgroundColor: 'gray', marginTop:10, marginHorizontal:10}} value={userData.age} onChangeText={text => dispatch({type: "Age" , value: text})}/>
      <Switch style={{marginVertical:10, marginRight:10}} value={userData.toggle} onValueChange={value => dispatch({type: "Toggle", value : value})}/>
      <Button  title="Show Data" onPress={() => alert(JSON.stringify(userData,null,2))}/> */}
      {loading ? <ActivityIndicator/> : 
        <FlatList
          data={ImageData}
          renderItem={({item})=>(
            <View>
              <Text style={{ color: COLORS.overseaspurple }}>{item?.title}</Text>
              <Image source={{ uri: item?.icon }} style={{ width: '100%', height: 500, resizeMode: 'contain' }} />
            </View>
          )}
        />
      }
      
    </View>
  )
}

export default Gallery

const styles = StyleSheet.create({

})