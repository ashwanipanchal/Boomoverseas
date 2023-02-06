import { SafeAreaView, StatusBar, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import { Api, LocalStorage } from '../services/Api'
import { useIsFocused } from '@react-navigation/native';
import Modal from "react-native-modal";
import { BASE_URL } from '../services/Config'
import moment from 'moment'

const RecommendedJobs = ({navigation}) => {
  const focus = useIsFocused()
    const [list, setList] = useState([])
    const [jobToApply, setJobToApply] = useState();
    const [user, setUser] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [jobApplyLoader, setJobApplyLoader] = useState(false);
    useEffect(()=>{
      getProfile()
        getNews()
    },[focus == true])

    const getProfile = async() => {
      const jj = (await LocalStorage.getUserDetail() || "")
      const user2 = JSON.parse(jj)
  
      const body = {
        "number" : user2.number
      }
      const user = await Api.getProfile(body)
      // alert(JSON.stringify(user,null,2))
      setUser(user)
    }

    const getNews = async()=>{
        const res = await Api.getJobs()
        // alert(JSON.stringify(res,null,2))
        const {status} = res
        if(status){
            setList(res.data)
        }
    }

    const job_apply = async (item) => {

      // alert(JSON.stringify(user,null,2))
      // return
      if(user.user.activeJobs <= "0"){
        alert("You have to buy our membership to apply")
      }else{
        if (item.job_status == 1) {
          alert("Already applied to this job")
        } else {
          setJobApplyLoader(true)
          const body = {
            user_id: user.user._id,
            job_id: item._id
          }
  
          const res = await Api.jobApply(body)
  
          setJobApplyLoader(false)
          getNews()
          alert(JSON.stringify(res.message, null, 2))
        }
      }
    }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
    <HeaderTop back={() => navigation.goBack()} title={'Recommended Jobs'} />
    <FlatList
          data={list}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate("JobDetails", item)} style={{ backgroundColor: '#FFF', marginHorizontal: 16, marginVertical: 10, paddingTop: 10,  borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, elevation:5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal: 10, }}>
                <Image source={{uri : `${BASE_URL}${item?.company_name?.company_image?.name}`}} style={{ marginRight: 10, resizeMode: 'contain', width: 52, height: 52 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.darkpurple, fontSize: 16, fontWeight: '700' }}>{item.title}</Text>
                  <Text style={{ color: 'green', fontSize: 16 }}>{item.show_company_name == "1" ? item.company_name?.company_name: ""}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
                    <Text style={{ color: COLORS.darkpurple, fontSize: 12, color: 'gray' }}>Job ID: {item.new_job_id}</Text>
                    <Text style={{ color: COLORS.darkpurple, fontSize: 12, color: 'gray' }}>Posted On {moment(item.job_post_date).format("MMM DD, YYYY")}</Text>
                  </View>
                </View>
                {/* {likeLoading ? <ActivityIndicator size={'small'}/> : */}
                {/* <TouchableOpacity onPress={() => saveJobs(item)}>
                  <Image source={item.saved == "0" ? require('../images/fav1.png') :  require('../images/fav.png')} style={{ marginRight: 10, resizeMode: 'contain', width: 24, height: 24 }} />
                </TouchableOpacity> */}
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems:'center',paddingHorizontal: 10, marginLeft:10 }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={require('../images/basicsalary.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 10 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Basic Salary</Text>
                    <Text style={{ color: 'gray' }}>{item.hide_salary == "1" ? "-": `${item.min_salary}-${item.max_salary}${'\n'} ${item.sal_currancy}`}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={require('../images/dailyhour.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 10 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Duty Hours</Text>
                    <Text style={{ color: 'gray' }}>{item.duty_hour_day} Hours</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={require('../images/overtime.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 10 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Overtime</Text>
                    <Text style={{ color: 'gray' }}>{item.overtime == "1"? "Yes" : "No"}</Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 ,paddingHorizontal: 10,marginLeft:10}}>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={require('../images/food.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 10 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Food</Text>
                    <Text style={{ color: 'gray' }}>{item.food == "1" ? "Yes": "No"}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={require('../images/experience.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 10 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Experience</Text>
                    <Text style={{ color: 'gray' }}>{item.is_min_exp == 1 ? `${item.exp}` : "-"}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={require('../images/location.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 10 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>location</Text>
                    <Text style={{ color: 'gray' }}>{item.job_location}</Text>
                  </View>
                </View>
              </View>
              {/* <TouchableOpacity onPress={()=>job_apply(item)} style={{ backgroundColor: item.job_status == 1 ? 'green' : COLORS.overseaspurple, justifyContent: 'center', alignItems: 'center', height: 42, marginTop: 16, borderBottomRightRadius:10, borderBottomLeftRadius:10, elevation:5 }}>
                {jobApplyLoader ? <ActivityIndicator size={'small'}/> :
                <Text style={{ color: '#fff', fontSize: 18 }}>{item.job_status == 1 ? 'APPLIED' : 'APPLY'}</Text>}
              </TouchableOpacity> */}
              <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                if (item.job_status == 1) {
                  // alert("You cannot apply again to this job")
                } else {
                  setModalOpen(true)
                  setJobToApply(item)
                }
                }} style={{ backgroundColor: item.job_status == 1 ? 'green' : COLORS.overseaspurple, justifyContent: 'center', alignItems: 'center', height: 42, marginTop: 16, borderBottomRightRadius:10, borderBottomLeftRadius:10, elevation:5 }}>
                {jobApplyLoader ? <ActivityIndicator size={'small'}/> :
                <Text style={{ color: '#fff', fontSize: 18 }}>{item.job_status == 1 ? 'APPLIED' : 'APPLY'}</Text>}
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

<Modal isVisible={modalOpen} onBackdropPress={()=>{setModalOpen(false)}}>
        <View style={styles.modelMainBox}>
        <Image source={require('../images/question.png')} style={{height:70, width:70, resizeMode:'contain', alignSelf:'center', marginTop:25}}/>
          <Text style={styles.text}>
            Are You Sure You Want To {`\n`} Apply For This Job
          </Text>
          <View style={{flexDirection:'row', justifyContent:'center', marginTop:36, marginBottom:30}}>
            <TouchableOpacity onPress={()=>setModalOpen(false)} style={{backgroundColor:'#D82E3D', height:45, width:130, borderRadius:25, justifyContent:'center', alignItems:'center', marginRight:10}}>
              <Text style={{color:'#FFF', fontSize:18, fontWeight:'900'}}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              setModalOpen(false)
              job_apply(jobToApply)
              }} style={{backgroundColor:'#2EB800', height:45, width:130, borderRadius:25, justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'#FFF', fontSize:18, fontWeight:'900'}}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default RecommendedJobs

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
})