import { StyleSheet, Text, View, StatusBar, SafeAreaView, ScrollView, Image, ActivityIndicator, TouchableOpacity, Share, Linking } from 'react-native'
import React,{useState} from 'react'
import HomeHeader from '../Components/HomeHeader'
import { COLORS } from '../Constant/Colors'
import StringsOfLanguages from '../Constant/LanguageStrings'
import Toast from 'react-native-simple-toast';
import { Api, LocalStorage } from '../services/Api'
import Modal from "react-native-modal";
import moment from 'moment'
import { BASE_URL } from '../services/Config'
import { FloatingAction } from "react-native-floating-action";

const JobDetails = ({navigation, route}) => {
  // alert(JSON.stringify(route.params,null,2))
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [jobToApply, setJobToApply] = useState();

  const saveJobs = async(item) => {
    // alert(JSON.stringify(item,null,2))
    // return
    setLoading(true)
    const value = (await LocalStorage.getUserDetail() || '')
    const user = JSON.parse(value)
    const body = {
      user_id : user._id,
      job_id : item._id
    }
    // alert(JSON.stringify(body,null,2))
    // return
    const res = await Api.savejob(body)
    setLoading(false)
    // alert(JSON.stringify(res.message,null,2))
  }

  const job_apply = async () => {
    // alert(JSON.stringify(jobToApply,null,2))
    // return
    const value = (await LocalStorage.getUserDetail() || '')
    const user = JSON.parse(value)

    if(user.activeJobs == "0"){
      alert("You have to buy our membership to apply")
    }else{
      if (jobToApply.job_status == 1) {
        alert("Already applied to this job")
      } else {
        // setJobApplyLoader(true)
        const body = {
          user_id: user._id,
          job_id: jobToApply._id
        }

        const res = await Api.jobApply(body)

        // setJobApplyLoader(false)
        navigation.goBack()
        alert(JSON.stringify(res.message, null, 2))
      }
    }
  }


  const shareJob = async() => {
    let JobID;
    JobID = `${route.params.title} Opening at  ${route.params.job_location} to find more Download our App from Playstore.`
    try {
      const result = await Share.share({
        title: 'Job Detail',
        message: `${JobID} https://play.google.com/store/apps/details?id=com.boomoverseas1`,
        // url: 'https://play.google.com/store/apps/details?id=com.boomoverseas1'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
      <HomeHeader leftIcon={require('../images/arrow.png')} menuOption={() => navigation.goBack()} title={StringsOfLanguages.jobdetails} secondRightIcon={require('../images/share.png')}  rightOption={()=> {shareJob()}}/>
        {loading ? <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <ActivityIndicator size={'large'} color={COLORS.overseaspurple}/>
          </View> :
      <ScrollView>
        <View style={{ backgroundColor: COLORS.overseaspurple, height: 160, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignSelf: 'center', fontSize: 22 }}>{route.params.title}</Text>
          {route.params.show_company_name == "1" &&
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Image style={{ width: 48, height: 48,resizeMode: 'contain' }} source={{uri : `${BASE_URL}${route.params?.company_name?.company_image?.name}`}} />
            <Text style={{ color: '#fff', marginLeft: 10 }}>{route.params?.company_name?.company_name}</Text>
          </View>}
        </View>
        <TouchableOpacity activeOpacity={1} onPress={()=>{
          if (route.params.job_status == 1) {
            // alert("You cannot apply again to this job")
          } else {
            setModalOpen(true)
            setJobToApply(route.params)
          }
        }} style={{ backgroundColor: route.params.job_status == '0' ?  'green' : 'gray', width: '45%', alignSelf: 'center', height: 50, marginTop: -25, alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 10 }}>
          <Text style={{ color: '#FFF', fontSize: 18 }}>{route.params?.job_status == '0' ? 'Apply Now' : 'Applied'}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 30 }}>
          <Text style={{ color: 'gray' }}>Job ID: {route.params?.new_job_id}</Text>
          <Text style={{ color: 'gray' }}>Posted On {moment(route.params.job_post_date).format("MMM DD, YYYY")}</Text>
        </View>
        <View style={{  marginHorizontal: 20, marginTop: 10, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10 }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Job Description</Text>
          {/* <Text style={{ color: COLORS.darkpurple, marginBottom:20 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text> */}
          <Text style={{ color: COLORS.darkpurple, marginBottom:20 }}>{route.params.job_description}</Text>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}></View>
        </View>
        <View style={{  marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10,}}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Job Details</Text>
            {/* FirstRow */}
            <View style={{ flexDirection: 'row', justifyContent:'space-between', marginBottom:8 }}>
              <View style={{ flexDirection: 'row', width:'50%' }}>
                <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ color: COLORS.darkpurple, }}>Basic Salary</Text>
                  <Text style={{ color: COLORS.darkpurple, }}>{route.params.hide_salary == "1" ? "-": `${route.params.min_salary}-${route.params.max_salary} ${route.params.sal_currancy} ${'\n'} per month`}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignSelf:'flex-start',  width:'50%' }}>
                <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ color: COLORS.darkpurple, }}>Location</Text>
                  <Text style={{ color: COLORS.darkpurple, }}>{route.params.job_location}</Text>
                </View>
              </View>
            </View>

            {/* SecondRow */}
            <View style={{ flexDirection: 'row', justifyContent:'space-between',marginBottom:8 }}>
              <View style={{ flexDirection: 'row', width:'50%' }}>
                <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ color: COLORS.darkpurple, }}>Over Time</Text>
                  <Text style={{ color: COLORS.darkpurple, }}>{route.params.overtime == "1" ? "Yes" : "No"}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row',  width:'50%'}}>
                <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ color: COLORS.darkpurple, }}>Food</Text>
                  <Text style={{ color: COLORS.darkpurple, }}>{route.params.food == "1" ? "Yes" : "No"}</Text>
                </View>
              </View>
            </View>

            {/* ThirdRow */}
            {/* <View style={{ flexDirection: 'row' , }}>
              <View style={{ flexDirection: 'row',  }}>
                <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ color: COLORS.darkpurple, }}>Experience</Text>
                  <Text style={{ color: COLORS.darkpurple, }}>{route.params.exp} per month</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginLeft:50}}>
                <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ color: COLORS.darkpurple, }}>Duty Hour</Text>
                  <Text style={{ color: COLORS.darkpurple, }}>{route.params.exp}</Text>
                </View>
              </View>
            </View> */}
            <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
              <View style={{ flexDirection: 'row', width:'50%'  }}>
                <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
                <View style={{ marginLeft: 5 }}>
                <Text style={{ color: COLORS.darkpurple, }}>Experience</Text>
                  {/* <Text style={{ color: COLORS.darkpurple, }}>{route.params.exp}</Text> */}
                  <Text style={{ color: COLORS.darkpurple, }}>{route.params.is_min_exp == 1 ? `${route.params.exp}` : "No Exp Require"}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', width:'50%'  }}>
                <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
                <View style={{ marginLeft: 5 }}>
                <Text style={{ color: COLORS.darkpurple, }}>Duty Hour</Text>
                  <Text style={{ color: COLORS.darkpurple, }}>{route.params.duty_hour_day} Hrs per day</Text>
                  <Text style={{ color: COLORS.darkpurple, }}>{route.params.duty_hour_week} days per week</Text>
                </View>
              </View>
            </View>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5 , marginTop:20}}></View>
        </View>
        <View style={{  marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10 }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>No. of Vacancies</Text>
          <Text style={{ color: COLORS.darkpurple, marginBottom:20, fontWeight:'bold'  }}>{route.params.vacancy} Vacancies</Text>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}></View>
        </View>
        <View style={{ marginHorizontal: 20,  paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10 }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Skill Required</Text>
          {route.params.job_skill.map((i)=> (
            <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10 }}>{i}</Text>
          </View>
          ))}
          {/* <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
          </View> */}
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}></View>
        </View>
        <View style={{ marginHorizontal: 20,  paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10 }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Education</Text>
          {route.params.education_require.map((i)=> (
            <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10 }}>{i}</Text>
          </View>
          ))}
          {/* <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, }}>UG:</Text>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10, fontWeight:'bold' }}>B.Tech/B.E - Any Specialization</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20,  }}>PG:</Text>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10,fontWeight:'bold'  }}>Any Postgraduate - Any Specialization</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20,  }}>Doctorate:</Text>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10,fontWeight:'bold'  }}>Any Postgraduate - Any Specialization</Text>
          </View> */}
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}></View>
        </View>
        {/* <View style={{  marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10, }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Interview Location</Text>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10, fontWeight:'bold'}}>Delhi</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{ color: COLORS.darkpurple, fontSize: 16, marginBottom: 10 }}>GRC Trade Center</Text>
            <Text style={{ color: COLORS.darkpurple, fontSize: 14, marginBottom: 10 }}>Directions</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{width:'60%', color: COLORS.lightGray, fontSize: 16, marginBottom: 10 }}>A-25, 204,204 Jyoti Bhawan, Commercial Complex, New Delhi 110009</Text>
            <Image source={require('../images/map.png')} style={{width:100, height:100}}/>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{ color: COLORS.darkpurple, fontSize: 16, }}>Phone</Text>
            <Text style={{ color: COLORS.darkpurple, fontSize: 14, }}>View All Trade Center</Text>
          </View>
          <Text style={{ color: COLORS.darkpurple, fontSize: 16, marginBottom: 10, fontWeight:'bold' }}>+91 9876543210</Text>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}></View>
        </View> */}
      </ScrollView>}
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
              // job_apply(jobToApply)
              job_apply()
              }} style={{backgroundColor:'#2EB800', height:45, width:130, borderRadius:25, justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'#FFF', fontSize:18, fontWeight:'900'}}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default JobDetails

const styles = StyleSheet.create({
  modal_View: {
    backgroundColor: '#000000aa',
    flex: 1,
},
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