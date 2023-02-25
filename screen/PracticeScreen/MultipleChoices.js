import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from "react-native";
import {
    AntDesign,
} from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { db } from '../../utils'



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
    const [userChoice, setUserChoice] = useState(null);
    const [complete, setComplete] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [wrongList, setWrongList] = useState([]);
    const [correctList, setCorrectList] = useState([]);
    const [card, setCard] = useState([])

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setComplete(false)
            setWrongList([])
            const callApi = async () => {
                db.transaction(tx => {
                    tx.executeSql('SELECT * FROM Cards WHERE CID = ?', [route.params],
                        (txObj, { rows: { _array } }) => {
                            setCard(_array)
                            setData(shuffle(_array))
                            setCorrectList(shuffle(_array.slice(0)))
                        },
                        (txObj, resultSet) => { console.error(resultSet) }
                    )
                })

            }
            callApi()
        }
    }, [isFocused]);

    const firstUpdate = useRef(true);


    // if data change (because of shift) update question 
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

    // make 4 answers for a question
    function get4Answers(obj) {
        var remaining = shuffle(card?.filter(item => item !== obj))
        return shuffle([obj, remaining[0], remaining[1], remaining[2]])
    }

    const sleep = ms =>
        new Promise(resolve => setTimeout(resolve, ms));

    // if user choice an answer, check if its true, if its false, check if the question
    // already in the wrong list or not and if its not, add to wrong list and remove 
    // from correct list
    useEffect(() => {
        if (userChoice != null) {
            if (userChoice.id === question.data.id) {
                setCorrect(true);
            } else {
                if (!wrongList.includes(question.data)) {
                    setWrongList(prev => [...prev, question.data])
                    setCorrectList(prev => prev.filter(x => x !== question.data))
                }
            }

        }
    }, [userChoice]);

    // if correct flag was raised, pause the app for 0,5s then shift data by 1
    useEffect(() => {
        if (correct) {
            sleep(500).then(() => {
                setData(data.slice(1))
                setCorrect(false)
                setUserChoice(null)
            })
        }
    }, [correct])

    useEffect(() => {
        if (complete) {
            navigation.navigate('PracticeComplete', { wrongList: wrongList, correctList: correctList })
        }
    }, [complete]);



    return (
        <View style={styles.base}>
            <View style={styles.navbar}>
                <View style={styles.sub_block}>
                    <TouchableHighlight onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableHighlight>
                </View>
            </View>

            <View style={styles.cardsContainer}>
                <Question title={question.data?.word} />
                {question?.answers?.map((i, idx) => <Card title={i.meaning} key={idx} onPress={() => setUserChoice(i)} isChoosing={userChoice === i} correct={correct} />)}
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
        minHeight: 60,
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
        fontSize: 20,
    },
});
