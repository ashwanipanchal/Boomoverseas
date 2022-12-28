import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React,{useRef} from 'react'
import Splash from '../Screens/Splash';
import SelectLanguage from '../Screens/SelectLanguage';
import JobOption from '../Screens/JobOption';
import GetStarted from '../Screens/GetStarted';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import OTP from '../Screens/OTP';
import UploadDocuments from '../Screens/UploadDocuments';
import Home from '../Screens/Home';
import Industry from '../Screens/Industry';
import Search from '../Screens/Search';
import Profile from '../Screens/Profile';
import About from '../Screens/About';
import Media from '../Screens/Media';
import Notification from '../Screens/Notification';
import JobDetails from '../Screens/JobDetails';
import News from '../Screens/News';
import NewsDetails from '../Screens/NewsDetails';
import DrawerNavigator from './DrawerNavigator';
import TradeCenterList from '../Screens/TradeCenterList';
import SavedJobs from '../Screens/SavedJobs';
import IndustryJobList from '../Screens/IndustryJobList';
import EditProfile from '../Screens/EditProfile';
import UpcomingInterview from '../Screens/UpcomingInterview';
import MyJobs from '../Screens/MyJobs';
import RecommendedJobs from '../Screens/RecommendedJobs';
import Payment from '../Screens/Payment';
import Subscription from '../Screens/Subscription';
import Documents from '../Screens/Documents';
import ActivePackage from '../Screens/ActivePackage';
import SearchResult from '../Screens/SearchResult';
import WebViewScreen from '../Screens/WebViewScreen';



const Stack = createStackNavigator();

const StackNavigator = () => {
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    const screenOptionStyle = {
        // headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
    };

    const navigationRef = useRef();
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName={'Splash'}
                screenOptions={screenOptionStyle}>
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SelectLanguage"
                    component={SelectLanguage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="JobOption"
                    component={JobOption}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="GetStarted"
                    component={GetStarted}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DrawerNavigator"
                    component={DrawerNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OTP"
                    component={OTP}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UploadDocuments"
                    component={UploadDocuments}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Industry"
                    component={Industry}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Search"
                    component={Search}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SearchResult"
                    component={SearchResult}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="About"
                    component={About}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Media"
                    component={Media}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Notification"
                    component={Notification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="JobDetails"
                    component={JobDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="News"
                    component={News}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NewsDetails"
                    component={NewsDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TradeCenterList"
                    component={TradeCenterList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SavedJobs"
                    component={SavedJobs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="IndustryJobList"
                    component={IndustryJobList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpcomingInterview"
                    component={UpcomingInterview}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyJobs"
                    component={MyJobs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RecommendedJobs"
                    component={RecommendedJobs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Payment"
                    component={Payment}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Subscription"
                    component={Subscription}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ActivePackage"
                    component={ActivePackage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="WebViewScreen"
                    component={WebViewScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})