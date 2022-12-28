import { StyleSheet, Text, View, FlatList, StatusBar, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { RadioButton } from 'react-native-paper';
import HeaderTop from '../Components/HeaderTop';
import { COLORS } from '../Constant/Colors';
import { ButtonStyle } from '../Custom/CustomView';
import { decode as atob, encode as btoa } from 'base-64'
import RazorpayCheckout from 'react-native-razorpay';
import { Api, LocalStorage } from '../services/Api';
import Toast from 'react-native-simple-toast'

const Subscription = ({ navigation, route }) => {
  const [plans, setPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState()
  const [checked, setChecked] = useState()
  const [state, setState] = useState({
    selectedIndex: '',
    planAmount: '',
    isLoading: false
  })

  useEffect(()=>{
    getPlansFromServer()
  },[])

  const getPlansFromServer = async() => {
    const response = await Api.getAllPlans()
    const {status} = response
    if(status){
      // alert(JSON.stringify(response,null,2))
      setPlans(response.data)
    }
  }

  const creditPlan = async () => {
    const body = {
      "user_id": route.params.user._id,
      "plan_id": selectedPlan
    }
    // alert(JSON.stringify(body,null,2))
    // return
    const res = await Api.creditPlan(body)
    // alert(JSON.stringify(res,null,2))
    // return
    const { status } = res;
    if (status) {
      alert("Plan Credited")
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigator' }]
      })
    } else {
      alert("Plan Failed To Credit")
    }
  }


  const makePayment = async () => {


    if(!selectedPlan){
      Toast.show('Please choose a package');
      return;
    }

    if(route.params.user.activeJobs > 0){
      alert("You cannot buy for jobs untill you finish existing jobs.")
      return;
    }


    const user = (await LocalStorage.getUserDetail() || '')
    const newUser = JSON.parse(user)
    // alert(JSON.stringify(newUser, null, 2))

      
      const body = {
        "amount": `${selectedPlan.price}00`,
        "currency": "INR",
        "receipt": "Receipt no. 1",
        "notes": {
          "notes_key_1": "Nick",
          "notes_key_2": "Nick"
        }
      }
      // alert(JSON.stringify(body,null,2))
      // return
      const res = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Basic ' + btoa('rzp_test_scykYirAHJJw4T' + ":" + 'LABt2nLITbpvQ8Uhw8GM1y7C'),
        },

        body: JSON.stringify(body)
      })
      const response = await res.json()
      console.log(response.id)

      var options = {
        description: 'BoomOverSeas',
        image: 'http://www.boomoverseas.com/img/logo.png',
        currency: 'INR',
        key: 'rzp_test_scykYirAHJJw4T',
        amount: `${selectedPlan.price}00`,
        name: 'BoomOverSeas',
        order_id: response.id,//Replace this with an order_id created using Orders API.
        prefill: {
          email: newUser.email,
          contact: `+91${newUser.number}`,
          name: newUser.name
        },
        theme: { color: '#53a20e' }
      }
      RazorpayCheckout.open(options).then((data) => {
        // handle success
        // alert(JSON.stringify(data,null,2));
        // alert('Payment Done')
        console.log(data)
        if (data.razorpay_payment_id) {
          // creditPlan(data, item)
          creditPlan()
        }
      }).catch((error) => {
        // handle failure
        alert('Payment Failed')
        // alert(`Error: ${error.code} | ${error.description}`);
      });
    
    //  else {
    //   if (leads < item.min_lead) {
    //     alert(`Minimum ${item.min_lead} leads require`)
    //   } else {

    //     const body = {
    //       "amount": `${leads * item.price_per_lead}00`,
    //       "currency": "INR",
    //       "receipt": "Receipt no. 1",
    //       "notes": {
    //         "notes_key_1": "Nick",
    //         "notes_key_2": "Nick"
    //       }
    //     }


    //     const res = await fetch('https://api.razorpay.com/v1/orders', {
    //       method: 'POST',
    //       headers: {
    //         "Content-Type": "application/json",
    //         'Authorization': 'Basic ' + btoa('rzp_test_scykYirAHJJw4T' + ":" + 'LABt2nLITbpvQ8Uhw8GM1y7C'),
    //       },

    //       body: JSON.stringify(body)
    //     })
    //     const response = await res.json()
    //     console.log(response.id)

    //     var options = {
    //       description: 'BoomOverSeas',
    //       image: 'http://www.boomoverseas.com/img/logo.png',
    //       currency: 'INR',
    //       key: 'rzp_test_scykYirAHJJw4T',
    //       amount: `${leads * item.price_per_lead}00`,
    //       name: 'BoomOverSeas',
    //       order_id: response.id,//Replace this with an order_id created using Orders API.
    //       prefill: {
    //         email: newUser.email,
    //         contact: `+91${newUser.contact_number}`,
    //         name: newUser.name
    //       },
    //       theme: { color: '#53a20e' }
    //     }
    //     RazorpayCheckout.open(options).then((data) => {
    //       // handle success
    //       // alert(JSON.stringify(data,null,2));
    //       // alert('Payment Done')
    //       console.log(data)
    //       if (data.razorpay_payment_id) {
    //         creditPlan(data, item)
    //       }
    //     }).catch((error) => {
    //       // handle failure
    //       alert('Payment Failed')
    //       // alert(`Error: ${error.code} | ${error.description}`);
    //     });
    //   }
    // }
  }


  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
      <HeaderTop back={() => navigation.goBack()} title={"Subscription"} />
      <Text style={{ fontSize: 18, color: '#333333', fontWeight: '900', textAlign: 'center' , marginTop:172}}>We've got a pricing plan that's perfect for you</Text>
      
      <FlatList
        data={plans}
        renderItem={({item, index})=>(
          <View style={{ height: 75, backgroundColor: '#fff', width: 340, alignSelf: 'center', borderRadius: 8, marginTop: 26,marginBottom:5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal:19, elevation:3 }}>
        <View style={{flexDirection:'row'}}>
          <RadioButton
            value={checked}
            status={checked === index ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(index)
              setSelectedPlan(item)
            }}
            uncheckedColor={COLORS.overseaspurple}
            color={COLORS.overseaspurple}
          />
          <View>
            <Text style={{color:'#333333', fontWeight:'900', fontSize:18}}>{item.title}</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={require('../images/check.png')} style={{height:12, width:12, resizeMode:'contain'}}/>
            <Text style={{color:'#333333', fontWeight:'500', fontSize:13}}>Apply for {item.jobs} jobs</Text>
            </View>
          </View>
        </View>
        <Text style={{color:'#333333', fontWeight:'900', fontSize:22}}>₹{item.price}/-</Text>
      </View>
        )}
      />

      {/* <View style={{ height: 75, backgroundColor: '#fff', width: 340, alignSelf: 'center', borderRadius: 8, marginTop: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal:19, elevation:5 }}>
        <View style={{flexDirection:'row'}}>
          <RadioButton
            value="third"
            status={checked === 'third' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('third')}
            uncheckedColor={COLORS.overseaspurple}
            color={COLORS.overseaspurple}
          />
          <View>
            <Text style={{color:'#333333', fontWeight:'900', fontSize:18}}>Basic</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={require('../images/check.png')} style={{height:12, width:12, resizeMode:'contain'}}/>
            <Text style={{color:'#333333', fontWeight:'500', fontSize:13}}>Apply for 5 jobs</Text>
            </View>
          </View>
        </View>
        <Text style={{color:'#333333', fontWeight:'900', fontSize:22}}>₹1000/-</Text>
      </View>

      <View style={{ height: 75, backgroundColor: '#fff', width: 340, alignSelf: 'center', borderRadius: 8, marginTop: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal:19, elevation:5 }}>
        <View style={{flexDirection:'row'}}>
          <RadioButton
            value="third"
            status={checked === 'third' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('third')}
            uncheckedColor={COLORS.overseaspurple}
            color={COLORS.overseaspurple}
          />
          <View>
            <Text style={{color:'#333333', fontWeight:'900', fontSize:18}}>Standard</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={require('../images/check.png')} style={{height:12, width:12, resizeMode:'contain'}}/>
            <Text style={{color:'#333333', fontWeight:'500', fontSize:13}}>Apply for 15 jobs</Text>
            </View>
          </View>
        </View>
        <Text style={{color:'#333333', fontWeight:'900', fontSize:22}}>₹3000/-</Text>
      </View>

      <View style={{ height: 75, backgroundColor: '#fff', width: 340, alignSelf: 'center', borderRadius: 8, marginTop: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal:19, elevation:5 }}>
        <View style={{flexDirection:'row'}}>
          <RadioButton
            value="third"
            status={checked === 'third' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('third')}
            uncheckedColor={COLORS.overseaspurple}
            color={COLORS.overseaspurple}
          />
          <View>
            <Text style={{color:'#333333', fontWeight:'900', fontSize:18}}>Premium</Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={require('../images/check.png')} style={{height:12, width:12, resizeMode:'contain'}}/>
            <Text style={{color:'#333333', fontWeight:'500', fontSize:13}}>Apply for 25 jobs</Text>
            </View>
          </View>
        </View>
        <Text style={{color:'#333333', fontWeight:'900', fontSize:22}}>₹5000/-</Text>
      </View> */}

      <View style={{ width: '100%', position: 'absolute', bottom: 10 }}>
        <ButtonStyle
          title={'Buy Now'}
          //   height={52}
          bgColor={'#261750'}
          // loader={state.isLoading}
          onPress={() => {
            // onRegisterHandler()
            makePayment()
          }}
        />
      </View>
    </View>
  )
}

export default Subscription

const styles = StyleSheet.create({
  topText: {
    fontSize: 18,
    fontFamily: 'Muli-SemiBold',
    fontWeight: '700',
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 10,
  },
  topSubtext: {
    fontSize: 14,
    fontFamily: 'Muli-Regular',
    fontWeight: '400',
    color: '#747A8D',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 5,
  },
  rate: {
    fontSize: 20,
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    color: '#FEFFFF',
    marginTop: 5,
    marginLeft: 15,
  },
  subText: {
    fontSize: 12,
    fontFamily: 'Muli-Regular',
    fontWeight: '400',
    color: '#FEFFFF',
    marginLeft: 15,
    marginTop: 5,
    lineHeight: 22,
  },
})