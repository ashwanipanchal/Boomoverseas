import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { ButtonStyle, DisableButton } from '../Custom/CustomView'
import StringsOfLanguages from '../Constant/LanguageStrings'
import { LocalStorage } from '../services/Api'
import { useDispatch } from 'react-redux'
import * as action from '../redux/actions'

const SelectLanguage = ({navigation}) => {
  const dispatch = useDispatch()
    const [select, setSelect] = useState(0)
    const [selectedLang, setSelectLang] = useState('en')
    useEffect(()=>{
      checkSavedLang()
    },[])

    const checkSavedLang = async() => {
      const lng = (await LocalStorage.getLanguage() || '')
      alert(JSON.stringify(lng,null,2))
    }
    const languageData = [
        {
            "name": "English",
            "value": "en"
        },
        {
            "name": "Hindi",
            "value": "hi"
        },
        {
            "name": "Telugu",
            "value": "te"
        },
        {
            "name": "Tamil",
            "value": "ta"
        },
        {
            "name": "Kannada",
            "value": "ka"
        },
        {
            "name": "Bengali",
            "value": "be"
        },
        {
            "name": "Marathi",
            "value": "mr"
        },
        {
            "name": "Punjabi",
            "value": "pa"
        },
        {
            "name": "Gujarati",
            "value": "gu"
        },
        {
            "name": "Odia",
            "value": "od"
        },
        {
            "name": "Malyalam",
            "value": "ma"
        },
        {
            "name": "Urdu",
            "value": "ur"
        },
    ]
    const settext = async(value) => {
    StringsOfLanguages.setLanguage(value);
    // alert(JSON.stringify(value,null,2))
    await LocalStorage.setLanguage(value)
    dispatch(action.Language(value))
    navigation.navigate('JobOption');
    };

    const onTapChange = async(value) => {
      setSelectLang(value)
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar barStyle="dark-content"  backgroundColor="#FFF"/>
      {/* <Text style={{color:'#261750', fontSize:32, padding:30, fontWeight:'bold'}}>Pick Your{`\n`}Language</Text> */}
      <Text style={{color:'#261750', fontSize:32, padding:30, fontWeight:'bold'}}>{StringsOfLanguages.pickLang}</Text>
      <FlatList
            numColumns={2}
            // keyExtractor={item => item.id}
            style={{ marginTop: 10, }}
            data={languageData}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{width:'45%', marginHorizontal:10, marginBottom:30}}
                onPress={() => {
                  setSelect(index)
                  setSelectLang(item.value)
                  // onTapChange(item.value)
                }}>
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
          <View style={{ width: '100%', marginBottom:20 }}>
              <ButtonStyle
                  title={'Continue'}
                  height={52}
                  bgColor={'#261750'}
                  // loader={state.isLoading}
                  onPress={() => {
                      // navigation.navigate('JobOption');
                      settext(selectedLang)
                  }}
              />
          </View>
    </SafeAreaView>
  )
}

export default SelectLanguage

const styles = StyleSheet.create({})