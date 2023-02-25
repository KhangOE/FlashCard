import React from 'react'
import { TouchableHighlight, View, StyleSheet, Dimensions, TouchableOpacity, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';



export default function Backup({ navigation, route }) {
    return (
        <View style={styles.base}>
            <View style={styles.navbar}>
                <View style={styles.sub_block}>
                    <TouchableHighlight style={{ padding: 10 }} onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={24} color="white" />
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.content}>


                <Text style={{ fontWeight: '800', fontSize: 40, marginBottom: 140, marginTop: 60 }}> Back Up</Text>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://static.thenounproject.com/png/2406231-200.png',
                    }}
                />
                <TouchableOpacity>
                    <View style={{ marginTop: 50, backgroundColor: '#492780', maxWidth: 200, paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>
                            Dowload your data here !
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: "#e8deff",

    },
    sub_block: {
        width: '92%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,

    },
    content: {
        alignContent: 'center',
        alignItems: 'center'
    },
    navbar: {
        backgroundColor: '#6A197D',
        alignItems: 'center'
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
});
