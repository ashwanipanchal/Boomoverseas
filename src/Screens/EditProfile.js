import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../Constant/Colors'
import HeaderTop from '../Components/HeaderTop'
import { TextInput } from 'react-native-paper'
import { ButtonStyle } from '../Custom/CustomView'
import { Api } from '../services/Api'
const { height } = Dimensions.get('window');
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment/moment'
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker, { types } from 'react-native-document-picker';
import Modal from "react-native-modal";
import Textarea from 'react-native-textarea';
import { BASE_URL } from '../services/Config'

const EditProfile = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params,null,2))
    const [number, setNumber] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [profilePic, setProfilePic] = useState(route.params.user.profile_pic?.name.length > "0" ? `${BASE_URL}${route.params.user.profile_pic.name}`:"")
    const [name, setName] = useState(route.params.user.firstName)
    const [lname, setLName] = useState(route.params.user.lastName)
    const [fatherName, setFatherName] = useState(route.params.user?.fatherName)
    const [trade, setTrade] = useState(route.params.user?.trade)
    const [workExp, setWorkExp] = useState(route.params.user?.exp)
    const [foreignExp, setforeignExp] = useState(route.params.user?.foreignExp)
    const [qualification, setQualification] = useState(route.params.user?.qualification)
    const [techQualification, setTechQualification] = useState(route.params.user?.techQualification)
    const [passport, setPassport] = useState(route.params.user?.passport)
    const [summary, setSummary] = useState(route.params.user?.summary)
    const [address, setAddress] = useState(route.params.user?.address)
    const [city, setcity] = useState(route.params.user?.city)
    const [state, setState] = useState(route.params.user?.state)
    const [modalOpen, setModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(route.params.user?.dob)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const data = [
        {
            icon: require('../images/marketing.png'),
            title: 'Marketing'
        },
        {
            icon: require('../images/const.png'),
            title: 'Construction'
        },
        {
            icon: require('../images/manu.png'),
            title: 'Manufacture'
        },
        {
            icon: require('../images/oil.png'),
            title: 'Oil & Gas'
        },
        {
            icon: require('../images/hospitality.png'),
            title: 'Hospitality'
        },
        {
            icon: require('../images/it.png'),
            title: 'IT'
        },
        {
            icon: require('../images/account.png'),
            title: 'Accounting'
        },
        {
            icon: require('../images/bank.png'),
            title: 'Banking'
        },
        {
            icon: require('../images/engineer.png'),
            title: 'Engineering'
        },
        {
            icon: require('../images/fin.png'),
            title: 'Finance'
        },
        {
            icon: require('../images/medical.png'),
            title: 'Medical'
        },
        {
            icon: require('../images/manage.png'),
            title: 'Management'
        },
    ]

    useEffect(()=>{
        getCategory()
    },[])
    const getCategory = async() => {
        const ct = await Api.getcategory()
        setCategoryList(ct.data)
    }

    const updateProfile = async () => {
        setIsLoading(true)
        const body = {
            firstName: name,
            lastName: lname,
            fatherName: fatherName,
            dob: date,
            exp: workExp,
            foreignExp:foreignExp,
            qualification: qualification,
            techQualification: techQualification,
            passport,
            city,
            state,
            address,
            summary

        }
        // alert(JSON.stringify(body,null,2))
        // return
        const res = await Api.updateUserProfile(body)
        const { status } = res;
        if (status) {
            setIsLoading(false)
            alert("Profile Updated")
        }
    }

    const getPassport = async(item) => {
        try {
          const response = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
          })
            if(response){
              console.log("document picker response ==", response)
                
              setIsLoading(true)
              setProfilePic(response.uri)
              var formData = new FormData()
              formData.append('profile_pic',{
                uri: response.uri,
                type: response.type,
                name: response.name,
              })

              const uploadres = await Api.updateDP(formData)
            //   alert(JSON.stringify(uploadres,null,2))
              const {status} = uploadres
              if(status){
                setIsLoading(false)
                alert("Image Uploaded")
              }else{
                setIsLoading(false)
                alert("Image Failed To Uploaded, Try Again")
              }
            //   if(item == "1"){
            //     // alert(JSON.stringify(response,null,2))
            //     setPassport1Full(response)
            //     setPassport1(response.uri)
            //   }else if (item == "2"){
            //     setPassport2Full(response)
            //     setPassport2(response.uri)
            //   }else if(item == "3"){
            //     setResumeFull(response)
            //     setResume(response.uri)
            //   }
            }
        } catch (error) {
            setIsLoading(false)
          console.log(error)
        }
      }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate(date)
        hideDatePicker();
      };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
            <HeaderTop back={() => navigation.goBack()} title={"Edit Profile"} />
            <ScrollView
                keyboardShouldPersistTaps='always'>
                <View style={{ backgroundColor: COLORS.overseaspurple, height: 120 }}></View>
                <TouchableOpacity  onPress={()=> getPassport()}>
                    <Image source={profilePic ? {uri : profilePic} : require('../images/profile.png')} style={{ alignSelf: 'center', marginTop: -60, width: 140, height: 140, borderRadius:70 }} />
                    <Image source={require('../images/edit.png')} style={{height:20, width:20, position:'relative', top:-140, left: 240,}}/>
                </TouchableOpacity>

                <TextInput
                    label="FIRST NAME"
                    value={name}
                    underlineColor={COLORS.overseaspurple}
                    activeUnderlineColor={COLORS.overseaspurple}
                    style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                    Outlined={'disabled'}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label="LAST NAME"
                    value={lname}
                    underlineColor={COLORS.overseaspurple}
                    activeUnderlineColor={COLORS.overseaspurple}
                    style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                    Outlined={'disabled'}
                    onChangeText={text => setLName(text)}
                />
                <TextInput
                    label="FATHER'S NAME"
                    value={fatherName}
                    underlineColor={COLORS.overseaspurple}
                    activeUnderlineColor={COLORS.overseaspurple}
                    style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                    Outlined={'disabled'}
                    onChangeText={text => setFatherName(text)}
                />
                {/* <TextInput
                  label="DATE OF BIRTH"
                  value={number}
                  underlineColor={COLORS.overseaspurple}
                  activeUnderlineColor={COLORS.overseaspurple}
                  style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                  Outlined={'disabled'}
                  onChangeText={text => setNumber(text)}
              /> */}
                <View style={{ marginHorizontal: 20, color: COLORS.overseaspurple, borderBottomWidth: 1, paddingBottom: 8, marginTop: 5, justifyContent: 'space-between', }}>
                    <Text style={{ marginHorizontal: 10, color: 'gray', fontSize: 12 }}>DATE OF BIRTH</Text>
                        {/* <DatePicker
                            modal
                            open={dateModal}
                            mode={"date"}
                            date={date}
                            onConfirm={(date) => {
                                setDateModal(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setDateModal(false)
                            }}
                        /> */}
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        maximumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <TouchableOpacity onPress={() => showDatePicker(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }}>
                        <Text style={{ color: '#000', fontSize: 18 }}>{moment(date).format("DD/MM/YYYY")}</Text>
                        {/* <Image source={require('../images/dropdown.png')} style={{ width: 24, width: 24, resizeMode: 'contain', alignSelf: 'flex-end' }} /> */}
                    </TouchableOpacity>
                </View>
                {/* <View style={{ marginHorizontal: 20, color: COLORS.overseaspurple, borderBottomWidth: 1, paddingBottom: 20, marginTop: 5, justifyContent: 'space-between', }}>
                    <Text style={{ marginHorizontal: 10, color: 'gray', fontSize: 12 }}>SELECT INDUSTRY</Text>
                    <TouchableOpacity onPress={() => setModalOpen(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }}>
                        <Text style={{ color: '#000', fontSize: 18 }}>IT</Text>
                        <Image source={require('../images/dropdown.png')} style={{ width: 24, width: 24, resizeMode: 'contain', alignSelf: 'flex-end' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 20, color: COLORS.overseaspurple, borderBottomWidth: 1, paddingBottom: 20, marginTop: 10, justifyContent: 'space-between', }}>
                    <Text style={{ marginHorizontal: 10, color: 'gray', fontSize: 12 }}>SELECT CATEGORY</Text>
                    <TouchableOpacity onPress={() => setModalOpen(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }}>
                        <Text style={{ color: '#000', fontSize: 18 }}>IT</Text>
                        <Image source={require('../images/dropdown.png')} style={{ width: 24, width: 24, resizeMode: 'contain', alignSelf: 'flex-end' }} />
                    </TouchableOpacity>
                </View> */}
                <View style={{ marginHorizontal: 20, color: COLORS.overseaspurple, borderBottomWidth: 1, paddingBottom: 10, marginTop: 10, justifyContent: 'space-between', }}>
                    <Text style={{ marginHorizontal: 10, color: 'gray', fontSize: 12 }}>SELECT TRADE</Text>
                    <TouchableOpacity onPress={() => setModalOpen(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }}>
                        <Text style={{ color: '#000', fontSize: 18 }}>{trade}</Text>
                        <Image source={require('../images/dropdown.png')} style={{ width: 24, width: 24, resizeMode: 'contain', alignSelf: 'flex-end' }} />
                    </TouchableOpacity>
                </View>
                <TextInput
                    label="WORK EXPERIENCE (YEARS)"
                    value={workExp}
                    underlineColor={COLORS.overseaspurple}
                    activeUnderlineColor={COLORS.overseaspurple}
                    keyboardType="number-pad"
                    maxLength={2}
                    style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                    Outlined={'disabled'}
                    onChangeText={text => setWorkExp(text)}
                />
                <TextInput
                    label="FOREIGN EXPERIENCE (YEARS)"
                    value={foreignExp}
                    underlineColor={COLORS.overseaspurple}
                    activeUnderlineColor={COLORS.overseaspurple}
                    keyboardType="number-pad"
                    maxLength={2}
                    style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                    Outlined={'disabled'}
                    onChangeText={text => setforeignExp(text)}
                />
                <TextInput
                    label="EDUCATION QUALIFICATION"
                    value={qualification}
                    underlineColor={COLORS.overseaspurple}
                    activeUnderlineColor={COLORS.overseaspurple}
                    style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                    Outlined={'disabled'}
                    onChangeText={text => setQualification(text)}
                />
                <TextInput
                    label="TECHNICAL QUALIFICATION"
                    value={techQualification}
                    underlineColor={COLORS.overseaspurple}
                    activeUnderlineColor={COLORS.overseaspurple}
                    style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                    Outlined={'disabled'}
                    onChangeText={text => setTechQualification(text)}
                />
                <TextInput
                    label="ADDRESS"
                    value={address}
                    underlineColor={COLORS.overseaspurple}
                    activeUnderlineColor={COLORS.overseaspurple}
                    style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                    Outlined={'disabled'}
                    onChangeText={text => setAddress(text)}
                />
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TextInput
                        label="CITY"
                        value={city}
                        underlineColor={COLORS.overseaspurple}
                        activeUnderlineColor={COLORS.overseaspurple}
                        style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20, width: '43%' }}
                        Outlined={'disabled'}
                        onChangeText={text => setcity(text)}
                    />
                    <TextInput
                        label="STATE"
                        value={state}
                        underlineColor={COLORS.overseaspurple}
                        activeUnderlineColor={COLORS.overseaspurple}
                        style={{ marginBottom: 10, backgroundColor: '#F5F5F5', width: '43%', }}
                        Outlined={'disabled'}
                        onChangeText={text => setState(text)}
                    />
                </View>
                <TextInput
                    label="PASSPORT NUMBER"
                    value={passport}
                    underlineColor={COLORS.overseaspurple}
                    activeUnderlineColor={COLORS.overseaspurple}
                    style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                    Outlined={'disabled'}
                    onChangeText={text => setPassport(text)}
                />
                <Text style={{ marginHorizontal: 10, color: 'gray', fontSize: 12, marginLeft:30, marginBottom:12, marginTop:14 }}>SUMMARY</Text>
                <View style={styles.container}>
                <Textarea
                    containerStyle={styles.textareaContainer}
                    style={styles.textarea}
                    onChangeText={(text) =>  setSummary(text)}
                    defaultValue={summary}
                    maxLength={200}
                    placeholder={'Enter Summary...'}
                    placeholderTextColor={'#c7c7c7'}
                    underlineColorAndroid={'transparent'}
                />
                </View>
                {/* <View style={{ marginHorizontal: 20, color: COLORS.overseaspurple, borderBottomWidth: 0.9, paddingBottom: 20, marginTop: 5, justifyContent: 'space-between', }}>
                    <Text style={{ marginHorizontal: 10, color: 'gray', fontSize: 12 }}>LANGUAGE KNOWN </Text>
                    <View style={{flexDirection:'row', marginTop:5}}>
                        <View style={{flexDirection:'row', alignItems:'center', marginRight:10}}>
                        <CheckBox
                            tintColors={{ true: COLORS.overseaspurple, false: COLORS.overseaspurple }}
                            onFillColor={COLORS.overseaspurple}
                            disabled={false}
                            onAnimationType='fill'
                            offAnimationType='fade'
                            boxType='square'
                            value={toggleCheckBox}
                            onValueChange={(newValue) =>alert(newValue) }
                        />
                        <Text style={{color: COLORS.overseaspurple, fontSize:16}}>English</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                        <CheckBox
                            tintColors={{ true: COLORS.overseaspurple, false: COLORS.overseaspurple }}
                            onFillColor={COLORS.overseaspurple}
                            disabled={false}
                            onAnimationType='fill'
                            offAnimationType='fade'
                            boxType='square'
                            value={toggleCheckBox}
                            onValueChange={(newValue) => alert(newValue)}
                        />
                        <Text style={{color: COLORS.overseaspurple, fontSize:16}}>Hindi</Text>
                        </View>
                        
                    </View>
                </View> */}
                
                <View style={{ width: '100%', marginBottom: 20, marginTop: 30 }}>
                    <ButtonStyle
                        title={"Update"}
                        //   height={52}
                        bgColor={'#261750'}
                        loader={isLoading}
                        onPress={() => {
                            updateProfile()
                        }}
                    />
                </View>
            </ScrollView>
            <Modal
                visible={modalOpen} onBackdropPress={()=>{setModalOpen(false)}}>
                <View style={styles.modelMainBox}>
                <View style={{ backgroundColor: COLORS.darkpurple, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Choose Industry</Text>
                            <TouchableOpacity onPress={() => setModalOpen(false)}>
                                <Image source={require('../images/check.png')} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={categoryList}
                            renderItem={({ item }) => (
                                <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingLeft: 20, borderBottomColor: 'gray', borderBottomWidth: 0.5, }}>
                                    <Image source={item.icon} style={{ width: 32, height: 32 }} />
                                    <Text style={{ color: 'gray', fontSize: 18, marginLeft: 10, }}>{item.title}</Text>
                                </TouchableOpacity>
                            )}
                        />
                </View>
                {/* <TouchableOpacity style={styles.modelMainBox}>
                    <View activeOpacity={0.8} style={styles.modelMainBox}>
                        <View style={{ backgroundColor: COLORS.darkpurple, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Choose Industry</Text>
                            <TouchableOpacity onPress={() => setModalOpen(false)}>
                                <Image source={require('../images/check.png')} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={categoryList}
                            renderItem={({ item }) => (
                                <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingLeft: 20, borderBottomColor: 'gray', borderBottomWidth: 0.5, }}>
                                    <Image source={item.icon} style={{ width: 32, height: 32 }} />
                                    <Text style={{ color: 'gray', fontSize: 18, marginLeft: 10, }}>{item.title}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity> */}
            </Modal>
        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    modelMainBox: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 10,
    },
    text: {
        fontFamily: 'Muli-Bold',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333333',
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 25,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: "#FFF",
        borderColor:COLORS.overseaspurple,
        borderWidth:1
      },
      textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: COLORS.overseaspurple,
      },
})