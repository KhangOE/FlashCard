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
    FontAwesome,
    AntDesign,
    Entypo,
    Feather,
    SimpleLineIcons,
} from "@expo/vector-icons";
import PracticeComplete from "./PracticeComplete";

const _data = [
    { word: "green", meaning: "mau xanh la" },
    { word: "red", meaning: "mau do" },
    { word: "yellow", meaning: "mau vang" },
    { word: "blue", meaning: "mau xanh lam" },
    { word: "orange", meaning: "mau cam" },
    { word: "purple", meaning: "mau tim" },
    { word: "black", meaning: "mau den" },
    { word: "white", meaning: "mau trang" },
];

function Card(props) {
    return (
        <TouchableHighlight
            style={[
                styles.card,
                props.isChoosing
                    ? (props.isAnswer ? { backgroundColor: "green" } : { backgroundColor: "red" })
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
    const [data, setData] = useState(_data.slice(0));
    const [question, setQuestion] = useState({});
    const [userChoice, setUserChoice] = useState('');
    const [complete, setComplete] = useState(false);
    const [isAnswer, setIsAnswer] = useState(false);

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

    useEffect(() => {
        if (userChoice != '') {
            if (userChoice === question.realAnswer) {
                setIsAnswer(true);
                data.shift();
                setTimeout(() => { setData(data) }, 5000)
                if (data.length != 0) {
                    setIsAnswer(false);
                    setQuestion({ quest: data[0].word, realAnswer: data[0].meaning, answers: get4Answers(data[0]) })
                    setUserChoice('')
                } else {
                    setComplete(true)
                }
            }
        }
    }, [userChoice]);

    useEffect(() => {
        setData(shuffle(data))
        setQuestion({ quest: data[0].word, realAnswer: data[0].meaning, answers: get4Answers(data[0]) })
    }, []);

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
                        <Question title={question.quest} />
                        {question?.answers?.map((i, idx) => <Card title={i} key={idx} onPress={() => setUserChoice(i)} isChoosing={userChoice === i} isAnswer={isAnswer} />)}
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
        minHeight: "100%",
        backgroundColor: "#DFDFDE",
    },
    card: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
        minHeight: 50,
        backgroundColor: "white"
    },
    cartQuestion: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
        minHeight: 200,
        backgroundColor: "white"
    },
    cardTitle: {
        //fontWeight: 700,
        fontSize: 16,
    },
});
