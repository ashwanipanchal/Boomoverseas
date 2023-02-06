import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native'
import React,{useState} from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import { BASE_URL } from '../services/Config'
import moment from 'moment'
import Modal from "react-native-modal";

const SearchResult = ({navigation, route}) => {
    // alert(JSON.stringify(route.params,null,2))
    const [list, setList] = useState([])
    const [jobToApply, setJobToApply] = useState();
    const [user, setUser] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [jobApplyLoader, setJobApplyLoader] = useState(false);
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={() => navigation.goBack()} title={"Search Results"} />
          {route.params.length > "0" ?
          <FlatList
          data={route.params}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate("JobDetails", item)} style={{ backgroundColor: '#FFF', marginHorizontal: 16, marginVertical: 10, paddingTop: 10,  borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, elevation:5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal: 10, }}>
                <Image source={{uri : `${BASE_URL}${item?.company_name?.company_image?.name}`}} style={{ marginRight: 10, resizeMode: 'contain', width: 52, height: 52 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.darkpurple, fontSize: 16, fontWeight: '700' }}>{item.title}</Text>
                  <Text style={{ color: 'green', fontSize: 16 }}>{item.show_company_name == "1" ? item.company_name?.company_name: ""}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
                    <Text style={{ color: COLORS.darkpurple, fontSize: 12, color: 'gray' }}>{item.new_job_id}</Text>
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
                    <Text style={{ color: 'gray' }}>{item.hide_salary == "1" ? "-": `${item.salary} ${item.sal_currancy}`}</Text>
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom:10 ,paddingHorizontal: 10,marginLeft:10}}>
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
        />: 
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Text style={{textAlign:'center'}}>No Jobs Found</Text>
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

export default SearchResult

const styles = StyleSheet.create({})