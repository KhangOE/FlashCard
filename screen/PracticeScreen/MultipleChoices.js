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

export default function MultipleChoices({ navigation, route }) {
    const [data, setData] = useState(_data.slice(0));
    const [question, setQuestion] = useState({});
    const [userChoice, setUserChoice] = useState('');
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

    function get4Answers(obj) {
        var remaining = shuffle(_data?.filter(item => item !== obj))
        return shuffle([obj.meaning, remaining[0].meaning, remaining[1].meaning, remaining[2].meaning])
    }

    useEffect(() => {
        if (userChoice != '') {
            if (userChoice === question.realAnswer) {
                data.shift();
                setData(data)
                if (data.length != 0) {
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

            <View style={styles.cardList}>
                {complete ? <PracticeComplete></PracticeComplete> : <ScrollView
                    contentContainerStyle={{
                        justifyContent: "space-between",
                    }}
                    style={styles.cardSecondBlock}
                >
                    <View>
                        <Card title={question.quest} />
                        {question?.answers?.map((i, idx) => <Card title={i} key={idx} onPress={() => setUserChoice(i)} isChoosing={userChoice === i} />)}
                    </View>
                </ScrollView>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        marginTop: 28,
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
    cardList: {
        backgroundColor: "#DFDFDE",
    },
    cardFirstBlock: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    cardTotal: {
        backgroundColor: "#6A197D",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: "white",
        //fontWeight: 400,
        fontSize: 16,
    },
    cardSecondBlock: {
        backgroundColor: "#DFDFDE",
        minHeight: 350,
        paddingHorizontal: 14,
    },
    card: {
        backgroundColor: "white",
        width: 140,
        maxWidth: 140,
        paddingVertical: 5,
        paddingHorizontal: 12,
        marginBottom: 5,
    },
    cardTitle: {
        //fontWeight: 700,
        fontSize: 16,
    },
    cardMeaning: {
        marginVertical: 5,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardOpion: {
        marginTop: 3,
    },
    cardThirdBlock: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 8,
        // position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#DFDFDE",
        borderTopWidth: 1,
        borderTopColor: "white",
    },
    footerButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6A197D",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    footerText: {
        marginLeft: 12,
        color: "white",
        //fontWeight: 500
    },
});
