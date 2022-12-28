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
const { height } = Dimensions.get('window');
import Modal from "react-native-modal";

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
  useEffect(()=>{
    setScreenLoader(true)
    getProfile()
    getjobs()
    setScreenLoader(false)
  },[focus])

  useEffect(()=>{
      getCategory()
  },[])


  const getProfile = async() => {
    const jj = (await LocalStorage.getUserDetail() || "")
    const user2 = JSON.parse(jj)

    const body = {
      "number" : user2.number
    }
    const user = await Api.getProfile(body)
    setUser(user)
    const fields = Object.keys(user.user)
    // alert(JSON.stringify(fields,null,2))
    // Object.keys(user.user).forEach((i) => {
    //   // console.log(i)
    // });
    let count = 0
    for (const key in fields) {
      count++
    }
    const totalFields = 30;
    const per = count/totalFields*100
    setCircleFill(per)
  }
  const getCategory = async() => {
      const ct = await Api.getcategory()
      // alert(JSON.stringify(ct,null,2))
      ct.data.splice(0, 0, { "title": "All Categories", "icon" : "require('../images/home.png')"})
      setList(ct.data)
  }
  const getjobs = async() => {
    // setScreenLoader(true)
    const token = (await LocalStorage.getToken()) || '';
    // alert(JSON.stringify(token,null,2))
    console.log(token)
    const btoken = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}jobs`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": btoken,
      }
    })
    const jsonres = await response.json()
    // alert(JSON.stringify(jsonres,null,2))
    // console.log(jsonres)
    const {status, data} = jsonres;
    if(status){
      // setScreenLoader(false)
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
    // alert(JSON.stringify(item,null,2))
    // return
    if(item.title == 'All Categories'){
      navigation.navigate('Industry')
    }else{
      navigation.navigate('IndustryJobList', {title: item.title})
    }
  }

  const job_apply = async (item) => {
    // const value = (await LocalStorage.getUserDetail() || '')
    // const user = JSON.parse(value)
    // alert(JSON.stringify(user,null,2))
    // return
    if(user.user.activeJobs == "0"){
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
        getjobs()
        alert(JSON.stringify(res.message, null, 2))
      }
    }
  }

  const saveJobs = async (item) => {
    
    // setLikeLoading(true)
    const value = (await LocalStorage.getUserDetail() || '')
    const user = JSON.parse(value)
    // alert(JSON.stringify(user,null,2))
    // return
    if (item.saved == "0") {
      // alert('if')
      const body = {
        user_id: user._id,
        job_id: item._id
      }
      // alert(JSON.stringify(body,null,2))
      // return
      const res = await Api.savejob(body)
      const{success} = res;
      if(success){
        // setLikeLoading(false)
        getjobs()
      }else{
        // setLikeLoading(false)
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
      <HomeHeader leftIcon={require('../images/menu.png')} menuOption={() => navigation.openDrawer()} title={StringsOfLanguages.home} firstRightIcon={require('../images/searchwhite.png')} secondRightIcon={require('../images/bell.png')} leftOption={() => navigation.navigate('Search')} rightOption={() => navigation.navigate('Notification')} />
      {screenLoader ? <ActivityIndicator size={'large'}/>:
      <ScrollView>
        <Image source={require('../images/banner.png')} style={{ width: '100%', height: 175, resizeMode: 'contain' }} />
        <View style={{backgroundColor:'#fff',marginTop:10, marginHorizontal:10, flexDirection:'row', elevation:4}}>
          <View style={{width:'70%', marginRight:10}}>
          <Text style={{color:'#000', fontSize:17, fontWeight:'bold', marginTop:10, marginLeft:10}}>Complete Your Profile</Text>
          <Text style={{color:'gray', marginTop:4, marginLeft:10,marginBottom:10}}>To successfully register your profile as an Expert and to you avaliable in search result:</Text>
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
                  <TouchableOpacity style={{ alignItems:'center', justifyContent:'center', }} onPress={() => navigation.navigate("Profile")}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontWeight: '700',
                      }}>
                      {fill.toFixed(0)}%
                    </Text>
                    <Text style={{color:'gray', fontSize:12}}>Completed</Text>
                  </TouchableOpacity>
                )}
            </AnimatedCircularProgress>
        </View>
        {(!user?.user?.activeJobs > 0 &&
        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('Subscription', user)} style={{backgroundColor:'#0194C1', flexDirection:'row', marginHorizontal:10, marginTop:10,height:100, alignItems:'center', borderRadius:6, elevation:5}}>
          <View style={{marginLeft:10, width:'80%'}}>
            <Text style={{color:'#FFF', fontSize:18, fontWeight:'900', marginBottom:10}}>Buy Membership Plan</Text>
            {/* <Text style={{color:'#FFF', fontSize:12, fontWeight:'500'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text> */}
          </View>
          <Image source={require('../images/arrowright.png')} style={{height:20, width:20, resizeMode:'contain', position:'absolute', right:10}}/>
        </TouchableOpacity>)}
          <FlatList
            data={list}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: 10,marginTop:10}}
            renderItem={({ item, index }) => (
              <TouchableOpacity activeOpacity={0.8} onPress={()=>moreCategories(item)} style={{ backgroundColor:'white', paddingHorizontal:20, justifyContent:'center', paddingVertical:16}}>
                <View>
                <Image source={ item.title == "All Categories" ? require('../images/home.png') : item.icon} style={{width: item.title == 'All Categories' ? 30 : 32, height: item.title == 'All Categories' ? 30 : 32, resizeMode:'contain', alignSelf:'center'}}/>
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
                <Image source={require('../images/jobicon.png')} style={{ marginRight: 10, resizeMode: 'contain', width: 52, height: 52 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.darkpurple, fontSize: 16, fontWeight: '700' }}>{item.title}</Text>
                  <Text style={{ color: 'green', fontSize: 16 }}>{item.industry}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
                    <Text style={{ color: COLORS.darkpurple, fontSize: 12, color: 'gray' }}>{item.id}</Text>
                    <Text style={{ color: COLORS.darkpurple, fontSize: 12, color: 'gray' }}>{item.postDate}</Text>
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
                    <Text style={{ color: 'gray' }}>{item.salary} AED</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={require('../images/dailyhour.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 10 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Duty Hours</Text>
                    <Text style={{ color: 'gray' }}>10 Hours</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={require('../images/overtime.png')} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 10 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Overtime</Text>
                    <Text style={{ color: 'gray' }}>2 Hours</Text>
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
                    <Text style={{ color: 'gray' }}>{item.exp} Years</Text>
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
})