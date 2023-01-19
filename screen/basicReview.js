import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import { checkDoc } from '../api/firebaseApi';
import { Audio } from 'expo-av';
function BasicReviewScreen({ navigation, route }) {
    const [card, setCard] = useState([])
    const [sound, setSound] = useState();
    useEffect(() => {
        console.log(route.params)
        checkDoc({ cid: route.params }).then(data => {
            setCard(data)
            console.log(data)
            //  console.log(data)
        }).then(() => {
        })
    }, [])

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            { uri: `https://api.dictionaryapi.dev/media/pronunciations/en/white-us.mp3` },
            { shouldPlay: true }
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }
    useEffect(() => {
        playSound()
    }, [])
    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    return (
        <View style={styles.base}>
            {card.map(item => {
                return <>
                    <View>
                        <Text>
                            {item.vi}
                        </Text>
                    </View>
                </>
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        marginTop: 28,
        marginBottom: 30
    },
    sub_block: {
        width: '92%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 20
        //  height: '10vh',
    },
    navbar: {
        backgroundColor: '#6A197D',
        alignItems: 'center'
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30
    },
    topicTitle: {
        color: 'white',
        fontSize: 18,
        //fontWeight: 700
    },
    cardBlock: {
        backgroundColor: '#DFDFDE',
        flex: 1,
        backfaceVisibility: 'visible'
    },
    card: {
        backgroundColor: 'white',
        width: '80%',
        height: '80%',
        marginHorizontal: 'auto',
        marginTop: 25,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    cardWrapper: {
        alignItems: 'center',
        gap: 20
    },
    vocabulary: {
        fontSize: 30,
        //fontWeight: 700
    },
    sound: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 50,
        padding: 10
    },
    footerCard: {
        // height: '10vh',
        height: 20,
        paddingHorizontal: 40,
        paddingVertical: 5,
        marginBottom: '3%'
    },
    footerCardBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    }
});

export { BasicReviewScreen };