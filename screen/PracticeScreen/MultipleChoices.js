import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
    FontAwesome,
    AntDesign,
    Entypo,
    Feather,
    SimpleLineIcons,
} from "@expo/vector-icons";
import PracticeComplete from "./PracticeComplete";
import { useIsFocused } from '@react-navigation/native';


const _data = [
    { word: "green", meaning: "mau xanh la", favorited: false },
    { word: "red", meaning: "mau do", favorited: true },
    { word: "yellow", meaning: "mau vang", favorited: false },
    { word: "blue", meaning: "mau xanh lam", favorited: true },
    { word: "orange", meaning: "mau cam", favorited: false },
    { word: "purple", meaning: "mau tim", favorited: true },
    { word: "black", meaning: "mau den", favorited: false },
    { word: "white", meaning: "mau trang", favorited: true },
];

function Card(props) {
    return (
        <TouchableHighlight
            style={[
                styles.card,
                props.isChoosing
                    ? (props.correct ? { backgroundColor: "green" } : { backgroundColor: "red" })
                    : { backgroundColor: "white" },
            ]}
            onPress={props.onPress}
        >
            <View>
                <Text style={[styles.cardTitle, props.style]}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    );
}

function Question(props) {
    return (
        <TouchableHighlight style={[styles.cartQuestion]}>
            <View>
                <Text style={[styles.cardTitle, props.style]}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    );
}

export default function MultipleChoices({ navigation, route }) {
    const [data, setData] = useState([]);
    const [question, setQuestion] = useState({});
    const [userChoice, setUserChoice] = useState('');
    const [complete, setComplete] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [wrongList, setWrongList] = useState([]);
    const [correctList, setCorrectList] = useState([]);

    async function initialFetch() {
        setData(shuffle(_data.slice(0)))
        setCorrectList(_data.slice(0))
    }

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (data.length != 0) {
            setQuestion({ data: data[0], answers: get4Answers(data[0]) })
        } else {
            setComplete(true)
        }
    }, [data])

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

    function get4Answers(obj) {
        var remaining = shuffle(_data?.filter(item => item !== obj))
        return shuffle([obj.meaning, remaining[0].meaning, remaining[1].meaning, remaining[2].meaning])
    }

    const sleep = ms =>
        new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        if (userChoice != '') {
            if (userChoice === question.data.meaning) {
                setCorrect(true);
            } else {
                if (!wrongList.includes(question.data)) {
                    setWrongList(prev => [...prev, question.data])
                    setCorrectList(prev => prev.filter(x => x !== question.data))
                }
            }

        }
    }, [userChoice]);

    useEffect(() => {
        if (correct) {
            sleep(500).then(() => {
                setData(data.slice(1))
                setCorrect(false)
                setUserChoice('')
            })
        }
    }, [correct])

    useEffect(() => {
        if (complete) {
            console.log("this run")
            navigation.navigate('PracticeComplete', { wrongList: wrongList, correctList: correctList })
        }
    }, [complete]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setComplete(false)
            setWrongList([])
            initialFetch()
        }
    }, [isFocused]);

    // useEffect(() => {
    //     setData(shuffle(data))
    //     setQuestion({ data: data[0], answers: get4Answers(data[0]) })
    // }, []);

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
                <Question title={question.data?.word} />
                {question?.answers?.map((i, idx) => <Card title={i} key={idx} onPress={() => setUserChoice(i)} isChoosing={userChoice === i} correct={correct} />)}
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
    cardsContainer: {
        flex: 1,
        backgroundColor: "#DFDFDE",
    },
    card: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 6,
        marginVertical: 3,
        minHeight: 50,
        backgroundColor: "white",
        borderRadius: 5
    },
    cartQuestion: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 6,
        marginVertical: 3,
        marginTop: 10,
        minHeight: 200,
        backgroundColor: "white",
        borderRadius: 5
    },
    cardTitle: {
        //fontWeight: 700,
        fontSize: 16,
    },
});
