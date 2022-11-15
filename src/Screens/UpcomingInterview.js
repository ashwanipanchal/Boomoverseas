import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import HomeHeader from '../Components/HomeHeader'
import { COLORS } from '../Constant/Colors'
import StringsOfLanguages from '../Constant/LanguageStrings'
const UpcomingInterview = ({navigation}) => {
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
    <HomeHeader leftIcon={require('../images/arrow.png')} menuOption={() => navigation.goBack()} title={StringsOfLanguages.upcominginterview} secondRightIcon={require('../images/searchwhite.png')} rightOption={() => navigation.navigate('Search')} />
    <FlatList
          data={jobs}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate("JobDetails")} style={{ backgroundColor: '#FFF', marginHorizontal: 16, marginVertical: 10, paddingTop: 10, paddingHorizontal: 10, borderRadius: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={item.jobIcon} style={{ marginRight: 10, resizeMode: 'contain', width: 52, height: 52 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.darkpurple, fontSize: 16, fontWeight: '700' }}>{item.jobTitle}</Text>
                  <Text style={{ color: 'green', fontSize: 16 }}>{item.hospitalName}</Text>
                </View>
                <Image source={item.favIcon} style={{ marginRight: 10, resizeMode: 'contain', width: 24, height: 24 }} />
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:10}}>
                <View style={{backgroundColor:'#f5f5f5', paddingHorizontal:20, paddingVertical:5, borderRadius:20, alignItems:'center'}}>
                    <Text style={{color:'gray', fontSize:12}}>Interview Date</Text>
                    <Text style={{color:COLORS.overseaspurple}}>Jan 12, 2022</Text>
                </View>
                <View style={{backgroundColor:'#f5f5f5', paddingHorizontal:20, paddingVertical:5, borderRadius:20, alignItems:'center'}}>
                    <Text style={{color:'gray', fontSize:12}}>Venue</Text>
                    <Text style={{color:COLORS.overseaspurple}}>New Delhi</Text>
                </View>
                <View style={{backgroundColor:'#f5f5f5', paddingHorizontal:20, paddingVertical:5, borderRadius:20, alignItems:'center'}}>
                    <Text style={{color:'gray', fontSize:12}}>Job Location</Text>
                    <Text style={{color:COLORS.overseaspurple}}>Oman</Text>
                </View>
              </View>
              <Text style={{color:'gray', marginTop:5}}>Categories</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, alignItems:'center' }}>
                <View style={{flexDirection:'row', alignItems:'center',width:'45%'}}>
                    <View style={{backgroundColor:COLORS.overseaspurple, height:5, width:5, borderRadius:50}}></View>
                    <Text style={{marginLeft:5}}>Tile Mason</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center',width:'45%'}}>
                    <View style={{backgroundColor:COLORS.overseaspurple, height:5, width:5, borderRadius:50}}></View>
                    <Text style={{marginLeft:5}}>Tile Mason</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10, alignItems:'center', }}>
                <View style={{flexDirection:'row', alignItems:'center', width:'45%'}}>
                    <View style={{backgroundColor:COLORS.overseaspurple, height:5, width:5, borderRadius:50}}></View>
                    <Text style={{marginLeft:5}}>Tile Mason</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', width:'45%'}}>
                    <View style={{backgroundColor:COLORS.overseaspurple, height:5, width:5, borderRadius:50}}></View>
                    <Text style={{marginLeft:5}}>Tile Mason</Text>
                </View>
              </View>
              <View style={{ backgroundColor: COLORS.overseaspurple, justifyContent: 'center', alignItems: 'center', height: 42, marginTop: 16 }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>INTRESTED</Text>
              </View>
            </TouchableOpacity>
          )}
        />
    </SafeAreaView>
  )
}

export default UpcomingInterview

const styles = StyleSheet.create({})