import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderTop from '../Components/HeaderTop'
import { COLORS } from '../Constant/Colors'
import { LocalStorage } from '../services/Api'
import { decode as atob, encode as btoa } from 'base-64'
import RazorpayCheckout from 'react-native-razorpay';

const Payment = ({navigation}) => {
  const makePayment = async (item) => {
    const user = (await LocalStorage.getUserDetail() || '')
    const newUser = JSON.parse(user)
    if ('100' !== null) {
        // alert(JSON.stringify(newUser,null,2))
        // return
        const body = {
            "amount": `10000`,
            "currency": "INR",
            "receipt": "Receipt no. 1",
            "notes": {
                "notes_key_1": "Nick",
                "notes_key_2": "Nick"
            }
        }
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
            amount: `10000`,
            name: 'BoomOverSeas',
            order_id: response.id,//Replace this with an order_id created using Orders API.
            prefill: {
                email: newUser.email,
                contact: `+91${newUser.contact_number}`,
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
                creditPlan(data, item)
            }
        }).catch((error) => {
            // handle failure
            alert('Payment Failed')
            // alert(`Error: ${error.code} | ${error.description}`);
        });
    } else {
        if (leads < item.min_lead) {
            alert(`Minimum ${item.min_lead} leads require`)
        } else {

            const body = {
                "amount": `${leads * item.price_per_lead}00`,
                "currency": "INR",
                "receipt": "Receipt no. 1",
                "notes": {
                    "notes_key_1": "Nick",
                    "notes_key_2": "Nick"
                }
            }


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
                amount: `${leads * item.price_per_lead}00`,
                name: 'BoomOverSeas',
                order_id: response.id,//Replace this with an order_id created using Orders API.
                prefill: {
                    email: newUser.email,
                    contact: `+91${newUser.contact_number}`,
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
                    creditPlan(data, item)
                }
            }).catch((error) => {
                // handle failure
                alert('Payment Failed')
                // alert(`Error: ${error.code} | ${error.description}`);
            });
        }
    }
}
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
      <HeaderTop back={() => navigation.goBack()} title={'Payment'} />
      <View style={{height:200, width:'100%', backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity style={{backgroundColor:COLORS.darkpurple, paddingHorizontal:10, paddingVertical:5, borderRadius:20}} onPress={()=>makePayment()}>
          <Text style={{color:'#fff'}}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Payment

const styles = StyleSheet.create({})