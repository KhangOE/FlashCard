import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AllCards, Backup, Progress, Restore, SQLiteTest } from '../components/Drawer';
import HomeStack from "./HomeStack"
import CustomDrawer from '../components/CustomDrawer';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native';
import safeAreaViewAndroid from '../safeAreaViewAndroid';


const Drawer = createDrawerNavigator();

export default function DrawerStack() {
    return (
        <SafeAreaView style={safeAreaViewAndroid.AndroidSafeArea}>
            <Drawer.Navigator
                drawerContent={props => <CustomDrawer {...props} />}
                screenOptions={{
                    headerShown: false,
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
                <Drawer.Screen name="Backup" component={Backup} options={{
                    drawerIcon: ({ color }) => (
                        <MaterialIcons name='backup' size={22} color={color} />
                    )
                }} />
                <Drawer.Screen name="Restore" component={Restore} options={{
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name='restore' size={22} color={color} />
                    )
                }} />
                <Drawer.Screen name="SQLiteTest" component={SQLiteTest} options={{
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name='calendar-check' size={22} color={color} />
                    )
                }} />
            </Drawer.Navigator>
        </SafeAreaView>
    );
}
