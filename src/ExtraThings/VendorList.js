import { StyleSheet, Text, SafeAreaView,TouchableOpacity, View, Image, TextInput, StatusBar, ScrollView, FlatList, Modal, Dimensions, Linking, KeyboardAvoidingView, PermissionsAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { COLORS } from '../../Constant/Colors'
import LinearGradient from 'react-native-linear-gradient'
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { Api, LocalStorage, width } from '../../services/Api'
import { BASE_URL } from '../../services/Config'
import Geocoder from 'react-native-geocoding';
import moment from 'moment'
import Toast from 'react-native-simple-toast';
import { RadioButton } from 'react-native-paper'
import Loader from '../../services/Loader'
const { height } = Dimensions.get('window');
import useKeyboardHeight from 'react-native-use-keyboard-height';
// import RtcEngine from 'react-native-agora'
import AdmitChat from '../../Components/AdmitChat'
import * as Animatable from 'react-native-animatable';
import { Platform } from 'react-native'
import { async } from '@firebase/util'

const VendorList = ({ navigation, route }) => {
  // alert(JSON.stringify(route.params.vendor.id,null,2))
  const keyboardHeight = useKeyboardHeight();
  const areasheet = useRef();
  const GOOGLE_PLACES_API_KEY = 'AIzaSyDMfsTk4NHW07RutlBqQ9hl95QtELwvCWk'
  const [modalOpen, setModalOpen] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [modalIndex, setModalIndex] = useState('');
  const [modalOpen1, setModalOpen1] = useState(false);
  const [newData, setNewData] = useState([]);
  const [userDetail, setUserDetail] = useState();
  const [seletedIndex, setSeletedIndex] = useState(0);
  const [sub_category, setSub_Category] = useState([]);
  const [Loading, setLoading] = useState(false)
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [tt, setTT] = useState()
  const [location, setLocation] = useState({});
  const [locationName, setLocationName] = useState('');
  const flatList = useRef();
  const [messages, setMessages] = useState([]);
  const [updatedArea, setUpdatedArea] = useState()
  const [EachMessages, setEachMessages] = useState('');
  const [userID, setUserID] = useState();
  const [filterCategory, setFilterCategory] = useState();
  const [data, setData] = useState([])
  const [state, setState] = useState({
    selectedIndex:'',
    open:false,
    activeIndex: ''
  })

  useEffect(() => {
    getCityNameFromLatLon()
    // checkVendorAvalibility(location)
  }, [])

  useEffect(() => {
      getAdminChat()
      const interval = setInterval(()=>{
        getAdminChat()
      },3000)
      return () => clearInterval(interval)
    // alert(keyboardHeight)
    // return() => getAdminChat()
  }, [getAdminChat])

  const getAdminChat = async () => {
    // setLoading(true)
    const user = (await LocalStorage.getUserDetail() || '')
    const token = (await LocalStorage.getToken() || '')
    const newUser = JSON.parse(user)

    // alert(JSON.stringify(user,null,2))
    const btoken = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}get-admin-chat/${newUser.id}`, {
      // const response = await fetch(`${BASE_URL}get-chat-history/2`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": btoken,
      }
    })
    const res = await response.json()
    // alert(JSON.stringify(res,null,2))
    const newDate = res.data[0].history.map((i) => {
      let date = moment(i.created_at).format('DD/MMM/yyyy')
      let time = moment(i.created_at).format('h:mm a');

      return { ...i, time, date }
    })
    const cc = generateItems(newDate)
    // setLoading(false)
    setMessages(cc)
  }

  function groupedDays(messages) {
    return messages.reduce((acc, el, i) => {
      const messageDay = moment(el.created_at).format('DD-MMM-YYYY');
      if (acc[messageDay]) {
        return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
      }
      return { ...acc, [messageDay]: [el] };
    }, {});
  }

  function generateItems(messages) {
    const days = groupedDays(messages);
    const sortedDays = Object.keys(days).sort(
      (x, y) => moment(y, 'DD-MMM-YYYY').unix() - moment(x, 'DD-MMM-YYYY').unix()
    );
    const items = sortedDays.reduce((acc, date) => {
      const sortedMessages = days[date].sort(
        (x, y) => new Date(y.created_at) - new Date(x.created_at)
      );
      return acc.concat([...sortedMessages, { type: 'day', date, id: date }]);
    }, []);
    return items.reverse();
  }

  const onSelect = async(item, name) => {
    // alert(JSON.stringify(name,null,2))
    // return
    setLocation(item);
    setLocationName(name)
    setLoading(true)

    const body = {
      "category_id": updatedArea ? updatedArea.id : route.params.vendor.id,
      "location": {
        "lat": item.lat,
        "lng": item.lng,
        "name":  name ? name : placeName
      },
      "user_id": userID
    }
    // alert(JSON.stringify(body,null,2))
    // return
    const response = await Api.getVendorList(body)
    const { success, data } = response;
    setLoading(false)
    // alert(JSON.stringify(response,null,2))
    if (success) {
      setNewData(data)
    } else {
      setNewData(data)
      refRBSheet2.current.open()
    }

  };
  const onSearch = item => {
    // alert(JSON.stringify(item,null,2))
  };


  const sendChatToAdmin = async () => {
    if (!EachMessages) {
      Toast.show("Write your message")
      return
    }
    const body = {
      "user_id": userID,
      "message": EachMessages
    }
    //  alert(JSON.stringify(body,null,2))
    //  return
    setEachMessages('')
    const response = await Api.sendchattoadmin(body)
    const { success } = response
    if (success) {
      getAdminChat()
    }
  }

  const getCityNameFromLatLon = async () => {
    setLoading(true)
    Geocoder.init('AIzaSyAUA0Tr4oFc_BNL9DEeVWayBDUcd2GeYxw');
    const response = await Geocoder.from(route.params.coords.coords.latitude, route.params.coords.coords.longitude);
    // alert(JSON.stringify(response,null,2))
    // const cityArray = response.results[0].formatted_address.split(',');
    // const city = cityArray[cityArray.length - 3]
    // setPlaceName(city)
    const cityArray = response.results[0].formatted_address;
    // const city = cityArray[cityArray.length - 3]
    setPlaceName(cityArray)
    const user = (await LocalStorage.getUserDetail() || '')
    const newUser = JSON.parse(user)
    setUserID(newUser.id)
    let lat = route.params.coords.coords.latitude
    let lng = route.params.coords.coords.longitude
    if (Object.keys(location).length > 0) {
      lat = loc.lat
      lng = loc.lng
    }
    const body = {
      "category_id": updatedArea ? updatedArea.id : route.params.vendor.id,
      "location": {
        "lat": lat,
        "lng": lng,
        "name": cityArray
      },
      "user_id": newUser.id
    }
    alert(JSON.stringify(body,null,2))
    return
    const response1 = await Api.getVendorList(body)
    const { success, data } = response1;
    setLoading(false)
    alert(JSON.stringify(response1.data.length,null,2))
    if (success) {
      setNewData(data)
    } else {
      setNewData(data)
      refRBSheet2.current.open()
    }

   
  }
  const openCallModal = (index) => {
    setModalIndex(index)
    setModalOpen1(true)
  }
  const openMessageModal = (item, index) => {
    setUserDetail(item)
    setModalIndex(index)
    setModalOpen(true)
  }
  const getSubCategory = async () => {
    const token = (await LocalStorage.getToken() || '')
    const btoken = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}get-subcategory/${route.params.vendor.id}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": btoken,
      }
    })
    const res = await response.json()
    // alert(JSON.stringify(res,null,2))
    if (res.success) {
      setSub_Category(res.data)
      areasheet.current.show()
    }
  }
  const checkVendorAvalibility = async (loc) => {
    // alert(JSON.stringify(loc,null,2))
    // alert('Came here')
    // if(Object.keys(location).length > 0){
    //   alert('location updated')
    // } else if(route.params.coords.coords){
    //   alert('location from home')
    // }
    // return
    setLoading(true)
    const user = (await LocalStorage.getUserDetail() || '')
    const newUser = JSON.parse(user)
    let lat = route.params.coords.coords.latitude
    let lng = route.params.coords.coords.longitude
    if (Object.keys(location).length > 0) {
      lat = location.lat
      lng = location.lng
    }
    const body = {
      "category_id": loc.id,
      "location": {
        "lat": lat,
        "lng": lng,
        "name": locationName ? locationName : placeName
      },
      "user_id": newUser.id
    }
    // alert(JSON.stringify(body,null,2))
    // return
    const response = await Api.getVendorList(body)
    const { success, data } = response;
    setLoading(false)
    // alert(JSON.stringify(response,null,2))
    if (success) {
      setNewData(data)
    } else {
      setNewData(data)
      refRBSheet2.current.open()
    }
  }

  // useEffect(() => {
  //   if (Object.keys(location).length > 0) {
  //     checkVendorAvalibility(location, locationName)
  //   }
  // }, [location, locationName])

  const checkCallPermission = async () =>{
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ])
        if (
            granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
            console.log('You can use the mic')
            navigation.navigate('DialedCallScreen')
        } else {
            console.log('Permission denied')
        }
    } catch (err) {
        console.warn(err)
    }
}

  const saveCalls = async(item) => {
    if(item.register_by == 'web'){
      // alert('our user')
      const user = (await LocalStorage.getUserDetail() || '')
      const newUser = JSON.parse(user)
      const body = {
        "user_id" : newUser.id.toString(),
        "category_id" : item.category_id,
        // "location" : item.service_loaction,
        "vendor_id" : item.vendor_id
      }
      // alert(JSON.stringify(body,null,2))
      const response = await Api.saveCallLogs(body)
      const {success} = response
      if(success){
        Linking.openURL(`tel:${item.contact_number}`)
      }
    }else{
      Linking.openURL(`tel:${item.contact_number}`)
    }
  }

  // const doMessage = async(item) => {
  //   // const body = {
  //   //   "vendor_id" : item.user_id
  //   // }
  //   // const response = await Api.saveVendorList(body)
  //   // alert(JSON.stringify(response,null,2))
  //   // const {success} = response;
  //   // if(success){
  //     navigation.navigate('PersonalChat', { userDetail, client: item })
  //   // }
  // }
  const updatePlan = async() => {
    areasheet.current.close()
    // alert(JSON.stringify(updatedArea,null,2))
    checkVendorAvalibility(updatedArea)
    setFilterCategory(updatedArea.title)
  }

  const openMaps = async(item) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${item.latitude},${item.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    await Linking.openURL(url)
  }

  const makeCall = async(item)=> {
    // alert(JSON.stringify(item,null,2))
    // return
    // return
    if(item.contact_number != null){
      saveCalls(item)
    }else{
      alert('Phone number is not avaliable')
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
        <Text style={{color: '#fff', fontSize: 16, backgroundColor:COLORS.blue, alignSelf:'center',  paddingHorizontal:10, paddingVertical:3, borderRadius:4}}>{route.params.vendor.title}</Text>
      {/* <Text  style ={{textAlign:'center'}}>
        <Text style = {{color: '#fff', fontSize: 16, textAlign:'center',backgroundColor:COLORS.blue}}> {route.params.vendor.title} </Text>
      </Text> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2, alignItems: 'center', width: '100%' }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
          <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          {/* <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} /> */}
        </TouchableOpacity>
        {/* <View style={{width: '70%', }}>
          <Text style={{ width:'auto', color: '#fff', fontSize: 16, fontWeight: '700', textAlign: 'center', backgroundColor:COLORS.blue}}>{route.params.vendor.title}</Text>
          <Text style={{ color: COLORS.orange, fontSize: 13, fontWeight: '500', textAlign: 'center', }}>{locationName ? locationName.slice(0,70) : placeName.slice(0,70)}...</Text>
        </View> */}
        <Text numberOfLines={2} style={{  color: COLORS.orange, fontSize: 16,  textAlign: 'center',width:'72%'}}>{locationName ? locationName : placeName}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('SearchLocation', { onSelect: onSelect }, { onSearch: onSearch }) }} style={{ marginRight: 10, justifyContent: 'flex-end', alignItems:'center', }} >
          <Image source={require('../../images/pin.png')} style={{ width: 28, height: 28, resizeMode: 'contain' }} />
          <Text style={{fontSize:10,color:COLORS.blue}}>Location</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => { getSubCategory() }} style={{ width: '90%', height: 50, backgroundColor: '#FFF', alignSelf: 'center', marginTop: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, elevation:2 }}>
        <Text style={{ color: COLORS.lightBlack, marginLeft: 15, fontSize: 16, fontFamily: 'Poppins-Regular' }}>{filterCategory ? filterCategory : 'Sub Categories'}</Text>
        <Image source={require('../../images/forwardarrow.png')} style={{ width: 24, height: 24, marginRight: 10 }} />
      </TouchableOpacity>
      {Loading && <ActivityIndicator style={{justifyContent:'center', alignSelf:'center'}} size={'large'} color={COLORS.orange}/>}
      <ScrollView>
        <FlatList
          data={newData}
          keyExtractor={(index) => index}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF', padding: 10, marginBottom: 5, alignItems: 'center', elevation:3, marginHorizontal:10, borderRadius:5}}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* <Image source={require('../../images/avatar3.png')} style={{ width: 52, height: 52, marginTop: 8, resizeMode: 'contain' }} /> */}
                <View style={{ justifyContent: 'flex-start', marginLeft: 10, width: '80%', }}>
                  {/* <Text style={{color:'black'}}>{alert(JSON.stringify(item,null,2))}</Text> */}
                  <Text numberOfLines={2} style={{ color: COLORS.black, fontSize: 16, }}>{item.business_name || item.name} {item.register_by == 'web' && <Image style={{width:14, height:14, marginLeft:5, }} source={require('../../images/verify.png')}/>}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', width:'70%'}}>
                    <Text numberOfLines={1} style={{fontSize:14, color: COLORS.blue,}}>{item.category}</Text>
                    <Text style={{fontSize:13, color: 'gray', marginLeft: 5 }}>• 5</Text>
                    <Image source={require('../../images/star.png')} style={{ width: 16, height: 16, marginLeft: 3, marginTop:2}} />
                    <Image source={require('../../images/star.png')} style={{ width: 16, height: 16, marginLeft: 1, marginTop:2}} />
                    <Image source={require('../../images/star.png')} style={{ width: 16, height: 16, marginLeft: 1, marginTop:2}} />
                    <Image source={require('../../images/star.png')} style={{ width: 16, height: 16, marginLeft: 1, marginTop:2}} />
                    <Image source={require('../../images/star.png')} style={{ width: 16, height: 16, marginLeft: 1, marginTop:2}} />
                  </View>
                  {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}> */}
                    <View style={{ flexDirection: 'row' , marginRight:5}}>
                      {item.address == 'null' ? null : <>
                      <Image source={require('../../images/pin.png')} style={{ width: 18, height: 18, marginTop: 5, marginRight: 2 }} />
                      <Text numberOfLines={2} onPress={()=>openMaps(item)} style={{fontSize:12, color: COLORS.lightBlack, width:'70%' }}>{item.address || item.service_location ||item.location}</Text>
                      </>
                      }
                      <Text style={{fontSize:12, color: COLORS.lightBlack, marginRight: 5 }}>• {Math.round(item.distance)} KM </Text>
                    {/* </View> */}
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginRight: 10, alignItems:'center'}}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => 
                  makeCall(item)
                  // openCallModal(index)
                  }>
                  <Image source={require('../../images/phone.png')} style={{ width: 24, height: 24, marginRight: 20 }} />
                  <Text style={{fontSize:12, color:COLORS.blue}}>CALL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center'}} activeOpacity={0.9} onPress={() => openMessageModal(item, index)}>
                  <Image source={require('../../images/modalmsg.png')} style={{ width: 24, height: 24 }} />
                  <Text style={{fontSize:12, color:COLORS.orange}}>MESSAGE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

      </ScrollView>
      <LinearGradient
        colors={['#F55B54', '#FAAD3A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 10,
          marginHorizontal: 10,
          height: 100,
          borderRadius: 10,
          marginTop: 15,
          marginBottom: 10,
          elevation:5
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 24, color: '#fff' }}>Grow your {`\n`} Business</Text>
          <View style={{}}>
            <TouchableOpacity activeOpacity={0.8} style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#FFF', borderRadius: 8, marginLeft: 10, elevation:3 }}><Text style={{ color: '#F7754C' }}>Sign Up for Free</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('ExecutivesNumber')} activeOpacity={0.8}  style={{ paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8, alignSelf: 'center' }}><Text style={{ color: '#fff' }}>Call Us</Text></TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      {!Array.isArray(newData) &&
        <TouchableOpacity onPress={() => refRBSheet2.current.open()} style={{ alignItems: 'center', padding: 10, width: 'auto' }}>
          {/* <Animatable.Text animation="slideInDown" iterationCount={5} direction="alternate">Up and down you go</Animatable.Text> */}
          {/* <Animatable.Image animation="slideInDown" iterationCount={10} direction="alternate" style={{ height: 24, width: 24, resizeMode: 'contain',}} source={require('../../images/arrow-up.png')} /> */}
          <Image animation="slideInDown" iterationCount={5} direction="alternate" style={{ height: 24, width: 24, resizeMode: 'contain', }} source={require('../../images/arrow-up.png')} />
        </TouchableOpacity>}
      <BottomSheet draggable={false} radius={20} ref={areasheet} height={500}>
                <Text style={{ color: COLORS.black, fontSize: 22, marginLeft: 15, fontWeight: '600', paddingTop:10}}>Sub Category</Text>
                <Text style={{ borderBottomColor:'lightgray', borderBottomWidth:0.5 }}></Text>
                <ScrollView>
                {sub_category.length == '0' && <Text style={{ marginLeft: 20, color: COLORS.lightGray, marginTop:10 }}>No Sub Category Avalibale</Text>}
                    <FlatList
                        style={{}}
                        data={sub_category}
                        renderItem={({ item, index }) => {
                            const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked';
                            // alert(JSON.stringify(item,null,2))
                            return (
                                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                    setTT(index)
                                    // setOccupation(item)
                                    // setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                                    // setSubCategory('')
                                    // setTT2('')
                                    // areasheet.current.close()
                                    setUpdatedArea(item)

                                areasheet.current.close()
                                // alert(JSON.stringify(updatedArea,null,2))
                                checkVendorAvalibility(item)
                                setFilterCategory(item.title)
                                }} style={{ marginHorizontal: 20, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row',  width:'100%', justifyContent:'space-between' }}>
                                        <Text style={{ color: COLORS.black, marginLeft: 10, fontSize:16 }}>{item.title}</Text>
                                    {tt == index ? <Image style={{ height: 20, width: 20, marginRight:10 }} source={require('../../images/done.png')} /> : null}
                                    </View>
                                </TouchableOpacity>
                            )
                        }} />
                </ScrollView>
                {/* {sub_category.length != '0' && 
                  <TouchableOpacity activeOpacity={0.9} onPress={()=> {updatePlan()}}  style={{width:'80%', alignSelf:'center',  marginVertical:8}}>
                  <Text style={{color:COLORS.blue, borderColor: COLORS.blue, borderWidth:1, paddingVertical:14, fontSize:18, paddingHorizontal:20, fontFamily:'Poppins', borderRadius:10, textAlign:'center'}}>Apply</Text>
              </TouchableOpacity>
                } */}
            </BottomSheet>

      <RBSheet
        ref={refRBSheet2}
        keyboardAvoidingViewEnabled={true}
        height={height}
        animationType={'fade'}
        minClosingHeight={10}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "lightgray",
            width: 70
          },
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            minHeight: 80
          }
        }}>
        <View style={{ flexDirection: 'row', borderBottomColor: 'lightgray', borderBottomWidth: 0.5, padding: 10, alignItems:'center' }}>
          <TouchableOpacity onPress={() => {refRBSheet2.current.close()}} style={{ marginLeft: 20, alignItems: 'center',  width: '10%', padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 10}}>
            <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          </TouchableOpacity>
          <Image style={{ width: 48, height: 48, resizeMode:'contain', }} source={require('../../images/logo.png')} />
          <View>
            <Text style={{ color: COLORS.profileBlackText }}>Profile Baba Executive</Text>
            {/* <Text style={{ color: COLORS.lightGray }}>Profile Baba Executive</Text> */}
          </View>
        </View>
        {Loading &&
        <Loader status={Loading}/>  
        }
        <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                ref={flatList}
                // onContentSizeChange={()=> flatList.current.scrollToEnd()}
                onContentSizeChange={() => flatList?.current?.scrollToEnd()}
                renderItem={({ item }) => (
                    <View>
                        {/* {item.date === item.date? <Text style={{color:'black'}}>Hi</Text> : <Text style={{color:'black'}}>Hello</Text>} */}
                        <View style={{ alignItems: 'center', }}>
                            {item.type == 'day' ?
                                <Text style={{ color: 'gray', backgroundColor: '#FFF', padding: 5, borderRadius: 5 }}>{item.date}</Text> :
                                null}
                        </View>
                        {item.type == 'day' ? null :
                            <View>
                                {item.sender === 'user' ?
                                    (
                                        <View style={{ fontFamily: 'Poppins', alignItems: 'flex-end', }}>
                                            <Text style={{ color: 'white', backgroundColor: COLORS.blue, paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginVertical: 5, borderRadius: 15, borderBottomRightRadius:0 }}>{item.message}</Text>
                                            <Text style={{ color: 'gray', marginHorizontal: 10, fontSize: 10 }}>{item.time}</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={{ fontFamily: 'Poppins', alignSelf: 'flex-start', }}>
                                            {item.message == 'Share Vendor' ?
                                                // <TouchableOpacity>
                                                <Text onPress={() => {
                                                  refRBSheet2.current.close()
                                                  navigation.navigate('ExtraVendorList', item)
                                                }} style={{ color: 'white', backgroundColor: COLORS.orange, paddingHorizontal: 15, paddingVertical: 10, margin: 10, borderRadius: 15, borderTopLeftRadius:0, textDecorationLine: 'underline' }}>Avalible Vendor List</Text>
                                                // </TouchableOpacity>
                                                :
                                                <Text style={{ color: 'black', backgroundColor: '#DCDCDC', paddingHorizontal: 15, paddingVertical: 10, margin: 10, borderRadius: 15, borderTopLeftRadius:0, }}>{item.message}</Text>
                                            }
                                            <Text style={{ color: 'gray', marginHorizontal: 10, fontSize: 10 }}>{item.time}</Text>
                                        </View>
                                    )
                                }
                            </View>}

                    </View>
                )}
            />
            <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 10, marginBottom: keyboardHeight + 28, paddingHorizontal: 10 }}>
            {/* <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 10,position:'absolute', bottom:0, paddingHorizontal: 10 }}> */}
                <TextInput
                    style={styles.textInput}
                    value={EachMessages}
                    onChangeText={text => setEachMessages(text)}
                    placeholder={'Write your message here...'}
                    placeholderTextColor='lightgray'
                ></TextInput>
                <TouchableOpacity onPress={() => sendChatToAdmin()}>
                    <Image source={require('../../images/sendorange.png')} style={{ width: 48, height: 48, }} />
                </TouchableOpacity>
            </View>
      </RBSheet>
      <Modal
        visible={modalOpen}
        animationType="none"
        statusBarTranslucent
        transparent={true}
        onRequestClose={() => setModalOpen(false)}>
        <TouchableOpacity onPressOut={()=>setModalOpen(false)} style={styles.modal_View}>
          <View activeOpacity={0.8} style={styles.modelMainBox}>
            <Text style={{ color: COLORS.black, fontSize: 18,  marginLeft: 10, marginTop: 10, }}>Message via</Text>
            <Text style={{ color: COLORS.black, fontSize: 18,  marginLeft: 5,  borderBottomColor:'lightgray', borderBottomWidth:0.5 }}></Text>
            {newData[modalIndex]?.register_by == 'web' &&
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
              setModalOpen(false)
              // doMessage(newData[modalIndex])
              navigation.navigate('PersonalChat', { userDetail, client: newData[modalIndex] })
            }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
              <Image source={require('../../images/modalmsg.png')} style={{ width: 32, height: 32 }} />
              <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Chat</Text>
            </TouchableOpacity>
            }
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
              if(newData[modalIndex].contact_number != null){
                if(newData[modalIndex].contact_number.startsWith('+91')){
                  setModalOpen(false)
                  Linking.openURL(`whatsapp://send?text=&phone=${newData[modalIndex].contact_number}`)
                }else{
                  setModalOpen(false)
                  Linking.openURL(`whatsapp://send?text=&phone=+91${newData[modalIndex].contact_number}`)
                }
              }
              alert('Phone number is not avaliable')
              setModalOpen(false)
            }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
              <Image source={require('../../images/modalwhatsapp.png')} style={{ width: 32, height: 32 }} />
              <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Whats App</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
              if(newData[modalIndex].contact_number != null){
                setModalOpen(false)
                Linking.openURL(`sms:${newData[modalIndex].contact_number}?body=`)
              }
              alert('Phone number is not avaliable')
              setModalOpen(false)
            }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
              <Image source={require('../../images/modalmail.png')} style={{ width: 32, height: 32 }} />
              <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Text Message</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={modalOpen1}
        transparent={true}
        animationType="none"
        statusBarTranslucent
        key={newData.index}
        onRequestClose={() => setModalOpen1(false)}>
        <TouchableOpacity onPressOut={()=>setModalOpen1(false)} style={styles.modal_View}>
          <View activeOpacity={0.8} style={styles.modelMainBox}>
          <Text style={{ color: COLORS.black, fontSize: 18,  marginLeft: 10, marginTop: 10, }}>Call via</Text>
            <Text style={{ color: COLORS.black, fontSize: 18,  marginLeft: 5,  borderBottomColor:'lightgray', borderBottomWidth:0.5 }}></Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              // alert(JSON.stringify(newData[modalIndex],null,2))
              if(newData[modalIndex].contact_number != null){
                setModalOpen1(false)
                saveCalls(newData[modalIndex])
              }
              alert('Phone number is not avaliable')
              setModalOpen1(false)
            }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
              <Image source={require('../../images/dialerbig.png')} style={{ width: 40, height: 40 }} />
              <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Phone Dialer</Text>
            </TouchableOpacity>
            {/* {newData[modalIndex]?.register_by == 'web' &&
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              setModalOpen1(false)
              checkCallPermission()
            }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
              <Image source={require('../../images/callbig.png')} style={{ width: 40, height: 40 }} />
              <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Internet Call</Text>
            </TouchableOpacity>
            } */}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}

export default VendorList

const styles = StyleSheet.create({
  crossImage: {
    // marginTop: StatusBar.currentHeight,
    marginLeft: 10,
    alignItems: 'center',
    marginRight: 5,
    width: '10%',
    padding: 5,
    // backgroundColor: 'red',
    borderRadius: 10
  },
  textInput: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    // width: '80%',
    // paddingHorizontal: 15,
    // marginHorizontal: 10,
    // marginTop: 10,
    // position: 'absolute',
    // bottom: 0,
    // marginBottom: 10,
    marginRight: 10,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    flex: 2,
    backgroundColor: '#fff',
    borderColor: 'grey',
    color: '#000'
  },
  modal_View: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  modelMainBox: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginTop: height / 3,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Muli-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 25,
  },
})