import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity,  Alert, Share, } from 'react-native'
import React,{useEffect, useState} from 'react'
import { COLORS } from '../Constant/Colors';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import StringsOfLanguages from '../Constant/LanguageStrings'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Api, LocalStorage } from '../services/Api';
import { _RemoveAuthToken } from '../services/ApiSauce';
import { useIsFocused } from '@react-navigation/native'
import { BASE_URL } from '../services/Config';

const CustomDrawer = ({navigation}) => {
  const focus = useIsFocused()
  const [showMedia, setShowMedia] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user1, setUser1] = useState()
  useEffect(()=>{
    // GoogleSignin.configure();
    // getGoogleUser()
    getProfile()
  },[focus])
  // const getGoogleUser = async() => {
  //   const user = await GoogleSignin.getCurrentUser()
  //   setUser1(user)
  //   // alert(JSON.stringify(user,null,2))
  //   // console.log(user)
  // }
  // const [state, setState] = useState({
  //   user:{}
  // })

  const getProfile = async() => {
    setLoading(true)
    const jj = (await LocalStorage.getUserDetail() || "")
    const user2 = JSON.parse(jj)
    // console.log(user2)
    // return
    const body = {
      "number" : user2.number
    }
    const user = await Api.getProfile(body)
    // alert(JSON.stringify(user,null,2))
    // console.log(user)
    setUser1(user)
    setLoading(false)
  }
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
          title: "Active Package",
          value: 'ActivePackage',
          source: require('../images/menu/savedjobs.png')
        },
        {
          id: 7,
          title: StringsOfLanguages.media,
          value: 'Media',
          source: require('../images/menu/media.png')
        },
        {
          id: 8,
          title: StringsOfLanguages.news,
          value: 'News',
          source: require('../images/menu/news.png')
        },
        {
          id: 9,
          title: StringsOfLanguages.video,
          value: 'Videos',
          source: require('../images/menu/videos.png')
        },
        {
          id: 10,
          title: StringsOfLanguages.gallery,
          value: 'Gallery',
          source: require('../images/menu/gallery.png')
        },
        {
          id: 11,
          title: StringsOfLanguages.tradecenter,
          value: 'TradeCenter',
          source: require('../images/menu/viewalltradecenter.png')
        },
        {
          id: 12,
          title: StringsOfLanguages.rateapp,
          value: 'RateApp',
          source: require('../images/menu/rateus.png')
        },
        {
          id: 13,
          title: StringsOfLanguages.shareapp,
          value: 'Share',
          source: require('../images/menu/share.png')
        },
        {
          id: 14,
          title: StringsOfLanguages.aboutus,
          value: 'About Us',
          source: require('../images/menu/aboutus.png')
        },
        {
          id: 15,
          title: StringsOfLanguages.privacy,
          value: 'Privacy Policy',
          source: require('../images/menu/privacy.png')
        },
        {
          id: 16,
          title: 'Terms & Condition',
          value: 'Terms & Condition',
          source: require('../images/menu/privacy.png')
        },
        
        {
          id: 17,
          title: 'Subscription',
          value: 'Subscription',
          source: require('../images/menu/logout.png')
        },
        {
          id: 18,
          title: 'Documents',
          value: 'UploadDocuments',
          source: require('../images/menu/recjobs.png')
        },
        {
          id: 19,
          title: StringsOfLanguages.logout,
          value: 'Logout',
          source: require('../images/menu/logout.png')
        },
    ]

    const onShare = async () => {
      try {
        const result = await Share.share({
          title: 'App link',
          message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
          url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };


    const onPressHandler = value => {
        // navigation.closeDrawer();
        // alert(JSON.stringify(value,null,2))
        switch (value) {
          
          case 'Home':
            navigation.closeDrawer();
            break;

            case 'RecommenderJobs':
            navigation.navigate('RecommendedJobs')
            break;
            
          case 'Media':
            navigation.navigate('Media')
            // setShowMedia(i => !i)
            break;
    
          case 'News':
            navigation.navigate('News')
            break;

          case 'MyJobs':
            navigation.navigate('MyJobs')
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

          case 'Subscription':
            // alert('TradeCenter')
            navigation.navigate('Subscription', user1)
            break;
          case 'UploadDocuments':
            // alert('TradeCenter')
            navigation.navigate('UploadDocuments', user1)
            break;

          case 'ActivePackage':
            // alert('TradeCenter')
            navigation.navigate('ActivePackage')
            break;
            
          case 'Share':
            onShare()
            break;
          case 'Terms & Condition':
            gotoWebViewScreen('Terms & Condition')
            break;
          case 'Privacy Policy':
            gotoWebViewScreen('Privacy Policy')
            break;
          case 'About Us':
            gotoWebViewScreen('About Us')
            break;
          case 'Logout':
            Alert.alert(
              'Logout',
              `Do you want to logout.`,
              [
                {
                  text: 'No',
                  onPress: navigation.closeDrawer,
                  style: 'cancel',
                },
                { text: 'Yes', onPress: onLogoutHandler },
              ],
              { cancelable: false },
            );
            // signOut()
            break;
    
          default:
        }
      };

      const gotoWebViewScreen = (title) => {
        // alert(title)
        // return
        let url = "";
        if (title === "Privacy Policy") {
          url = 'http://3.6.88.162/boom/public/privacy_policy'
        } else if (title === "Terms & Condition") {
          url = 'http://3.6.88.162/boom/public/terms_conditions'
        }else if (title === "About Us") {
          url = 'http://3.6.88.162/boom/public/about_us'
        }
        navigation.navigate('WebViewScreen', {
          title: title,
          url: url
        })
      }

      const onLogoutHandler = () => {
        _RemoveAuthToken();
        LocalStorage.setToken('');
        // dispatch(actions.SetLogout());
        LocalStorage.clear()
        navigation.closeDrawer,
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
      };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setState({ user: null }); // Remember to remove the user from your app's state as well
      navigation.navigate('Login')
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor:COLORS.overseaspurple, flex:1}}>
      <DrawerContentScrollView>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={{ flexDirection: 'row', padding: 15, alignItems: 'center', marginLeft: 5, marginBottom: 2, }}>
        {/* {(user1 ?
            <>
            <Image source={{uri:user1.user.photo}} style={{ width: 64, height: 64, borderRadius: 10 }} />
            <View style={{ marginLeft: 10, width: '100%' }}>
                <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '800', }}>{user1.user.givenName} {user1.user.familyName}</Text>
                <Text style={{ color: '#FFF' }}>{user1.user.email}</Text>
            </View>
            </>: 
            <>
            <Image source={require('../images/profile.png')} style={{ width: 64, height: 64, borderRadius: 10 }} />
            <View style={{ marginLeft: 10, width: '100%' }}>
                <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '800', }}>Ariana</Text>
                <Text style={{ color: '#FFF' }}>ariana@gmail.com</Text>
            </View>
            </>
            )} */}
        {(user1 ?
            <>
            <Image source={user1.user.profile_pic.name.length > 0 ? {uri: `${BASE_URL}${user1.user.profile_pic.name}`} : require('../images/profile.png')} style={{ width: 64, height: 64, borderRadius: 10 }} />
            <View style={{ marginLeft: 10, width: '100%' }}>
                <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '800', }}>{user1.user.firstName} {user1.user.lastName}</Text>
                <Text style={{ color: '#FFF' }}>{user1.user.email}</Text>
            </View>
            </>: 
            <>
            <Image source={require('../images/profile.png')} style={{ width: 64, height: 64, borderRadius: 10 }} />
            <View style={{ marginLeft: 10, width: '100%' }}>
                <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '800', }}>Ariana</Text>
                <Text style={{ color: '#FFF' }}>ariana@gmail.com</Text>
            </View>
            </>
            )}
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