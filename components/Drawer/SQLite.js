import React from 'react'
import { TouchableHighlight, View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';



export default function SQLite({ navigation, route }) {
    return (
        <View style={styles.base}>
            <View style={styles.navbar}>
                <View style={styles.sub_block}>
                    <TouchableHighlight style={{ padding: 10 }} onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={24} color="white" />
                    </TouchableHighlight>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 100, width: 100, backgroundColor: 'red' }}>
                    <Text style={{ textAlign: 'center' }}>Test SQL</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        // marginTop: 28
    },
    sub_block: {
        width: '92%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    navbar: {
        backgroundColor: '#6A197D',
        alignItems: 'center'
    },
    optBlock: {
        paddingHorizontal: 8
    },
    cardList: {
        backgroundColor: '#DFDFDE'
    },
    cardFirstBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexWrap: 'wrap'
    },
    cardTotal: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        fontWeight: '400',
        fontSize: 16
    }
});
