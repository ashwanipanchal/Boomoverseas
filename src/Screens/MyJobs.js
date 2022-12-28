import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import { COLORS } from '../Constant/Colors'
import HeaderTop from '../Components/HeaderTop'
import { Api, LocalStorage } from '../services/Api'

const MyJobs = ({navigation}) => {
    const [jobsList, setJobList] = useState([]);
    useEffect(()=>{
        getMyJobs()
    },[])
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
    
    const getMyJobs = async() => {
        const res = await Api.getmyjobs()
        const updateStatus = res.data.map((i)=>{
          let job_status;
         job_status = 1
         return { ...i, job_status}
        })
        // alert(JSON.stringify(updateStatus,null,2))
        // return
        const {status} = res
        if(status){
            setJobList(updateStatus)
        }
    }
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={() => navigation.goBack()} title={'My Jobs'} />
          {jobsList.length > "0" ?
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
                <Image source={item.favIcon} style={{ marginRight: 10, resizeMode: 'contain', width: 24, height: 24 }} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems:'center',paddingHorizontal: 10, }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={item.salaryIcon} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 4 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Basic Salary</Text>
                    <Text style={{ color: 'gray' }}>{item.salary} AED</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={item.dailyHour} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 4 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Duty Hours</Text>
                    <Text style={{ color: 'gray' }}>10 Hours</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={item.overtime} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 4 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Overtime</Text>
                    <Text style={{ color: 'gray' }}>2 Hours</Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 ,paddingHorizontal: 10,}}>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={item.food} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 4 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Food</Text>
                    <Text style={{ color: 'gray' }}>Yes</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={item.experience} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 4 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Experience</Text>
                    <Text style={{ color: 'gray' }}>{item.exp} Years</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={item.location} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 4 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>location</Text>
                    <Text style={{ color: 'gray' }}>{item.job_location}</Text>
                  </View>
                </View>
              </View>
              <View style={{ backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', height: 42, marginTop: 16, borderBottomRightRadius:10, borderBottomLeftRadius:10, elevation:5 }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Applied</Text>
              </View>
            </TouchableOpacity>
          )}
        />: 
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Text style={{textAlign:'center'}}>No Jobs Found</Text>
        </View> }
      </SafeAreaView>
  )
}

export default MyJobs

const styles = StyleSheet.create({})