import { StyleSheet, Text, View, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import HomeHeader from '../Components/HomeHeader'
import { COLORS } from '../Constant/Colors'
import StringsOfLanguages from '../Constant/LanguageStrings'

const JobDetails = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
      <HomeHeader leftIcon={require('../images/arrow.png')} menuOption={() => navigation.goBack()} title={StringsOfLanguages.jobdetails} firstRightIcon={require('../images/share.png')} secondRightIcon={require('../images/like.png')} />
      <ScrollView>
        <View style={{ backgroundColor: COLORS.overseaspurple, height: 160, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', textAlign: 'center', justifyContent: 'center', alignSelf: 'center', fontSize: 22 }}>UI / Front End Developer</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Image style={{ width: 48, height: 48 }} source={require('../images/jobicon.png')} />
            <Text style={{ color: '#fff', marginLeft: 10 }}>Max India Pvt Ltd</Text>
          </View>
        </View>
        <View style={{ backgroundColor: 'green', width: '45%', alignSelf: 'center', height: 50, marginTop: -25, alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 10 }}>
          <Text style={{ color: '#FFF', fontSize: 18 }}>Apply Now</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 30 }}>
          <Text style={{ color: 'gray' }}>Job ID IND1234</Text>
          <Text style={{ color: 'gray' }}>Posted On Jan 12, 2022</Text>
        </View>
        <View style={{  marginHorizontal: 20, marginTop: 10, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10 }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Job Description</Text>
          <Text style={{ color: COLORS.darkpurple, marginBottom:20 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}></View>
        </View>
        <View style={{  marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10,}}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Job Details</Text>
          <View style={{flexDirection:'row'}}>
            <View style={{backgroundColor:COLORS.overseaspurple, height:10, width:10, borderRadius:50, marginTop:5}}></View>
            <View style={{marginLeft:5}}>
            <Text style={{ color: COLORS.darkpurple,}}>Basic Salary</Text>
            <Text style={{ color: COLORS.darkpurple,}}>50,000 per month</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', marginTop:10}}>
            <View style={{backgroundColor:COLORS.overseaspurple, height:10, width:10, borderRadius:50, marginTop:5}}></View>
            <View style={{marginLeft:5}}>
            <Text style={{ color: COLORS.darkpurple,}}>Basic Salary</Text>
            <Text style={{ color: COLORS.darkpurple,}}>50,000 per month</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', marginTop:10}}>
            <View style={{backgroundColor:COLORS.overseaspurple, height:10, width:10, borderRadius:50, marginTop:5}}></View>
            <View style={{marginLeft:5}}>
            <Text style={{ color: COLORS.darkpurple,}}>Basic Salary</Text>
            <Text style={{ color: COLORS.darkpurple,}}>50,000 per month</Text>
            </View>
          </View>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5 , marginTop:20}}></View>
        </View>
        <View style={{  marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10 }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>No. of Vacancies</Text>
          <Text style={{ color: COLORS.darkpurple, marginBottom:20, fontWeight:'bold'  }}>40,000 Vacancies</Text>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}></View>
        </View>
        <View style={{ marginHorizontal: 20,  paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10 }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Skill Required</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
          </View>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}></View>
        </View>
        <View style={{ marginHorizontal: 20,  paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10 }}>
          <Text style={{ color: COLORS.darkpurple, fontSize: 18, marginBottom: 10 }}>Education</Text>
          <View style={{ flexDirection: 'row' }}>
            {/* <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View> */}
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, }}>UG:</Text>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10, fontWeight:'bold' }}>B.Tech/B.E - Any Specialization</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {/* <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View> */}
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20,  }}>PG:</Text>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10,fontWeight:'bold'  }}>Any Postgraduate - Any Specialization</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {/* <View style={{ backgroundColor: COLORS.overseaspurple, height: 10, width: 10, borderRadius: 50, marginTop: 5 }}></View> */}
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20,  }}>Doctorate:</Text>
            <Text style={{ color: COLORS.darkpurple, marginBottom: 20, marginLeft:10,fontWeight:'bold'  }}>Any Postgraduate - Any Specialization</Text>
          </View>
          <View style={{ borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}></View>
        </View>
        <View style={{  marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10, }}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default JobDetails

const styles = StyleSheet.create({})