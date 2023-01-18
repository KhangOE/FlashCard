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

const data = [
    { word: "green", meaning: "mau xanh la" },
    { word: "red", meaning: "mau do" },
    { word: "yellow", meaning: "mau vang" },
    { word: "blue", meaning: "mau xanh lam" },
    { word: "one", meaning: "1" },
    { word: "two", meaning: "2" },
    { word: "three", meaning: "3" },
    { word: "four", meaning: "4" },
    { word: "five", meaning: "5" },
    { word: "six", meaning: "6" },
    { word: "seven", meaning: "7" },
    { word: "eight", meaning: "8" },
    { word: "nine", meaning: "9" },
    { word: "ten", meaning: "10" },
    { word: "eleven", meaning: "11" },
    { word: "twelve", meaning: "12" },
    { word: "thirteen", meaning: "13" },
    { word: "forteen", meaning: "14" },
    { word: "fifteen", meaning: "15" },
    { word: "sixteen", meaning: "16" },
    { word: "seventeen", meaning: "17" },
    { word: "eighteen", meaning: "18" },
    { word: "nineteen", meaning: "19" },
    { word: "twenty", meaning: "20" },
    { word: "twenty-one", meaning: "21" },
    { word: "twenty-two", meaning: "22" },
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

    const [errorNo, setErrorNo] = useState(0);
    const [complete, setComplete] = useState(false);

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

    function splitData(data) {
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

    useEffect(() => {
        splitData(data);
    }, []);

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
                setErrorNo((prev) => prev + 1);
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

            <View style={styles.cardSection}>
                {complete ? <PracticeComplete></PracticeComplete> :
                    (<View style={styles.cardsContainer}>
                        <ScrollView contentContainerStyle={{ flexDirection: "column", alignItems: "center" }}>
                            {words?.map((item, index) => (
                                <Card
                                    title={item}
                                    key={index}
                                    onPress={() => setFirstWord(item)}
                                    isChoosing={firstWord === item}
                                />
                            ))}
                        </ScrollView>
                        <ScrollView contentContainerStyle={{ flexDirection: "column", alignItems: "center" }}>
                            {meanings?.map((item, index) => (
                                <Card
                                    title={item}
                                    key={index}
                                    onPress={() => setSecondWord(item)}
                                    isChoosing={secondWord === item}
                                />
                            ))}
                        </ScrollView>
                    </View>)}
            </View>
        </View>
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
    cardSection: {
        backgroundColor: "#DFDFDE",
    },
    cardsContainer: {
        // flexGrow: 1,
        height: "50%",
        marginBottom: 100,
        backgroundColor: "#DFDFDE",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    card: {
        backgroundColor: "white",
        width: "90%",
        height: 50,
        marginBottom: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    cardTitle: {
        //fontWeight: 700,
        fontSize: 16,
    },
});
