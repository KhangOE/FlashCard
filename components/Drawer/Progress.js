import React, { useEffect, useState } from 'react'
import { TouchableHighlight, View, StyleSheet, Dimensions, Text, ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome, AntDesign, Entypo, Feather, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { getProgress } from '../../api/firebaseApi';
import { useIsFocused } from '@react-navigation/native';


export default function Progress({ navigation }) {
    const [dates, setDates] = useState({});

    const isFocused = useIsFocused();


    useEffect(() => {
        getProgress().then(data => {
            const obj = {};
            data?.dates.forEach(element => {
                obj[element] = { selected: true };
            });
            setDates(obj)
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

});
