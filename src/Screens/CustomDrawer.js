import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { COLORS } from '../Constant/Colors';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import StringsOfLanguages from '../Constant/LanguageStrings'

const CustomDrawer = ({navigation}) => {
  const [showMedia, setShowMedia] = useState(false)
    const Data = [
        {
          id: 0,
          title: StringsOfLanguages.home,
          value: 'Home',
          source: require('../images/menu/home.png'),
        },
        {
          id: 1,
          title: StringsOfLanguages.myjobs,
          value: 'MyJobs',
          source: require('../images/menu/myjobs.png')
        },
        {
          id: 2,
          title: StringsOfLanguages.recommendedjobs,
          value: 'RecommenderJobs',
          source: require('../images/menu/recjobs.png')
        },
        {
          id: 3,
          title: StringsOfLanguages.upcominginterview,
          value: 'UpcomingInterview',
          source: require('../images/menu/upcominginterview.png')
        },
        {
          id: 4,
          title: StringsOfLanguages.industry,
          value: 'Industry',
          source: require('../images/menu/industry.png')
        },
        {
          id: 5,
          title: StringsOfLanguages.savedjobs,
          value: 'SavedJobs',
          source: require('../images/menu/savedjobs.png')
        },
        {
          id: 6,
          title: StringsOfLanguages.media,
          value: 'Media',
          source: require('../images/menu/media.png')
        },
        {
          id: 7,
          title: StringsOfLanguages.news,
          value: 'News',
          source: require('../images/menu/news.png')
        },
        {
          id: 8,
          title: StringsOfLanguages.video,
          value: 'Videos',
          source: require('../images/menu/videos.png')
        },
        {
          id: 9,
          title: StringsOfLanguages.gallery,
          value: 'Gallery',
          source: require('../images/menu/gallery.png')
        },
        {
          id: 10,
          title: StringsOfLanguages.tradecenter,
          value: 'TradeCenter',
          source: require('../images/menu/viewalltradecenter.png')
        },
        {
          id: 11,
          title: StringsOfLanguages.rateapp,
          value: 'RateApp',
          source: require('../images/menu/rateus.png')
        },
        {
          id: 12,
          title: StringsOfLanguages.shareapp,
          value: 'Share',
          source: require('../images/menu/share.png')
        },
        {
          id: 13,
          title: StringsOfLanguages.aboutus,
          value: 'AboutUs',
          source: require('../images/menu/aboutus.png')
        },
        {
          id: 14,
          title: StringsOfLanguages.privacy,
          value: 'Privacy',
          source: require('../images/menu/privacy.png')
        },
        {
          id: 15,
          title: StringsOfLanguages.logout,
          value: 'Logout',
          source: require('../images/menu/logout.png')
        },
    ]
    const onPressHandler = value => {
        // navigation.closeDrawer();
        // alert(JSON.stringify(value,null,2))
        switch (value) {
          
          case 'Home':
            navigation.closeDrawer();
            break;
          case 'Media':
            // navigation.navigate('Media')
            setShowMedia(i => !i)
            break;
    
          case 'News':
            navigation.navigate('News')
            break;

          case 'Industry':
            navigation.navigate('Industry')
            break;

          case 'SavedJobs':
            navigation.navigate('SavedJobs')
            break;

          case 'UpcomingInterview':
            navigation.navigate('UpcomingInterview')
            break;
    
          case 'TradeCenter':
            // alert('TradeCenter')
            navigation.navigate('TradeCenterList')
            break;
            
          case 'Share':
            onShare()
            break;
          case 'Terms & Condition':
            // gotoWebViewScreen('Terms & Condition')
            break;
          case 'Privacy Policy':
            // gotoWebViewScreen('Privacy Policy')
            break;
          case 'Help & FAQs':
            // gotoWebViewScreen('Help & FAQs')
            break;
          case 'Logout':
            // Alert.alert(
            //   'Logout',
            //   `Do you want to logout.`,
            //   [
            //     {
            //       text: 'No',
            //       onPress: navigation.closeDrawer,
            //       style: 'cancel',
            //     },
            //     { text: 'Yes', onPress: onLogoutHandler },
            //   ],
            //   { cancelable: false },
            // );
            break;
    
          default:
        }
      };
  return (
    <SafeAreaView style={{backgroundColor:COLORS.overseaspurple, flex:1}}>
      <DrawerContentScrollView>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={{ flexDirection: 'row', padding: 15, alignItems: 'center', marginLeft: 5, marginBottom: 2, }}>
            <Image source={require('../images/profile.png')} style={{ width: 64, height: 64, borderRadius: 10 }} />
            <View style={{ marginLeft: 10, width: '100%' }}>
                <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '800', }}>Ariana Grande</Text>
                <Text style={{ color: '#FFF' }}>ariana@gmail.com</Text>
            </View>
        </TouchableOpacity>
        <FlatList
          data={Data}
          renderItem={({item})=>(
            <TouchableOpacity activeOpacity={0.5} onPress={()=>{onPressHandler(item.value)}} style={{flexDirection:'row', marginLeft:10, padding:18, alignItems:'center'}}>
              <Image source={item.source} style={{width:28, height:28}}/>
              <Text style={{color:'#FFF', fontSize:18, marginLeft:20,width:'90%',}}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})