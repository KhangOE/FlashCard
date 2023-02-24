import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"

export default function CustomDrawer(props) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#6A197D", paddingTop: 0 }}>
                <ImageBackground source={require('../assets/image/drawer-background.jpg')} style={{ padding: 20 }}>
                    <Image source={require("../assets/image/user-icon.png")} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 5 }} />
                    <Text style={{ color: "#fff", fontSize: 14 }}>admin</Text>
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>

            </DrawerContentScrollView>
        </View>
    )
}
