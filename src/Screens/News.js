import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import React,{useState, useEffect} from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import StringsOfLanguages from '../Constant/LanguageStrings'
import { Api } from '../services/Api'

const News = ({navigation}) => {
    const [newsList, setNewsList] = useState([])
    useEffect(()=>{
        getNews()
    },[])

    const getNews = async()=>{
        const res = await Api.getNews()
        const {status} = res
        if(status){
            setNewsList(res.data)
        }
    }

    const data = [
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/notification.png'),
            subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA',
            date: '02/02/2022',
        },
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/notification.png'),
                        subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA',
            date: '02/02/2022',
        },
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/notification.png'),
                        subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
            postDate: 'Posted On Jan 12, 2022',
            location: 'INDIA',
            date: '02/02/2022',
        },
        {
            title: 'What is Lorem Ipsum?',
            icon: require('../images/notification.png'),
                        subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
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
          <HeaderTop back={() => navigation.goBack()} title={StringsOfLanguages.news} />
          <FlatList
              data={newsList}
              renderItem={({ item }) => (
                  <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('NewsDetails',item)} style={{ flexDirection: 'row', backgroundColor: '#FFF', alignItems: 'center', marginTop: 16, marginHorizontal: 20, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 10 }}>
                      {/* <Image source={item.icon} style={{ width: 28, height: 28, resizeMode: 'contain' }} /> */}
                      <View style={{ marginLeft: 10,width:'100%' }}>
                          <Text style={{ color: COLORS.darkpurple, fontSize: 20 }}>{item.title}</Text>
                          <Text style={{ color: COLORS.darkpurple,}} numberOfLines={2}>{item.content}</Text>
                          <Text style={{ color: COLORS.darkpurple, textAlign: 'right', marginTop: 10, marginRight:10 }}>{item.date}</Text>
                      </View>
                  </TouchableOpacity>
              )}
          />
      </SafeAreaView>
    // <View style={{flex:1, justifyContent:'space-between'}}>
    //     <ScrollView>
    //     <Text>Hello</Text>
    //     <TextInput style={{backgroundColor:'red'}}/>
    //     </ScrollView>
    //     <View style={{position:'absolute', bottom:0}}>

    //         <Text>Hello</Text>
    //     </View>

    // </View>
  )
}

export default News

const styles = StyleSheet.create({})