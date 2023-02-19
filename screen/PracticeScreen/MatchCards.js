import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
} from "react-native";
import {
    AntDesign,
} from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { getCardsbyCID } from "../../api/firebaseApi";


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

    const [firstWord, setFirstWord] = useState(null);
    const [secondWord, setSecondWord] = useState(null);

    const [complete, setComplete] = useState(false);
    const [wrongList, setWrongList] = useState([]);
    const [correctList, setCorrectList] = useState([])
    const [card, setCard] = useState([])

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setComplete(false)
            setWrongList([])
            const callApi = async () => {
                await getCardsbyCID({ cid: route.params || 1 }).then(d => {
                    setCard(d)
                    setCorrectList(d)
                    setWords(d)
                    setMeanings(shuffle(d.slice(0)))
                }).then(() => {
                })

            }
            callApi()
        }
    }, [isFocused]);

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

    const sleep = ms =>
        new Promise(resolve => setTimeout(resolve, ms));


    useEffect(() => {
        if (firstWord != null && secondWord != null) {
            if (firstWord.id === secondWord.id) {
                if (words.length === 1 && meanings.length === 1) {
                    setComplete(true)
                }

                setWords(words.filter((item) => item != firstWord));
                setMeanings(meanings.filter((item) => item !== secondWord));

                setFirstWord(null);
                setSecondWord(null);
            } else {
                if (!wrongList.includes(firstWord)) {
                    setWrongList(prev => [...prev, firstWord])
                    setCorrectList(prev => prev.filter(x => x !== firstWord))
                }
                sleep(200).then(() => {
                    setFirstWord(null)
                    setSecondWord(null)
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
                    <TouchableHighlight onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableHighlight>
                </View>
            </View>

            <View style={styles.cardsContainer}>
                <ScrollView contentContainerStyle={{ flexDirection: "column", alignItems: "center" }} style={{ width: "50%", marginRight: 3, marginLeft: 6 }} showsHorizontalScrollIndicator={false}>
                    {words?.map((item, index) => (
                        <Card
                            title={item.word}
                            key={index}
                            onPress={() => setFirstWord(item)}
                            isChoosing={firstWord === item}
                        />
                    ))}
                </ScrollView>
                <ScrollView contentContainerStyle={{ flexDirection: "column", alignItems: "center" }} style={{ width: "50%", marginRight: 6, marginLeft: 3 }} showsHorizontalScrollIndicator={false}>
                    {meanings?.map((item, index) => (
                        <Card
                            title={item.meaning}
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
        height: 60,
        margin: 3,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    cardTitle: {
        fontSize: 20,
    },
});
