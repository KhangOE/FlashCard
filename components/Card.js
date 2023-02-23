import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { OptionBlock } from '../screen/OptionBlock';
import { addCardToFavorite, removeCardFromFavorite } from '../api/firebaseApi';

import * as Speech from 'expo-speech';
export default function Card(props) {
    const [show, setShow] = useState('none');


    async function playSound3() {
        const thingToSay = props.en;
        Speech.speak(thingToSay, { language: "en-US" });
    }




    function showBlock() {
        if (show == 'none') {
            setShow('flex');
        }
        else {
            setShow('none');
        }
    }
    return (
        <TouchableHighlight style={styles.card}>
            <View>
                <View>
                    <Text style={styles.cardTitle}>{props.en}</Text>
                </View>
                <View style={styles.cardMeaning}>
                    <Text>{props.vi}</Text>
                </View>
                <View style={styles.cardFooter}>
                    <Pressable onPress={() => {
                        playSound3()
                    }}>
                        <AntDesign name="sound" size={18} color="black" />
                    </Pressable>


                    <View style={styles.optBlock}>

                        {props.favorited ?
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => { removeCardFromFavorite(props.id), props.setFreshKey(state => state + 1) }}>
                                <AntDesign name="heart" size={18} color="red" />
                            </TouchableOpacity> :
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => { addCardToFavorite(props.id), props.setFreshKey(state => state + 1) }}>
                                <AntDesign name="hearto" size={18} color="black" />
                            </TouchableOpacity>}

                        <Pressable style={styles.cardOpion} onPress={() => {
                            showBlock()
                            props.setItem(props.item)
                        }}>
                            {(show == 'none') ? <Entypo name="dots-three-vertical" size={15} color="black" /> : <AntDesign name="close" size={15} color="black" />}
                        </Pressable>
                        <OptionBlock bottom={'101%'} right={-20} display={show} isRepairBtn={props.isRepairBtn} repairTopic={props.repairTopic} isDelete={props.isDelete} deleteTopic={props.deleteTopic} />
                    </View>
                </View>
            </View>
        </TouchableHighlight >
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        minWidth: '48%',
        paddingVertical: 5,
        paddingHorizontal: 12,
        marginBottom: 20,
        zIndex: 1
    },
    cardTitle: {
        fontWeight: '700',
        fontSize: 18
    },
    cardMeaning: {
        marginVertical: 5
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    optBlock: {
        flexDirection: 'row',
        paddingHorizontal: 8
    },
    cardOpion: {
        marginTop: 3
    },
});