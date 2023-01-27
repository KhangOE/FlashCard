import React, { useState } from 'react'
import { TouchableOpacity, Image, StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView } from 'react-native-web';


function ReviewPage(props) {
    return (
        <View style={styles.reviewContainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
                {props.data.map((obj, index) => {
                    return (
                        <View key={index} style={styles.reviewItem}>
                            <View>
                                <Text style={styles.reviewItemWord}>{obj.word}</Text>
                                <Text style={styles.reviewItemMeaning}>{obj.meaning}</Text>
                            </View>
                            <TouchableOpacity>
                                {obj.favorited ? <AntDesign name="heart" size={18} color="red" /> : <AntDesign name="hearto" size={18} color="red" />}
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

export default function PracticeComplete({ route, navigation }) {
    const { correctList, wrongList } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalTop}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Tab.Navigator>
                            <Tab.Screen name="wrong" children={() => <ReviewPage data={wrongList} />} options={{ tabBarLabel: 'Wrong: ' + wrongList.length }} />
                            <Tab.Screen name="correct" children={() => <ReviewPage data={correctList} />} options={{ tabBarLabel: 'Correct: ' + correctList.length }} />
                        </Tab.Navigator>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1, width: '100%', alignItems: "center" }}>
                <Image
                    source={require('../../assets/image/checked-icon.png')}
                    style={{ width: 50, height: 50 }}
                />
                <Text>Review complete!</Text>
                <View style={styles.sub_container}>
                    <Text>Summary</Text>
                    <Text style={{ color: "green" }}>Correct answers: {correctList.length}</Text>
                    <Text style={{ color: "red" }}>Incorrect answers: {wrongList.length}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.viewResultButton}><Text style={{ color: "blue" }}>view results</Text></TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: "row", width: '100%', marginBottom: 5 }}>
                    <TouchableOpacity style={styles.repeatButton} onPress={() => navigation.goBack()}><Text style={{ color: "blue" }}>repeat all</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.repeatButton} onPress={() => navigation.goBack()}><Text style={{ color: "blue" }}>repeat cards</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.doneButton} onPress={() => navigation.popToTop()}><Text style={{ color: "white" }}>done</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: 20,
        width: '90%',
    },
    sub_container: {
        width: "100%",
        paddingVertical: 10,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        gap: 10,
    },

    // modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        // backgroundColor: 'white',
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
        height: '80%',
        width: '80%'
    },
    modalTop: {
        height: 40,
        paddingLeft: 10,
        backgroundColor: "blue",
        justifyContent: "center"
    },
    reviewContainer: {
        flex: 1,
    },
    reviewItem: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: 'white',
        alignSelf: "stretch",
        justifyContent: "space-between",
        borderRadius: 2,
        margin: 2,
        paddingHorizontal: 5,
    },
    reviewItemWord: {
        fontWeight: "bold",
        fontSize: 14
    },
    reviewItemMeaning: {
        fontSize: 12
    },

    // main
    viewResultButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: "center",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'blue',
    },
    repeatButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: "center",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'blue',
        width: '50%',
    },
    doneButton: {
        backgroundColor: 'blue',
        textAlign: "center",
        paddingVertical: 5,
        borderRadius: 20,
        width: '100%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
