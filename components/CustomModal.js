import React from 'react'
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Feather from "react-native-vector-icons/Feather"


export default function CustomModal({ children, setModalVisible, modalVisible, title, fixedHeight = false }) {
    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={[styles.modalView, fixedHeight && { height: "80%" }]}>
                    <View style={styles.modalTop}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Feather name="x" size={20} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: "#fff", marginLeft: 10 }}>{title}</Text>
                    </View>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        // borderRadius: 20,
        // padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // height: '80%',
        width: '80%'
    },
    modalTop: {
        height: 40,
        paddingLeft: 10,
        backgroundColor: "#6A197D",
        alignItems: "center",
        flexDirection: 'row'
    },
})
