import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Button,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native";
import {
    AntDesign,
} from "@expo/vector-icons";
import PracticeComplete from "./PracticeComplete";
import { useIsFocused } from '@react-navigation/native';


const data = [
    { word: "one", meaning: "1", favorited: false },
    { word: "two", meaning: "2", favorited: false },
    { word: "three", meaning: "3", favorited: false },
    { word: "four", meaning: "4", favorited: false },
    { word: "five", meaning: "5", favorited: false },
    // { word: "six", meaning: "6", favorited: false },
    // { word: "seven", meaning: "7", favorited: false },
    // { word: "eight", meaning: "8", favorited: false },
    // { word: "nine", meaning: "9", favorited: false },
    // { word: "ten", meaning: "10", favorited: false },
    // { word: "eleven", meaning: "11", favorited: false },
    // { word: "twelve", meaning: "12", favorited: false },
    // { word: "thirteen", meaning: "13", favorited: false },
    // { word: "fourteen", meaning: "14", favorited: false },
    // { word: "fifteen", meaning: "15", favorited: false },
];

function Card(props) {
    return (
        <TouchableHighlight
            style={[
                styles.card,
                props.isChoosing
                    ? { backgroundColor: "red" }
                    : { backgroundColor: "white" },
            ]}
            onPress={props.onPress}
        >
            <View>
                <Text style={styles.cardTitle}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    );
}

export default function MatchCards({ navigation, route }) {
    const [words, setWords] = useState([]);
    const [meanings, setMeanings] = useState([]);

    const [firstWord, setFirstWord] = useState("");
    const [secondWord, setSecondWord] = useState("");

    const [complete, setComplete] = useState(false);
    const [wrongList, setWrongList] = useState([]);
    const [correctList, setCorrectList] = useState([])

    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    }

    function initialFetch(data) {
        setCorrectList(data.slice(0))

        var _words = shuffle(data.map((obj) => obj.word));
        var _meanings = shuffle(data.map((obj) => obj.meaning));

        setWords(_words);
        setMeanings(_meanings);
    }

    function matchWord(first, second) {
        if (data.find((obj) => obj.word === first).meaning === second) {
            return true;
        }
        return false;
    }

    const sleep = ms =>
        new Promise(resolve => setTimeout(resolve, ms));

    function findWord(word) {
        return data.find(x => x.word === word);
    }

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setComplete(false)
            setWrongList([])
            initialFetch(data)
        }
    }, [isFocused]);

    useEffect(() => {
        if (firstWord != "" && secondWord != "") {
            if (matchWord(firstWord, secondWord)) {
                if (words.length === 1 && meanings.length === 1) {
                    setComplete(true)
                }

                setWords(words.filter((item) => item != firstWord));
                setMeanings(meanings.filter((item) => item !== secondWord));

                setFirstWord("");
                setSecondWord("");
            } else {
                var newObj = findWord(firstWord)
                if (!wrongList.includes(newObj)) {
                    setWrongList(prev => [...prev, newObj])
                    setCorrectList(prev => prev.filter(x => x !== newObj))
                }
                sleep(200).then(() => {
                    setFirstWord('')
                    setSecondWord('')
                })
            }
        }
    }, [firstWord, secondWord]);

    useEffect(() => {
        if (complete) {
            navigation.navigate('PracticeComplete', { wrongList: wrongList, correctList: correctList })
        }
    }, [complete]);

    return (
        <View style={styles.base}>
            <View style={styles.navbar}>
                <View style={styles.sub_block}>
                    <TouchableHighlight>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableHighlight>
                </View>
            </View>

            <View style={styles.cardsContainer}>
                <ScrollView contentContainerStyle={{ flexDirection: "column", alignItems: "center" }} style={{ width: "50%", marginRight: 3, marginLeft: 6 }} showsHorizontalScrollIndicator={false}>
                    {words?.map((item, index) => (
                        <Card
                            title={item}
                            key={index}
                            onPress={() => setFirstWord(item)}
                            isChoosing={firstWord === item}
                        />
                    ))}
                </ScrollView>
                <ScrollView contentContainerStyle={{ flexDirection: "column", alignItems: "center" }} style={{ width: "50%", marginRight: 6, marginLeft: 3 }} showsHorizontalScrollIndicator={false}>
                    {meanings?.map((item, index) => (
                        <Card
                            title={item}
                            key={index}
                            onPress={() => setSecondWord(item)}
                            isChoosing={secondWord === item}
                        />
                    ))}
                </ScrollView>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    sub_block: {
        width: "92%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
    },
    navbar: {
        backgroundColor: "#6A197D",
        alignItems: "center",
    },
    cardsContainer: {
        flex: 1,
        backgroundColor: "#DFDFDE",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    card: {
        backgroundColor: "white",
        width: "100%",
        height: 50,
        margin: 3,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    cardTitle: {
        //fontWeight: 700,
        fontSize: 16,
    },
});
