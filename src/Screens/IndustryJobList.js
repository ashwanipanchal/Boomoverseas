import { StyleSheet, Text, View , SafeAreaView, StatusBar, FlatList, TouchableOpacity,Image } from 'react-native'
import React,{useState, useEffect} from 'react'
import { COLORS } from '../Constant/Colors'
import HomeHeader from '../Components/HomeHeader'
import StringsOfLanguages from '../Constant/LanguageStrings'
import { Api } from '../services/Api'

const IndustryJobList = ({navigation, route}) => {
  const [list, setList] = useState([])
  useEffect(()=>{
    getList()
  },[])

  const getList = async()=> {
    const body = {
      title: route.params.title
    }
    const res = await Api.jobCategoryWise(body)
    // alert(JSON.stringify(res.data,null,2))
    const {status} = res
    if(status){
      setList(res.data)
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
    <HomeHeader leftIcon={require('../images/arrow.png')} menuOption={() => navigation.goBack()} title={route.params.title} secondRightIcon={require('../images/searchwhite.png')} rightOption={() => navigation.navigate('Search')} />
    {list.length > "0" ?
    <FlatList
          data={list}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate("JobDetails",item)} style={{ backgroundColor: '#FFF', marginHorizontal: 16, marginVertical: 10, paddingTop: 10,  borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
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
                    <Text style={{ color: 'gray' }}>Yes</Text>
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
              <View style={{ backgroundColor: item.job_status == 1 ? 'green' : COLORS.overseaspurple, justifyContent: 'center', alignItems: 'center', height: 42, marginTop: 16, borderBottomRightRadius:10, borderBottomLeftRadius:10 }}>
              <Text style={{ color: '#fff', fontSize: 18 }}>{item.job_status == 1 ? 'APPLIED' : 'APPLY'}</Text>
              </View>
            </TouchableOpacity>
          )}
        /> : 
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          <Text style={{textAlign:'center'}}>No Jobs Found</Text>
        </View> }
    </SafeAreaView>
  )
}

export default IndustryJobList

const styles = StyleSheet.create({})