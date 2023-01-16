import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather, SimpleLineIcons } from '@expo/vector-icons';

const data = [{ word: "green", meaning: "mau xanh la" }, { word: "red", meaning: "mau do" }, { word: "yellow", meaning: "mau vang" }, { word: "blue", meaning: "mau xanh lam" }]


function Card(props) {
    return (
        <TouchableHighlight style={[styles.card, props.isChoosing ? { backgroundColor: "red" } : { backgroundColor: "white" }]} onPress={props.onPress}>
            <View>
                <Text style={styles.cardTitle}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    );
}

export default function MatchCards({ navigation, route }) {

    const [words, setWords] = useState([])
    const [meanings, setMeanings] = useState([])

    const [firstWord, setFirstWord] = useState('');
    const [secondWord, setSecondWord] = useState('');

    const [errorNo, setErrorNo] = useState(0);

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    function splitData(data) {
        var _words = shuffle(data.map(obj => obj.word))
        var _meanings = shuffle(data.map(obj => obj.meaning))

        setWords(_words)
        setMeanings(_meanings)
    }

    function matchWord(first, second) {
        if (data.find(obj => obj.word === first).meaning === second) {
            return true
        }
        return false
    }

    useEffect(() => {
        splitData(data)
    }, []);


    useEffect(() => {
        if (words.length === 0 && meanings.length === 0) {
            console.log("you win")
        }
        if (firstWord != '' && secondWord != '') {
            if (matchWord(firstWord, secondWord)) {
                setWords(words.filter(item => item != firstWord))
                setMeanings(meanings.filter(item => item !== secondWord))

                setFirstWord('')
                setSecondWord('')
            }
            else {
                setErrorNo(prev => prev + 1)
            }
        } 
    }, [firstWord, secondWord]);


    return (
        <View style={styles.base}>
            <View style={styles.navbar}>
                <View style={styles.sub_block}>
                    <TouchableHighlight>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableHighlight>
                </View>
            </View>

            <View style={styles.cardList}>
                <View><Text>Số lần sai: {errorNo}</Text></View>
                <ScrollView contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }} style={styles.cardSecondBlock}>
                    <View style={{ flexDirection: "column" }}>
                        {words?.map((item, index) => <Card title={item} key={index} onPress={() => setFirstWord(item)} isChoosing={firstWord === item} />)}
                    </View>
                    <View style={{ flexDirection: "column" }}>
                        {meanings?.map((item, index) => <Card title={item} key={index} onPress={() => setSecondWord(item)} isChoosing={secondWord === item} />)}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        marginTop: 28
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
    cardList: {
        backgroundColor: '#DFDFDE'
    },
    cardFirstBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    cardTotal: {
        backgroundColor: '#6A197D',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: 'white',
        //fontWeight: 400,
        fontSize: 16
    },
    cardSecondBlock: {
        backgroundColor: '#DFDFDE',
        minHeight: 350,
        paddingHorizontal: 14
    },
    card: {
        backgroundColor: 'white',
        width: 140,
        maxWidth: 140,
        paddingVertical: 5,
        paddingHorizontal: 12,
        marginBottom: 5
    },
    cardTitle: {
        //fontWeight: 700,
        fontSize: 16
    },
    cardMeaning: {
        marginVertical: 5
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardOpion: {
        marginTop: 3
    },
    cardThirdBlock: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 8,
        // position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#DFDFDE',
        borderTopWidth: 1,
        borderTopColor: 'white'
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6A197D',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20
    },
    footerText: {
        marginLeft: 12,
        color: 'white',
        //fontWeight: 500
    }
});

