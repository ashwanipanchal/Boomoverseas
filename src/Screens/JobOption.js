import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity,Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
const { height, width } = Dimensions.get('window');
import StringsOfLanguages from '../Constant/LanguageStrings'
import { LocalStorage } from '../services/Api';

const JobOption = ({navigation, route}) => {
    const [select, setSelect] = useState(0)

      useEffect(() => {
        getLanguageFrom()
        let heading = '';
        // if (route.params.selectedLanguage == 'hi') {
        //   heading = 'Selected Language Hindi';
        // } else if (route.params.selectedLanguage == 'ma') {
        //   heading = 'Selected Language Marathi';
        // } else if (route.params.selectedLanguage == 'en') {
        //   heading = 'Selected Language English';
        // } else if (route.params.selectedLanguage == 'fr') {
        //   heading = 'Selected Language French';
        // }
        navigation.setOptions({title: heading});
      }, []);

      const getLanguageFrom = async() => {
        const lng = (await LocalStorage.getLanguage() || '')
        alert(JSON.stringify(lng,null,2))
      }
    const languageData = [
        {
            "name": StringsOfLanguages.jobSeeker,
            "value": "seeker"
        },
        {
            "name": StringsOfLanguages.jobProvider,
            "value": "provider"
        },
    ]
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
          <View style={{}}>
            <Text style={{color:'#261750', fontSize:22, padding:30, fontWeight:'bold', textAlign:'center', marginTop: height/3.5}}>{StringsOfLanguages.chooseJob}</Text>
            <FlatList
            numColumns={1}
            // keyExtractor={item => item.id}
            data={languageData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{width:'90%', marginHorizontal:10, marginBottom:30, alignSelf:'center'}}
                onPress={() => navigation.navigate("GetStarted")}>
                <View
                  style={{
                    backgroundColor: index == select ? '#261750' : '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 5,
                    paddingVertical: 12,
                    borderRadius: 30,
                    borderWidth:0.5,
                    borderColor: '#261750'
                  }}
                  >
                  <Text
                    style={{
                      fontFamily: 'Poopins',
                      fontSize: 18,
                      fontWeight: '900',
                      color: index == select ? "#fff" : '#261750',
                      textAlign: 'center',
                    }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
            </View>
      </SafeAreaView>
  )
}

export default JobOption

const styles = StyleSheet.create({})