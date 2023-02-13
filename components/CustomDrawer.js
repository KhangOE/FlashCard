import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import { getCurrentUser } from '../api/firebaseApi'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export default function CustomDrawer(props) {
    const [user, setUser] = useState();

    useEffect(() => {
        getCurrentUser().then(data => setUser(data))
    }, [])

    // const user = getCurrentUser();

    const Logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#6A197D", paddingTop: 0 }}>
                <ImageBackground source={require('../assets/image/drawer-background.jpg')} style={{ padding: 20 }}>
                    <Image source={user?.image || require("../assets/image/user-icon.png")} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 5 }} />
                    <Text style={{ color: "#fff", fontSize: 14 }}>{user?.name}</Text>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>

            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
                <TouchableOpacity onPress={Logout}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name='logout' size={22} />
                        <Text style={{ fontSize: 15, marginLeft: 5 }}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
