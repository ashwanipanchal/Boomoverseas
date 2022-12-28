import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList,Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import { Api } from '../services/Api'
import { Thumbnail } from 'react-native-thumbnail-video';
import moment from 'moment/moment'

const Media = ({navigation}) => {
    const [videoData, setVideoData] = useState([])
    useEffect(()=>{
        getMedia()
    },[])

    const getMedia = async() => {
        const res = await Api.getMedia()
        // alert(JSON.stringify(res,null,2))
        const {status} = res
        if(status){
            setVideoData(res.data)
        }
    }

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
            data={videoData}
            style={{flex:1}}
            renderItem={({item})=> (
                <View style={{flexDirection:'row', backgroundColor:'#FFF', marginTop:10, marginHorizontal:20, paddingVertical:18, paddingHorizontal:18, borderRadius:10, elevation:7, marginBottom:2}}>
                    <Image source={require('../images/video.png')} style={{width:140, height:140, }}/>
                    {/* <Thumbnail url={item.link} imageWidth= {100} imageHeight={100} showPlayIcon={true} /> */}
                    <View style={{width:'60%', marginLeft:10}}>
                        <Text style={{ color: COLORS.darkpurple, fontSize:20 }}>{item.title}</Text>
                        <Text style={{ color: COLORS.darkpurple,  }}>{item.subtitle}</Text>
                        <Text style={{ color: COLORS.darkpurple, marginTop:'auto', }}>Posted On {moment(item.date).format('MMM DD, YYYY') }</Text>
                    </View>
                </View>
            )}
          />
      </SafeAreaView>
  )
}

export default Media

const styles = StyleSheet.create({})