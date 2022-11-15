import { StyleSheet, Text, View,SafeAreaView , StatusBar, FlatList, Image} from 'react-native'
import React from 'react'
import { COLORS } from '../Constant/Colors'
import HeaderTop from '../Components/HeaderTop'
import StringsOfLanguages from '../Constant/LanguageStrings'

const Notification = ({navigation}) => {
    const data = [
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/notification.png'),
            subTitle: 'Lorem Ipsum is simply dummy text of the printing.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA',
            date: '02/02/2022',
        },
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/notification.png'),
            subTitle: 'Lorem Ipsum is simply dummy text of the printing.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA',
            date: '02/02/2022',
        },
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/notification.png'),
            subTitle: 'Lorem Ipsum is simply dummy text of the printing.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA',
            date: '02/02/2022',
        },
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/notification.png'),
            subTitle: 'Lorem Ipsum is simply dummy text of the printing.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA',
            date: '02/02/2022',
        },
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/notification.png'),
            subTitle: 'Lorem Ipsum is simply dummy text of the printing.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA',
            date: '02/02/2022',
        },
    ]
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
    <HeaderTop back={() => navigation.goBack()} title={StringsOfLanguages.notification} />
    <FlatList
      data={data}
      renderItem={({item})=> (
          <View style={{flexDirection:'row', backgroundColor:'#FFF', alignItems:'center', marginTop:20, marginHorizontal:20, paddingVertical:18, paddingHorizontal:18, borderRadius:10}}>
              <Image source={item.icon} style={{width:28, height:28, resizeMode:'contain'}}/>
              <View style={{ marginLeft:10,}}>
                  <Text style={{ color: COLORS.darkpurple, fontSize:20 }}>{item.title}</Text>
                  <Text style={{ color: COLORS.darkpurple,  }}>{item.subTitle}</Text>
                  <Text style={{ color: COLORS.darkpurple, textAlign:'right', marginTop:10 }}>{item.date}</Text>
              </View>
          </View>
      )}
    />
</SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({})