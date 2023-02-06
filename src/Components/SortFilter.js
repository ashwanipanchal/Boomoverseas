import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { BASE_URL } from '../services/Config'

const SortFilter = () => {
  useEffect(()=>{
    getImage()
  },[])
  const getImage = async() => {
    const data = await fetch(`${BASE_URL}get_banner`)
    const res = await data.json()
    alert(JSON.stringify(res.data[0].icon,null,2))
  }
  return (
    <View>
    </View>
  )
}

export default SortFilter

const styles = StyleSheet.create({})