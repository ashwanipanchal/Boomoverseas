import { SafeAreaView, StyleSheet, Text, View, StatusBar, Image, Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
import Swiper from 'react-native-swiper';
import { COLORS } from '../Constant/Colors';
import { ButtonStyle } from '../Custom/CustomView';
const { height, width } = Dimensions.get('window');
import StringsOfLanguages from '../Constant/LanguageStrings'
import { LocalStorage } from '../services/Api';

const GetStarted = ({navigation}) => {
    const [autoplay, setAutoPlay] = useState(true)

    const onStartHandler =()=>{
        setAutoPlay(false)
    }
    const onEndHandler =()=>{
        setAutoPlay(true)
    }
    const data = [
        {
          source: require('../images/h1.png'),
          title: 'Create Profile',
          titleHeader:
            'We guide you to create your profile.\nCreating profile on Boomoverseas\nis free.',
        },
        {
          source: require('../images/h2.png'),
          title: 'Complete & Active\nProfile',
          titleHeader:
            'Recruiters search for profile to hire.\nComplete profiles have higher\nchances of getting contacted\nby recruiters.',
        },
        {
          source: require('../images/h3.png'),
          title: 'Get Job\nRecommendations',
          titleHeader:
            'We send you relevent jobs based\non your profile data and jobs\nyour are applying to.',
        },
      ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Swiper
        onMomentumScrollEnd={(e, state, context) => {
          // console.log('index:', state.index)
        }}
        // ref="swiper"
        showsButtons={false}
        loop={true}
        autoplay={autoplay}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={{resizeMode: 'contain'}}
        showsPagination={true}>
        {data.map(item => {
          const {source, title, titleHeader} = item;
          return (
            <View>
              <Image style={styles.sub2image} source={source} />
              <Text style={styles.titletxt}>{title}</Text>
              <Text style={styles.titleHeadertext}>{titleHeader}</Text>
            </View>
          );
        })}
      </Swiper>
      <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom:20}}>
        <View
          style={{
            width: '50%',
          }}>
          <ButtonStyle
            title={StringsOfLanguages.skip}
            bgColor={'#F5f5f5'}
            txtcolor={COLORS.overseaspurple}
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
        <View style={{width: '50%'}}>
          <ButtonStyle
            title={StringsOfLanguages.next}
            bgColor={COLORS.overseaspurple}
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
)}

export default GetStarted

const styles = StyleSheet.create({
    sub2image: {
        marginTop: height / 7,
        resizeMode: 'contain',
        alignSelf:'center',
        height: 282,
        width: '50%',
      },
      dot: {
        backgroundColor: '#D8D8D8',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 3,
        marginBottom: 20,
      },
      activeDot: {
        backgroundColor: COLORS.overseaspurple,
        width: 13,
        height: 13,
        borderRadius: 7,
        marginLeft: 4,
        marginRight: 4,
        marginTop: 3,
        marginBottom: 20,
      },
      titletxt: {
        fontFamily: 'Muli-SemiBld',
        fontSize: 26,
        fontWeight: '700',
        color: '#222B45',
        textAlign: 'center'
        // marginTop: height9),
      },
      titleHeadertext: {
        fontFamily: 'Muli-Medium',
        fontSize: 18,
        fontWeight: '500',
        color: COLORS.overseaspurple,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 26,
      },
})