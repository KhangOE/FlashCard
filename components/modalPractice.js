import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, Image } from "react-native";
import CustomModal from "./CustomModal";
import { getCardsbyCID } from "../api/firebaseApi"
//import { PracticeTag } from "./practicetag";


export const ModalPractice = (props) => {
    const [error0, setError0] = useState(false)
    const [error4, setError4] = useState(false);
    const { id } = props;
    useEffect(() => {
        if (id) {
            getCardsbyCID({ cid: id }).then(data => {
                setError0(data.length === 0)
                setError4(data.length < 4)
            })
        }
    }, [id])
    const { navigation } = props;
    return (
        <CustomModal modalVisible={props.modalVisible} setModalVisible={props.setModalVisible} title='Practice'>
            {error0 && <Text style={{ textAlign: 'center', margin: 10 }}>Topic chưa có thẻ nào!</Text>}
            <View style={error0 && { opacity: 0.5 }}>
                <TouchableOpacity
                    disabled={error0}
                    onPress={() => {
                        navigation.navigate('basicReview', props.id)
                        props.setModalVisible(false);
                    }}>
                    <View style={styles.reviewItem}>
                        <View style={[styles.icon, { backgroundColor: "#F6E6C2" }]}>
                            <Image source={require("../assets/image/basic-review-icon.png")} style={{ flex: 1, width: undefined, height: undefined, resizeMode: "cover" }} />
                        </View>
                        <Text style={styles.reviewText}>Basic review</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={error0}
                    onPress={() => {
                        navigation.navigate('MatchCards', props.id)
                        props.setModalVisible(false);
                    }}>
                    <View style={styles.reviewItem}>
                        <View style={[styles.icon, { backgroundColor: "#913175" }]}>
                            <Image source={require("../assets/image/match-cards-icon.png")} style={{ flex: 1, width: undefined, height: undefined, resizeMode: "cover" }} />
                        </View>
                        <Text style={styles.reviewText}>Match cards</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={error0 || error4}
                    onPress={() => {
                        navigation.navigate('MultipleChoices', props.id)
                        props.setModalVisible(false);
                    }}>
                    <View style={[styles.reviewItem, error4 && { opacity: 0.5 }]}>
                        <View style={styles.icon}>
                            <Image source={require("../assets/image/multiple-choices-icon.png")} style={{ flex: 1, width: undefined, height: undefined, resizeMode: "cover" }} />
                        </View>
                        <Text style={styles.reviewText}>Multiple answers</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={error0}
                    onPress={() => {
                        navigation.navigate('MemoryGame', props.id)
                        props.setModalVisible(false);
                    }}>
                    <View style={styles.reviewItem}>
                        <View style={styles.icon}>
                            <Image source={require("../assets/image/memory-game-icon.png")} style={{ flex: 1, width: undefined, height: undefined, resizeMode: "cover" }} />
                        </View>
                        <Text style={styles.reviewText}>Memory game</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={error0}
                    onPress={() => {
                        navigation.navigate('practiceWrite', props.id)
                        props.setModalVisible(false);
                    }}>
                    <View style={styles.reviewItem}>
                        <View style={styles.icon}>
                            <Image source={require("../assets/image/writing-review-icon.png")} style={{ flex: 1, width: undefined, height: undefined, resizeMode: "cover" }} />
                        </View>
                        <Text style={styles.reviewText}>Writing review</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </CustomModal>

    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: '80%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    reviewItem: { padding: 8, flexDirection: 'row', marginVertical: 5, alignItems: 'center' },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    reviewText: {
        fontWeight: '500'
    },
});

