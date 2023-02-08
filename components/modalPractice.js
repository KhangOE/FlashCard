import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
//import { PracticeTag } from "./practicetag";


export const ModalPractice = (props) => {
    const { navigation } = props;
    //const [modalVisible, setModalVisible] = useState(false);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                // props.setVisible(state => !state);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{props.id}</Text>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('basicReview', props.id)}>
                            <View style={{ padding: 8 }}>
                                <Text>ôn tậpds cơ bản</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('MatchCards', props.id)}>
                            <View style={{ padding: 8 }}>
                                <Text>Nối từ</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('MultipleChoices', props.id)}>
                            <View style={{ padding: 8 }}>
                                <Text>Multiple Answers</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('MemoryGame', props.id)}>
                            <View style={{ padding: 8 }}>
                                <Text>Memory Game</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('practiceWrite', props.id)}>
                            <View style={{ padding: 8 }}>
                                <Text>write</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => props.setVisible(state => !state)}
                    >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal >

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
    }
});

