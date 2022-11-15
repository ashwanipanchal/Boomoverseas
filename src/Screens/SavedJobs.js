import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../Constant/Colors'
import HeaderTop from '../Components/HeaderTop'

const SavedJobs = ({navigation}) => {

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
          <FlatList
              data={jobs}
              renderItem={({ item }) => (
                  <View style={{ backgroundColor: '#FFF', marginHorizontal: 20, marginVertical: 10, paddingTop: 10, paddingHorizontal: 10, borderRadius: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Image source={item.jobIcon} style={{ marginRight: 10, resizeMode: 'contain', width: 52, height: 52 }} />
                          <View style={{ flex: 1 }}>
                              <Text style={{ color: COLORS.darkpurple, fontSize: 16, fontWeight: '700' }}>{item.jobTitle}</Text>
                              <Text style={{ color: 'green', fontSize:16 }}>{item.hospitalName}</Text>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
                                  <Text style={{ color: COLORS.darkpurple, fontSize: 12, color:'gray' }}>{item.id}</Text>
                                  <Text style={{ color: COLORS.darkpurple, fontSize: 12, color:'gray' }}>{item.postDate}</Text>
                              </View>
                          </View>
                          <Image source={item.favIcon} style={{ marginRight: 10, resizeMode: 'contain', width: 24, height: 24 }} />
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:10 }}>
                          <View style={{alignItems:'center', flexDirection:'row'}}>
                              <Image source={item.salaryIcon} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight:4 }} />
                              <View>
                                  <Text style={{ color: 'gray', fontSize: 12 }}>Basic Salary</Text>
                                  <Text style={{ color: 'gray' }}>80-100 AED</Text>
                              </View>
                          </View>
                          <View style={{alignItems:'center', flexDirection:'row'}}>
                          <Image source={item.dailyHour} style={{width:24, height:24, resizeMode:'contain', marginRight:4}} />
                          <View>
                              <Text style={{ color:'gray',fontSize:12  }}>Duty Hours</Text>
                              <Text style={{ color:'gray' }}>10 Hours</Text>
                          </View>
                          </View>
                          <View style={{alignItems:'center', flexDirection:'row'}}>
                          <Image source={item.overtime} style={{width:24, height:24, resizeMode:'contain', marginRight:4}} />
                          <View>
                              <Text style={{ color:'gray',fontSize:12  }}>Overtime</Text>
                              <Text style={{ color:'gray' }}>2 Hours</Text>
                          </View>
                          </View>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:10 }}>
                          <View style={{alignItems:'center', flexDirection:'row'}}>
                              <Image source={item.food} style={{ width: 24, height: 24, resizeMode: 'contain' , marginRight:4}} />
                              <View>
                                  <Text style={{ color: 'gray', fontSize: 12 }}>Basic Salary</Text>
                                  <Text style={{ color: 'gray' }}>80-100 AED</Text>
                              </View>
                          </View>
                          <View style={{alignItems:'center', flexDirection:'row'}}>
                          <Image source={item.experience} style={{width:24, height:24, resizeMode:'contain', marginRight:4}} />
                          <View>
                              <Text style={{ color:'gray',fontSize:12  }}>Duty Hours</Text>
                              <Text style={{ color:'gray' }}>10 Hours</Text>
                          </View>
                          </View>
                          <View style={{alignItems:'center', flexDirection:'row'}}>
                          <Image source={item.location} style={{width:24, height:24, resizeMode:'contain', marginRight:4}} />
                          <View>
                              <Text style={{ color:'gray',fontSize:12  }}>Overtime</Text>
                              <Text style={{ color:'gray' }}>2 Hours</Text>
                          </View>
                          </View>
                      </View>
                      <View style={{backgroundColor:COLORS.overseaspurple, justifyContent:'center', alignItems:'center', height:42, marginTop:16}}>
                        <Text style={{color:'#fff', fontSize:18}}>APPLY</Text>
                        </View>
                  </View>
                  
              )}
          />
      </SafeAreaView>
  )
}

export default SavedJobs

const styles = StyleSheet.create({})