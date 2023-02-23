import React from 'react'
import { TouchableHighlight, View, StyleSheet, Dimensions, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


import * as SQLite from 'expo-sqlite'
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function SQLtest({ navigation, route }) {
    const db = SQLite.openDatabase('flashcard.db')

    const testSQL = () => {
        db.transaction(tx => {
            tx.executeSql('DROP TABLE categories', null,
                (txObj, resultSet) => { console.log(resultSet.rows._array) },
                (txObj, error) => console.error(error)
            )
        })
    }

    return (
        <View style={styles.base}>
            <View style={styles.navbar}>
                <View style={styles.sub_block}>
                    <TouchableHighlight style={{ padding: 10 }} onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={24} color="white" />
                    </TouchableHighlight>
                </View>
            </View>

            <View style={styles.cardList}>
                <TouchableOpacity onPress={testSQL} style={{ height: 100, width: 100, backgroundColor: 'red' }}>
                    <Text>Click here</Text>
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
        backgroundColor: '#DFDFDE',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
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
