import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import HomeHeader from '../Components/HomeHeader'
import StringsOfLanguages from '../Constant/LanguageStrings'

const Home = ({ navigation }) => {
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
      navigation.navigate('IndustryJobList', {title: item.title})
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
      <HomeHeader leftIcon={require('../images/menu.png')} menuOption={() => navigation.openDrawer()} title={StringsOfLanguages.home} firstRightIcon={require('../images/searchwhite.png')} secondRightIcon={require('../images/bell.png')} leftOption={() => navigation.navigate('Search')} rightOption={() => navigation.navigate('Notification')} />
      <ScrollView>
        <Image source={require('../images/banner.png')} style={{ width: '100%', height: 175, resizeMode: 'contain' }} />
        <View>
          <FlatList
            data={catagories}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: 10,marginTop:10}}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.8} onPress={()=>moreCategories(item)} style={{ backgroundColor:'white', paddingHorizontal:20, justifyContent:'center', paddingVertical:16}}>
                <View>
                  <Image source={item.icon} style={{width: item.title == 'All Categories' ? 30 : 32, height: item.title == 'All Categories' ? 30 : 32, resizeMode:'contain', alignSelf:'center'}}/>
                  <Text style={{textAlign:'center', fontSize:12, marginTop:5}}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <Text style={{ color: COLORS.overseaspurple, fontSize: 20, marginLeft: 10 }}>{StringsOfLanguages.recommand}</Text>
        <FlatList
          data={jobs}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.9} onPress={()=>navigation.navigate("JobDetails")} style={{ backgroundColor: '#FFF', marginHorizontal: 16, marginVertical: 10, paddingTop: 10, paddingHorizontal: 10, borderRadius: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={item.jobIcon} style={{ marginRight: 10, resizeMode: 'contain', width: 52, height: 52 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.darkpurple, fontSize: 16, fontWeight: '700' }}>{item.jobTitle}</Text>
                  <Text style={{ color: 'green', fontSize: 16 }}>{item.hospitalName}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
                    <Text style={{ color: COLORS.darkpurple, fontSize: 12, color: 'gray' }}>{item.id}</Text>
                    <Text style={{ color: COLORS.darkpurple, fontSize: 12, color: 'gray' }}>{item.postDate}</Text>
                  </View>
                </View>
                <Image source={item.favIcon} style={{ marginRight: 10, resizeMode: 'contain', width: 24, height: 24 }} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems:'center' }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={item.salaryIcon} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 4 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>Basic Salary</Text>
                    <Text style={{ color: 'gray' }}>80-100 AED</Text>
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
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
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
                    <Text style={{ color: 'gray' }}>3-6 Years</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', width:'33%' }}>
                  <Image source={item.location} style={{ width: 24, height: 24, resizeMode: 'contain', marginRight: 4 }} />
                  <View>
                    <Text style={{ color: 'gray', fontSize: 12 }}>location</Text>
                    <Text style={{ color: 'gray' }}>New Delhi</Text>
                  </View>
                </View>
              </View>
              <View style={{ backgroundColor: COLORS.overseaspurple, justifyContent: 'center', alignItems: 'center', height: 42, marginTop: 16 }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>{StringsOfLanguages.applybutton}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})