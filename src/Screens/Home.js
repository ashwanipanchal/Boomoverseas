import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, } from 'react-native'
import React,{useState, useEffect} from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import HomeHeader from '../Components/HomeHeader'
import StringsOfLanguages from '../Constant/LanguageStrings'
import { Api, LocalStorage } from '../services/Api'
import { BASE_URL } from '../services/Config'
import { useIsFocused } from '@react-navigation/native';
import { AnimatedCircularProgress, Circle } from 'react-native-circular-progress';
const { height , width} = Dimensions.get('window');
import Modal from "react-native-modal";
import Swiper from 'react-native-swiper';
import PushNotification from "react-native-push-notification";
import moment from 'moment'
import Carousel from 'react-native-banner-carousel';

const Home = ({ navigation }) => {
  const focus = useIsFocused()
  const [jobsList, setJobList] = useState([]);
  const [user, setUser] = useState();
  const [jobToApply, setJobToApply] = useState();
  const [circleFill, setCircleFill] = useState("");
  const [jobApplyLoader, setJobApplyLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [list ,setList] = useState([])
  const [banner ,setBanner] = useState([])
  const [autoplay, setAutoPlay] = useState(true)
  useEffect(()=>{
    // setScreenLoader(true)
    getProfile()
    getjobs()
    getCategory()
    // setScreenLoader(false)
  },[focus == true])

  const getProfile = async() => {
    const user = await Api.getProfile()
    setUser(user)
    setBanner(user.banner)
    const fields = Object.keys(user.user)
    // alert(JSON.stringify(fields,null,2))
    // Object.keys(user.user).forEach((i) => {
    //   // console.log(i)
    // });
    let count = 0
    for (const key in fields) {
      count++
    }
    const totalFields = 29;
    const per = count/totalFields*100
    setCircleFill(per)
  }
  const getCategory = async() => {
    const response = await Api.getcategory()
    response.data.splice(0, 0, { "title": "All Categories", "icon" : "require('../images/home.png')"})
    setList(response.data)
  }
  const getjobs = async() => {
    const response = await Api.getJobs()
    const {status, data} = response;
    if(status){
      setJobList(data)
    }
  }

  const catagories = [
    {
      title: 'All Categories',
      icon: require('../images/home.png')
    },
    {
      title: 'HR',
      icon: require('../images/hricon.png')
    },
    {
      title: 'Sales',
      icon: require('../images/salesicon.png')
    },
    {
      title: 'Internet Marketing',
      icon: require('../images/marketingicon.png')
    },
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




  const moreCategories = async(item) => {
    if(item.title == 'All Categories'){
      navigation.navigate('Industry')
    }else{
      navigation.navigate('IndustryJobList', {title: item.title, id:item._id})
    }
  }

  const job_apply = async (item) => {
    // alert(JSON.stringify(user,null,2))
    // return
    if(user.user.activeJobs <= "0"){
      alert("You have to buy our membership to apply")
      return
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
        getProfile()
        getjobs()
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

  const saveJobs = async (item) => {
    const value = (await LocalStorage.getUserDetail() || '')
    const user = JSON.parse(value)

    if (item.saved == "0") {
      const body = {
        user_id: user._id,
        job_id: item._id
      }
      const res = await Api.savejob(body)
      const{success} = res;
      if(success){
        getjobs()
      }else{
        getjobs()
      }
    } else {
      // alert('else')
      const body = {
        user_id: user._id,
        job_id: item._id
      }
      const res = await Api.removejob(body)
      const{success} = res;
      if(success){
        setLikeLoading(false)
        getjobs()
      }else{
        setLikeLoading(false)
        getjobs()
      }
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
      <HomeHeader leftIcon={require('../images/menu.png')} menuOption={() => navigation.openDrawer()} title={user?.user?.firstName} firstRightIcon={require('../images/searchwhite.png')} secondRightIcon={require('../images/bell.png')} leftOption={() => navigation.navigate('Search')} rightOption={() => navigation.navigate('Notification')} />
      {screenLoader ? <ActivityIndicator size={'large'}/>:
      <ScrollView>
          <Carousel
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={width}
          >
            {banner.map((i) => (
              <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate("JobDetails", i.title)}>
                <Image source={{ uri: i.icon }} style={{ resizeMode: 'contain', height: 170, width }} />
              </TouchableOpacity>
            ))}
          </Carousel>
          {/* <FlatList
            data={banner}
            horizontal
            showsHorizontalScrollIndicator={true}
            pagingEnabled
            renderItem={({ item }) =>(
              <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate("JobDetails", item.title)}>
                <Image source={{ uri: item.icon }} style={{
                  width,
                  height: 167,
                  // marginLeft: 20,
                  // marginHorizontal: 20,
                  resizeMode: 'cover',
                }} />
              </TouchableOpacity>
            )} /> */}
          {circleFill != '100' ?
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Profile")} style={{ backgroundColor: '#fff', marginTop: 10, marginHorizontal: 10, flexDirection: 'row', elevation: 4 }}>
              <View style={{ width: '70%', marginRight: 10 }}>
                <Text style={{ color: '#000', fontSize: 17, fontWeight: 'bold', marginTop: 10, marginLeft: 10 }}>Complete Your Profile</Text>
                <Text style={{ color: 'gray', marginTop: 4, marginLeft: 10, marginBottom: 10 }}>To successfully register your profile as an Expert and to you avaliable in search result:</Text>
                {/* <Text style={{color:'gray', marginTop:4, marginLeft:10}}>1. Profile needs to be at least 80% completed</Text>
          <Text style={{color:'gray', marginTop:4, marginLeft:10, marginBottom:10}}>2. You have to complete at least one verification step (we prefer you verify a bank account).</Text> */}
              </View>
              <AnimatedCircularProgress
                size={100}
                width={8}
                fill={circleFill}
                rotation={360}
                duration={1000}
                padding={10}
                tintColor="#4CBB17"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="lightgray">
                {fill => (
                  <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontWeight: '700',
                      }}>
                      {fill.toFixed(0)}%
                    </Text>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Completed</Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </TouchableOpacity>
            :
            null}
        {user?.user?.activeJobs <= 0 ?
        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Subscription', user)} style={{backgroundColor:'#0194C1', flexDirection:'row', marginHorizontal:10, marginTop:10,height:100, alignItems:'center', borderRadius:6, elevation:5}}>
          <View style={{marginLeft:10, width:'80%'}}>
            <Text style={{color:'#FFF', fontSize:18, fontWeight:'900', marginBottom:10}}>Buy Membership Plan</Text>
            {/* <Text style={{color:'#FFF', fontSize:12, fontWeight:'500'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text> */}
          </View>
          <Image source={require('../images/arrowright.png')} style={{height:20, width:20, resizeMode:'contain', position:'absolute', right:10}}/>
        </TouchableOpacity>:
        null
        }
          <FlatList
            data={list}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: 10,marginTop:10}}
            renderItem={({ item, index }) => (
              <TouchableOpacity activeOpacity={0.8} onPress={()=>moreCategories(item)} style={{ backgroundColor:'white', paddingHorizontal:20, justifyContent:'center', paddingVertical:16}}>
                <View>
                <Image source={ item.title == "All Categories" ? require('../images/home.png') : {uri : `${BASE_URL}${item?.icon?.name}`}} style={{width: item.title == 'All Categories' ? 30 : 32, height: item.title == 'All Categories' ? 30 : 32, resizeMode:'contain', alignSelf:'center'}}/>
                <Text style={{textAlign:'center', fontSize:12, marginTop:5, color:'#000', }}>{item.title}</Text>
              </View>
              </TouchableOpacity>
            )}
          />
        {/* </View> */}
        <View style={{paddingTop:8}}>
          <Text style={{ color: COLORS.overseaspurple, fontSize: 20, marginLeft: 10,  }}>{StringsOfLanguages.recommand}</Text>
        </View>
        <FlatList
          data={jobsList}
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
                <TouchableOpacity onPress={() => saveJobs(item)}>
                  <Image source={item.saved == "0" ? require('../images/fav1.png') :  require('../images/fav.png')} style={{ marginRight: 10, resizeMode: 'contain', width: 24, height: 24 }} />
                </TouchableOpacity>
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
                    <Text style={{ color: 'gray' }}>{item.is_min_exp == 1 ? `${item.exp}` : `No Exp ${'\n'}Require`}</Text>
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

export default Home

const styles = StyleSheet.create({
//   modal_View: {
//     backgroundColor: '#000000aa',
//     flex: 1,
// },
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
wrapper: {
  height:170,
  marginTop:10
},
})