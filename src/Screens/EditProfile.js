import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Image, TouchableOpacity, Dimensions, Modal, FlatList } from 'react-native'
import React,{useState} from 'react'
import { COLORS } from '../Constant/Colors'
import HeaderTop from '../Components/HeaderTop'
import { TextInput } from 'react-native-paper'
const { height } = Dimensions.get('window');

const EditProfile = ({navigation}) => {
    const [number, setNumber] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const data = [
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
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
          <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
          <HeaderTop back={() => navigation.goBack()} title={"Edit Profile"} />
          <ScrollView>
              <View style={{ backgroundColor: COLORS.overseaspurple, height: 120 }}></View>
              <Image source={require('../images/profile.png')} style={{ alignSelf: 'center', marginTop: -60, width:140, height:140 }} />
              <TextInput
                  label="NAME"
                  value={number}
                  underlineColor={COLORS.overseaspurple}
                  activeUnderlineColor={COLORS.overseaspurple}
                  style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                  Outlined={'disabled'}
                  onChangeText={text => setNumber(text)}
              />
              <TextInput
                  label="FATHER'S NAME"
                  value={number}
                  underlineColor={COLORS.overseaspurple}
                  activeUnderlineColor={COLORS.overseaspurple}
                  style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                  Outlined={'disabled'}
                  onChangeText={text => setNumber(text)}
              />
              <TextInput
                  label="DATE OF BIRTH"
                  value={number}
                  underlineColor={COLORS.overseaspurple}
                  activeUnderlineColor={COLORS.overseaspurple}
                  style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                  Outlined={'disabled'}
                  onChangeText={text => setNumber(text)}
              />
              <View style={{ marginHorizontal: 20, color: COLORS.overseaspurple, borderBottomWidth: 1, paddingBottom: 20, marginTop: 5, justifyContent: 'space-between', }}>
                  <Text style={{ marginHorizontal: 10, color: 'gray', fontSize: 12 }}>SELECT INDUSTRY</Text>
                  <TouchableOpacity onPress={()=>setModalOpen(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }}>
                      <Text style={{ color: '#000', fontSize: 18 }}>IT</Text>
                      <Image source={require('../images/dropdown.png')} style={{ width: 24, width: 24, resizeMode: 'contain', alignSelf: 'flex-end' }} />
                  </TouchableOpacity>
              </View>
              <View style={{ marginHorizontal: 20,color: COLORS.overseaspurple, borderBottomWidth: 1, paddingBottom: 20, marginTop: 10, justifyContent: 'space-between', }}>
                  <Text style={{ marginHorizontal: 10, color: 'gray', fontSize: 12 }}>SELECT CATEGORY</Text>
                  <TouchableOpacity onPress={()=>setModalOpen(true)} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 5 }}>
                      <Text style={{ color: '#000', fontSize: 18 }}>IT</Text>
                      <Image source={require('../images/dropdown.png')} style={{ width: 24, width: 24, resizeMode: 'contain', alignSelf: 'flex-end' }} />
                  </TouchableOpacity>
              </View>
              <TextInput
                  label="WORK EXPERIENCE (YEARS)"
                  value={number}
                  underlineColor={COLORS.overseaspurple}
                  activeUnderlineColor={COLORS.overseaspurple}
                  style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                  Outlined={'disabled'}
                  onChangeText={text => setNumber(text)}
              />
              <TextInput
                  label="FOREIGN EXPERIENCE (YEARS)"
                  value={number}
                  underlineColor={COLORS.overseaspurple}
                  activeUnderlineColor={COLORS.overseaspurple}
                  style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                  Outlined={'disabled'}
                  onChangeText={text => setNumber(text)}
              />
              <TextInput
                  label="EDUCATION QUALIFICATION"
                  value={number}
                  underlineColor={COLORS.overseaspurple}
                  activeUnderlineColor={COLORS.overseaspurple}
                  style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                  Outlined={'disabled'}
                  onChangeText={text => setNumber(text)}
              />
              <TextInput
                  label="TECHNICAL QUALIFICATION"
                  value={number}
                  underlineColor={COLORS.overseaspurple}
                  activeUnderlineColor={COLORS.overseaspurple}
                  style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                  Outlined={'disabled'}
                  onChangeText={text => setNumber(text)}
              />
              <TextInput
                  label="ADDRESS"
                  value={number}
                  underlineColor={COLORS.overseaspurple}
                  activeUnderlineColor={COLORS.overseaspurple}
                  style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 }}
                  Outlined={'disabled'}
                  onChangeText={text => setNumber(text)}
              />
              <View style={{flexDirection:'row', width:'100%'}}>
              <TextInput
                  label="CITY"
                  value={number}
                  underlineColor={COLORS.overseaspurple}
                  activeUnderlineColor={COLORS.overseaspurple}
                  style={{ marginBottom: 10, backgroundColor: '#F5F5F5', marginHorizontal: 20 , width:'43%'}}
                  Outlined={'disabled'}
                  onChangeText={text => setNumber(text)}
              />
              <TextInput
                  label="STATE"
                  value={number}
                  underlineColor={COLORS.overseaspurple}
                  activeUnderlineColor={COLORS.overseaspurple}
                  style={{ marginBottom: 10, backgroundColor: '#F5F5F5',  width:'43%',  }}
                  Outlined={'disabled'}
                  onChangeText={text => setNumber(text)}
              />
              </View>
          </ScrollView>
          <Modal
              visible={modalOpen}
              animationType="none"
              statusBarTranslucent
              transparent={true}
              onRequestClose={() => setModalOpen(false)}>
              <TouchableOpacity  style={styles.modal_View}>
                  <View activeOpacity={0.8} style={styles.modelMainBox}>
                    <View style={{backgroundColor: COLORS.darkpurple, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20, paddingVertical:20, borderTopLeftRadius:10, borderTopRightRadius:10}}>
                        <Text style={{color:'#fff', fontSize:18}}>Choose Industry</Text>
                        <TouchableOpacity onPress={()=>setModalOpen(false)}>
                            <Image source={require('../images/check.png')} style={{width:24, height:24, resizeMode:'contain'}}/>
                        </TouchableOpacity>
                    </View>
                      <FlatList
                          data={data}
                          renderItem={({ item }) => (
                              <TouchableOpacity activeOpacity={0.9} style={{ flexDirection:'row', alignItems:'center', paddingVertical:10, paddingLeft:20 ,borderBottomColor:'gray', borderBottomWidth:0.5, }}>
                                  <Image source={item.icon} style={{ width: 32, height: 32 }} />
                                  <Text style={{ color: 'gray', fontSize: 18, marginLeft:10 , }}>{item.title}</Text>
                              </TouchableOpacity>
                          )}
                      />
                  </View>
              </TouchableOpacity>
          </Modal>
      </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    modal_View: {
        backgroundColor: '#000000aa',
        flex: 1,
        height:200
      },
      modelMainBox: {
        // padding: 10,
        height:400,
        backgroundColor: '#FFFFFF',
        marginTop: height / 3,
        marginHorizontal: 20,
        borderRadius: 10,
      },
      text: {
        fontFamily: 'Muli-Bold',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#1E1F20',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 25,
      },
})