import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginScreen, RegisterScreen } from '../components/auth';
import { AllCards, Progress } from '../components/Drawer';
import HomeStack from "./HomeStack"
import CustomDrawer from '../components/CustomDrawer';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


const Drawer = createDrawerNavigator();

export default function DrawerStack() {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: "#6A197D",
                drawerActiveTintColor: "#fff",
                drawerInactiveTintColor: "#333",
                drawerLabelStyle: {
                    marginLeft: -15,
                    fontSize: 15
                }
            }}
        >
            <Drawer.Screen name="Home" component={HomeStack} options={{
                drawerIcon: ({ color }) => (
                    <MaterialCommunityIcons name='home' size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="All cards" component={AllCards} options={{
                drawerIcon: ({ color }) => (
                    <MaterialCommunityIcons name='cards' size={22} color={color} />
                )
            }} />
            <Drawer.Screen name="Progress" component={Progress} options={{
                drawerIcon: ({ color }) => (
                    <MaterialCommunityIcons name='calendar-check' size={22} color={color} />
                )
            }} />
        </Drawer.Navigator>
    );
}
