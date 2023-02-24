import React, { useEffect, useState } from 'react'
import { TouchableHighlight, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useIsFocused } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('db.testDb')


export default function Progress({ navigation }) {
    const [dates, setDates] = useState({});

    const isFocused = useIsFocused();


    useEffect(() => {
        console.log('this run')
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Progress', null,
                (txObj, { rows: { _array } }) => {
                    const obj = {};
                    _array?.dates?.forEach(element => {
                        obj[element] = { selected: true };
                    });
                    setDates(obj)
                    console.log(obj)
                },
                (txObj, error) => console.error(error)
            )
        })

    }, [isFocused])

    return (
        <View style={styles.base}>
            <View style={styles.navbar}>
                <View style={styles.sub_block}>
                    <TouchableHighlight style={{ padding: 10 }} onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={24} color="white" />
                    </TouchableHighlight>
                </View>
            </View>
            <View>
                <Calendar
                    markedDates={dates}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
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

});
