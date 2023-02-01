import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated,
    Pressable,
    Easing,
} from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { checkDoc } from "../../api/firebaseApi";

function Card({ onPress, card, index, isInactive, isFlipped, isDisabled }) {
    const rotate = useRef(new Animated.Value(0)).current;
    const rotateFront = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });
    const rotateBack = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg']
    });

    function flipCard() {
        Animated.timing(rotate, {
            toValue: isFlipped ? 1 : 0,
            duration: 400,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        flipCard();
    }, [isFlipped])

    const handlePress = () => {
        if (!isFlipped && !isDisabled) {
            onPress(index)
        };
    };

    return (
        <Pressable style={[styles.card, { opacity: isInactive ? 0 : 100 }]} onPress={() => {
            handlePress()
        }}
            android_disableSound={true}>
            <View style={styles.cardWrapper}>
                <Animated.View style={[styles.cardFront, { transform: [{ rotateY: rotateFront }] }]}>
                </Animated.View>
                <Animated.View style={[styles.cardBack, { transform: [{ rotateY: rotateBack }] }]}>
                    <Text style={styles.cardBackText}>{card.data} </Text>
                </Animated.View>
            </View>
        </Pressable>
    );
}

export default function MemoryGame({ navigation, route }) {
    const [data, setData] = useState([])
    const [cards, setCards] = useState([]);
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [complete, setComplete] = useState(false)
    const timeout = useRef(null);
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setClearedCards([]);
            setOpenCards([]);
            setMoves(0);
            setComplete(false);
            setShouldDisableAllCards(false);
            const callApi = async () => {
                await checkDoc({ cid: route.params || 1 }).then(d => {
                    setData(d)
                    var words = (d.slice(0)).map(item => ({ data: item.word, id: item.id, isFlipped: false }))
                    var meanings = (d.slice(0)).map(item => ({ data: item.meaning, id: item.id, isFlipped: false }))
                    setCards(shuffle(words.concat(meanings)))
                }).then(() => {
                })
            }
            callApi()
        }
    }, [isFocused]);

    const disable = () => {
        setShouldDisableAllCards(true);
    };
    const enable = () => {
        setShouldDisableAllCards(false);
    };

    const evaluate = () => {
        const [first, second] = openCards;
        enable();
        if (cards[first].id === cards[second].id) {
            setClearedCards((prev) => ([...prev, cards[first].id]));
            setOpenCards([]);
            return;
        }
        // This is to flip the cards back after 500ms duration
        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);
    };

    const handleCardPress = (index) => {
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index]);
            setMoves((moves) => moves + 1);
            disable();
        } else {
            clearTimeout(timeout.current);
            setOpenCards([index]);
        }
    };

    useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
            timeout = setTimeout(evaluate, 300);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [openCards]);

    useEffect(() => {
        if (clearedCards.length != 0 && clearedCards.length === data.length) {
            setComplete(true);
        }
    }, [clearedCards]);

    useEffect(() => {
        complete && navigation.navigate("PracticeComplete", { moves: moves })
    }, [complete])

    const checkIsFlipped = (index) => {
        return openCards.includes(index);
    };

    const checkIsInactive = (card) => {
        return clearedCards.includes(card.id);
    };

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

    return (
        <ScrollView contentContainerStyle={{
            flex: 1,
            flexDirection: "row",
            flexWrap: 'wrap',
        }}>
            {cards.map((card, index) => {
                return (
                    <Card
                        key={index}
                        card={card}
                        index={index}
                        isDisabled={shouldDisableAllCards}
                        isInactive={checkIsInactive(card)}
                        isFlipped={checkIsFlipped(index)}
                        onPress={handleCardPress}
                    />
                );
            })}
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    card: {
        width: '46%',
        height: 80,
        marginTop: 10,
        marginHorizontal: '2%'
    },
    cardWrapper: {
        width: '100%',
        height: '100%'
    },
    cardFront: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        backgroundColor: 'gray'
    },
    cardBack: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        backgroundColor: 'white'
    },
    cardBackText: {
        fontSize: 20,
        fontWeight: '500',
        bottom: '10%'
    },
});
