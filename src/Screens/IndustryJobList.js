import { StyleSheet, Text, View , SafeAreaView, StatusBar, FlatList, TouchableOpacity,Image, ActivityIndicator } from 'react-native'
import React,{useState, useEffect} from 'react'
import { COLORS } from '../Constant/Colors'
import HomeHeader from '../Components/HomeHeader'
import StringsOfLanguages from '../Constant/LanguageStrings'
import { Api, LocalStorage } from '../services/Api'
import { BASE_URL } from '../services/Config'
import moment from 'moment'
import Modal from "react-native-modal";
import PushNotification from 'react-native-push-notification'

const IndustryJobList = ({navigation, route}) => {
  // alert(JSON.stringify(route.params,null,2))
  const [list, setList] = useState([])
  const [jobToApply, setJobToApply] = useState();
  const [jobApplyLoader, setJobApplyLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(()=>{
    getList()
  },[])

  const getList = async()=> {
    const body = {
      title: route.params.id
    }
    const res = await Api.jobCategoryWise(body)
    // alert(JSON.stringify(res.data,null,2))
    const {status} = res
    if(status){
      setList(res.data.reverse())
    }
  }
    const jobs = [
        {
          jobIcon: require('../images/jobicon.png'),
          jobTitle: 'Urgent requirement of Neurologist',
          hospitalName: 'Max Hospital',
          id: 'Job ID - IND1234',
          postDate: 'Posted On Jan 12, 2022',
          salaryIcon: require('../images/basicsalary.png'),
          dailyHour: require('../images/dailyhour.png'),
          overtime: require('../images/overtime.png'),
          food: require('../images/food.png'),
          experience: require('../images/experience.png'),
          location: require('../images/location.png'),
        },
        {
          jobIcon: require('../images/jobicon.png'),
          jobTitle: 'Urgent requirement of Neurologist',
          hospitalName: 'Max Hospital',
          id: 'Job ID - IND1234',
          postDate: 'Posted On Jan 12, 2022',
          salaryIcon: require('../images/basicsalary.png'),
          dailyHour: require('../images/dailyhour.png'),
          overtime: require('../images/overtime.png'),
          food: require('../images/food.png'),
          experience: require('../images/experience.png'),
          location: require('../images/location.png'),
        },
        {
          jobIcon: require('../images/jobicon.png'),
          jobTitle: 'Urgent requirement of Neurologist',
          hospitalName: 'Max Hospital',
          id: 'Job ID - IND1234',
          postDate: 'Posted On Jan 12, 2022',
          salaryIcon: require('../images/basicsalary.png'),
          dailyHour: require('../images/dailyhour.png'),
          overtime: require('../images/overtime.png'),
          food: require('../images/food.png'),
          experience: require('../images/experience.png'),
          location: require('../images/location.png'),
        },
        {
          jobIcon: require('../images/jobicon.png'),
          jobTitle: 'Urgent requirement of Neurologist',
          hospitalName: 'Max Hospital',
          id: 'Job ID - IND1234',
          postDate: 'Posted On Jan 12, 2022',
          salaryIcon: require('../images/basicsalary.png'),
          dailyHour: require('../images/dailyhour.png'),
          overtime: require('../images/overtime.png'),
          food: require('../images/food.png'),
          experience: require('../images/experience.png'),
          location: require('../images/location.png'),
        },
        {
          jobIcon: require('../images/jobicon.png'),
          jobTitle: 'Urgent requirement of Neurologist',
          hospitalName: 'Max Hospital',
          id: 'Job ID - IND1234',
          postDate: 'Posted On Jan 12, 2022',
          salaryIcon: require('../images/basicsalary.png'),
          dailyHour: require('../images/dailyhour.png'),
          overtime: require('../images/overtime.png'),
          food: require('../images/food.png'),
          experience: require('../images/experience.png'),
          location: require('../images/location.png'),
        },
        {
          jobIcon: require('../images/jobicon.png'),
          jobTitle: 'Urgent requirement of Neurologist',
          hospitalName: 'Max Hospital',
          id: 'Job ID - IND1234',
          postDate: 'Posted On Jan 12, 2022',
          salaryIcon: require('../images/basicsalary.png'),
          dailyHour: require('../images/dailyhour.png'),
          overtime: require('../images/overtime.png'),
          food: require('../images/food.png'),
          experience: require('../images/experience.png'),
          location: require('../images/location.png'),
        },
      ]

      const job_apply = async (item) => {
        const jj = (await LocalStorage.getUserDetail() || "")
        const user2 = JSON.parse(jj)
        // alert(JSON.stringify(user2,null,2))
        // return
        if(user2.activeJobs == "0"){
          alert("You have to buy our membership to apply")
        }else{
          if (item.job_status == 1) {
            alert("Already applied to this job")
          } else {
            setJobApplyLoader(true)
            const body = {
              user_id: user2._id,
              job_id: item._id
            }
    
            const res = await Api.jobApply(body)
    
            setJobApplyLoader(false)
            getList()
            alert(JSON.stringify(res.message, null, 2))
            PushNotification.localNotification({
              /* Android Only Properties */
              channelId: "12", // (required) channelId, if the channel doesn't exist, notification will not trigger.
              ticker: "My Notification Ticker", // (optional)
              showWhen: true, // (optional) default: true
              autoCancel: true, // (optional) default: true
              largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
              largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
              smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
              bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
              subText: "This is a subText", // (optional) default: none
              bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
              bigLargeIcon: "ic_launcher", // (optional) default: undefined
              bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
              color: "red", // (optional) default: system default
              vibrate: true, // (optional) default: true
              vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
              tag: "some_tag", // (optional) add tag to message
              group: "group", // (optional) add group to message
              groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
              ongoing: false, // (optional) set whether this is an "ongoing" notification
              priority: "high", // (optional) set notification priority, default: high
              visibility: "private", // (optional) set notification visibility, default: private
              ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
              shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
              onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
              
              when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
              usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
              timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
            
              messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
            
              actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
              invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
            
              /* iOS only properties */
              category: "", // (optional) default: empty string
              subtitle: "My Notification Subtitle", // (optional) smaller title below notification title
            
              /* iOS and Android properties */
              id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
              title: "Job Applied Successfully", // (optional)
              message: "Job Applied Successfully", // (required)
              picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
              userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
              playSound: false, // (optional) default: true
              soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
              number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
              repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
            });
          }
        }
      }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
    <HomeHeader leftIcon={require('../images/arrow.png')} menuOption={() => navigation.goBack()} title={route.params.title} secondRightIcon={require('../images/searchwhite.png')} rightOption={() => navigation.navigate('Search')} />
    {list.length > "0" ?
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
                <Image source={item.favIcon} style={{ marginRight: 10, resizeMode: 'contain', width: 24, height: 24 }} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems:'center',paddingHorizontal: 10, marginLeft:10}}>
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 ,paddingHorizontal: 10, marginLeft:10}}>
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
        /> : 
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Text style={{textAlign:'center', color:COLORS.overseaspurple}}>No Jobs Found</Text>
        </View> }

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

export default IndustryJobList

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