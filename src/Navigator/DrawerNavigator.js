import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../Screens/CustomDrawer';
import Home from '../Screens/Home'
const Drawer = createDrawerNavigator();
const DrawerNavigator = ({route}) => (
  // console.log("====== DrawerNAvigation Page route ",route)
  <Drawer.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Home"
    drawerStyle={{width: '90%'}}
    drawerContent={props => <CustomDrawer {...props} />}
    >
    <Drawer.Screen name="Home" component={Home}/>
  </Drawer.Navigator>
);
export default DrawerNavigator;
