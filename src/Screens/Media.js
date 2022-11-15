import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList,Image } from 'react-native'
import React from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'

const Media = ({navigation}) => {
    const data = [
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/video.png'),
            subTitle: 'Lorem Ipsum is simply dummy text of the printing.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA'
        },
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/video.png'),
            subTitle: 'Lorem Ipsum is simply dummy text of the printing.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA'
        },
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/video.png'),
            subTitle: 'Lorem Ipsum is simply dummy text of the printing.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA'
        },
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/video.png'),
            subTitle: 'Lorem Ipsum is simply dummy text of the printing.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA'
        },
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/video.png'),
            subTitle: 'Lorem Ipsum is simply dummy text of the printing.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA'
        },
    ]
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={() => navigation.goBack()} title={"Media"} />
          <FlatList
            data={data}
            renderItem={({item})=> (
                <View style={{flexDirection:'row', backgroundColor:'#FFF', marginTop:20, marginHorizontal:20, paddingVertical:18, paddingHorizontal:18, borderRadius:10}}>
                    <Image source={item.icon} style={{width:140, height:140, }}/>
                    <View style={{width:'60%', marginLeft:10}}>
                        <Text style={{ color: COLORS.darkpurple, fontSize:20 }}>{item.title}</Text>
                        <Text style={{ color: COLORS.darkpurple,  }}>{item.subTitle}</Text>
                    </View>
                </View>
            )}
          />
      </SafeAreaView>
  )
}

export default Media

const styles = StyleSheet.create({})