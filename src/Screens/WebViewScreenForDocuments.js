import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, ScrollView, Platform, Image, SafeAreaView, StatusBar,  } from "react-native";
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import HeaderTop from "../Components/HeaderTop";
import { COLORS } from "../Constant/Colors";
import { BASE_URL } from "../services/Config";


const SCREEN_WIDTH = Dimensions.get("window").width;

const WebViewScreenForDocuments = ({ navigation, route }) => {
    // alert(JSON.stringify(route.params,null,2))
    const [title, setTitle] = useState(route.params.title)

    function getTag() {
        return {
            p: { color: '#000' },
            a: { color: '#000', textDecorationLine: 'none' },
            h3: { color: '#000' },
            li: { color: '#000' },
            ul: { color: '#000' },
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.darkpurple} />
            <HeaderTop back={() => navigation.goBack()} title={route.params.title} />
            <WebView source={{ uri: `https://docs.google.com/gview?embedded=true&url=${BASE_URL}${route.params.url}` }} />
        </SafeAreaView>
    );
}

export default WebViewScreenForDocuments

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor:'#F5f5f5'
    },
    crossImage: {
        marginLeft: 20,
        width: '10%',
        padding: 5,
        // backgroundColor:'red'
        padding: 5,
        // backgroundColor: '#FFF',
        borderRadius: 10
    },
});