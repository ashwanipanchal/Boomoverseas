import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React,{useState, useEffect} from 'react'
import { COLORS } from '../Constant/Colors'
import HeaderTop from '../Components/HeaderTop'
import { Api, LocalStorage } from '../services/Api'
import { BASE_URL } from '../services/Config'
import moment from 'moment'

const SavedJobs = ({navigation}) => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        getList()
    },[])

    const getList = async() => {
        const res = await Api.getsavedjobs()
        // alert(JSON.stringify(res,null,2))
        const {status} = res
        if(status){
            setList(res.data)
        }
    }

    const unsaveJobs = async(item) => {
        setLoading(true)
        const value = (await LocalStorage.getUserDetail() || '')
        const user = JSON.parse(value)
        const body = {
          user_id : user._id,
          job_id : item._id
        }
        // alert(JSON.stringify(body,null,2))
        // return
        const res = await Api.removejob(body)
        getList()
        setLoading(false)
        alert(JSON.stringify(res.message,null,2))
      }

    const jobs = [
        {
          jobIcon: require('../images/jobicon.png'),
          jobTitle: 'Urgent requirement of Neurologist',
          hospitalName: 'Max Hospital',
          id: 'Job ID - IND1234',
          favIcon: require('../images/fav.png'),
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
          favIcon: require('../images/fav.png'),
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
          favIcon: require('../images/fav.png'),
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
          favIcon: require('../images/fav.png'),
          postDate: 'Posted On Jan 12, 2022',
          salaryIcon: require('../images/basicsalary.png'),
          dailyHour: require('../images/dailyhour.png'),
          overtime: require('../images/overtime.png'),
          food: require('../images/food.png'),
          experience: require('../images/experience.png'),
          location: require('../images/location.png'),
        },
      ]

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={() => navigation.goBack()} title={"Saved Jobs"} />
          {loading ? 
          <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
            <ActivityIndicator size={'large'} color={COLORS.overseaspurple}/>
          </View> :
          <>
          {list.length > "0" ?
          <FlatList
              data={list}
              renderItem={({ item }) => (
                //   <View style={{ backgroundColor: '#FFF', marginHorizontal: 20, marginVertical: 10, paddingTop: 10, paddingHorizontal: 10, borderRadius: 10 }}>
                //       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                //           <Image source={require('../images/jobicon.png')} style={{ marginRight: 10, resizeMode: 'contain', width: 52, height: 52 }} />
                //           <View style={{ flex: 1 }}>
                //               <Text style={{ color: COLORS.darkpurple, fontSize: 16, fontWeight: '700' }}>{item.title}</Text>
                //               <Text style={{ color: 'green', fontSize:16 }}>{item.industry}</Text>
                //               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
                //                   <Text style={{ color: COLORS.darkpurple, fontSize: 12, color:'gray' }}>{item.id}</Text>
                //                   <Text style={{ color: COLORS.darkpurple, fontSize: 12, color:'gray' }}>{item.postDate}</Text>
                //               </View>
                //           </View>
                //           <TouchableOpacity onPress={()=> unsaveJobs(item)}>
                //             <Image source={require('../images/fav.png')} style={{ marginRight: 10, resizeMode: 'contain', width: 24, height: 24 }} />
                //           </TouchableOpacity>
                //       </View>
                //       <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:10 }}>
                //           <View style={{alignItems:'center', flexDirection:'row'}}>
                //               <Image source={item.salaryIcon} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight:4 }} />
                //               <View>
                //                   <Text style={{ color: 'gray', fontSize: 12 }}>Basic Salary</Text>
                //                   <Text style={{ color: 'gray' }}>80-100 AED</Text>
                //               </View>
                //           </View>
                //           <View style={{alignItems:'center', flexDirection:'row'}}>
                //           <Image source={item.dailyHour} style={{width:24, height:24, resizeMode:'contain', marginRight:4}} />
                //           <View>
                //               <Text style={{ color:'gray',fontSize:12  }}>Duty Hours</Text>
                //               <Text style={{ color:'gray' }}>10 Hours</Text>
                //           </View>
                //           </View>
                //           <View style={{alignItems:'center', flexDirection:'row'}}>
                //           <Image source={item.overtime} style={{width:24, height:24, resizeMode:'contain', marginRight:4}} />
                //           <View>
                //               <Text style={{ color:'gray',fontSize:12  }}>Overtime</Text>
                //               <Text style={{ color:'gray' }}>2 Hours</Text>
                //           </View>
                //           </View>
                //       </View>
                //       <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:10 }}>
                //           <View style={{alignItems:'center', flexDirection:'row'}}>
                //               <Image source={item.food} style={{ width: 24, height: 24, resizeMode: 'contain' , marginRight:4}} />
                //               <View>
                //                   <Text style={{ color: 'gray', fontSize: 12 }}>Basic Salary</Text>
                //                   <Text style={{ color: 'gray' }}>80-100 AED</Text>
                //               </View>
                //           </View>
                //           <View style={{alignItems:'center', flexDirection:'row'}}>
                //           <Image source={item.experience} style={{width:24, height:24, resizeMode:'contain', marginRight:4}} />
                //           <View>
                //               <Text style={{ color:'gray',fontSize:12  }}>Duty Hours</Text>
                //               <Text style={{ color:'gray' }}>10 Hours</Text>
                //           </View>
                //           </View>
                //           <View style={{alignItems:'center', flexDirection:'row'}}>
                //           <Image source={item.location} style={{width:24, height:24, resizeMode:'contain', marginRight:4}} />
                //           <View>
                //               <Text style={{ color:'gray',fontSize:12  }}>Overtime</Text>
                //               <Text style={{ color:'gray' }}>2 Hours</Text>
                //           </View>
                //           </View>
                //       </View>
                //       <View style={{backgroundColor:COLORS.overseaspurple, justifyContent:'center', alignItems:'center', height:42, marginTop:16}}>
                //         <Text style={{color:'#fff', fontSize:18}}>APPLY</Text>
                //         </View>
                //   </View>
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
                                <TouchableOpacity onPress={()=> unsaveJobs(item)}>
                             <Image source={require('../images/fav.png')} style={{ marginRight: 10, resizeMode: 'contain', width: 24, height: 24 }} />
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
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 , marginBottom:10,paddingHorizontal: 10,marginLeft:10}}>
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
                                    <Text style={{ color: 'gray' }}>{item.is_min_exp == 1 ? `${item.exp} Years` : "-"}</Text>
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
                              {/* <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                                if (item.job_status == 1) {
                                  // alert("You cannot apply again to this job")
                                } else {
                                  setModalOpen(true)
                                  setJobToApply(item)
                                }
                                }} style={{ backgroundColor: item.job_status == 1 ? 'green' : COLORS.overseaspurple, justifyContent: 'center', alignItems: 'center', height: 42, marginTop: 16, borderBottomRightRadius:10, borderBottomLeftRadius:10, elevation:5 }}>
                                {jobApplyLoader ? <ActivityIndicator size={'small'}/> :
                                <Text style={{ color: '#fff', fontSize: 18 }}>{item.job_status == 1 ? 'APPLIED' : 'APPLY'}</Text>}
                              </TouchableOpacity> */}
                            </TouchableOpacity>
              )}
          /> :
          <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Text style={{textAlign:'center', color:COLORS.overseaspurple}}>No Jobs Found</Text>
        </View> }
          </>}
      </SafeAreaView>
  )
}

export default SavedJobs

const styles = StyleSheet.create({})