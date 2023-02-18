import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView } from 'react-native';
import CustomModal from "../../components/CustomModal"
import { addCardToFavorite, addDate, memorizedCard, notMemorizedCard, removeCardFromFavorite } from '../../api/firebaseApi';


function ReviewPage(props) {
    return (
        <View style={styles.reviewContainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsHorizontalScrollIndicator={false}>
                {props.data.map((obj, index) => {
                    const [favorited, setFavorited] = useState(obj.favorited)
                    return (
                        <View key={index} style={styles.reviewItem}>
                            <View>
                                <Text style={styles.reviewItemWord}>{obj.word}</Text>
                                <Text style={styles.reviewItemMeaning}>{obj.meaning}</Text>
                            </View>
                            {favorited ?
                                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => { removeCardFromFavorite(obj.id), setFavorited(false) }}>
                                    <AntDesign name="heart" size={18} color="red" />
                                </TouchableOpacity> :
                                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => { addCardToFavorite(obj.id), setFavorited(true) }}>
                                    <AntDesign name="hearto" size={18} color="black" />
                                </TouchableOpacity>}
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

export default function PracticeComplete({ route, navigation }) {
    const { correctList, wrongList, moves } = route.params;
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        let yourDate = new Date()
        addDate(yourDate.toISOString().split('T')[0])
        if (!moves) {
            wrongList?.map(item => notMemorizedCard(item.id))
            correctList?.map(item => memorizedCard(item.id))
        }
    }, [])

    return (
        <View style={styles.container}>
            <CustomModal setModalVisible={setModalVisible} modalVisible={modalVisible} fixedHeight={true}>
                <Tab.Navigator>
                    <Tab.Screen name="wrong" children={() => <ReviewPage data={wrongList} />} options={{ tabBarLabel: 'Wrong: ' + wrongList?.length }} />
                    <Tab.Screen name="correct" children={() => <ReviewPage data={correctList} />} options={{ tabBarLabel: 'Correct: ' + correctList?.length }} />
                </Tab.Navigator>
            </CustomModal>
            <View style={{ flex: 1, width: '100%', alignItems: "center" }}>
                <Image
                    source={require('../../assets/image/checked-icon.png')}
                    style={{ width: 80, height: 80 }}
                />
                <Text style={{ fontSize: 20, marginVertical: 10 }}>Review complete!</Text>
                <View style={styles.sub_container}>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Summary</Text>
                    <Text style={{ color: "green", fontSize: 20, marginBottom: 10 }}>Correct answers: {correctList?.length}</Text>
                    <Text style={{ color: "red", fontSize: 20, marginBottom: 10 }}>Incorrect answers: {wrongList?.length}</Text>
                    {moves !== undefined ? <Text style={{ color: "orange", fontSize: 20, marginBottom: 10 }}>Number of moves: {moves}</Text> :
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.viewResultButton}>
                            <Text style={{ color: "blue", fontSize: 20, height: 30, justifyContent: 'center' }}>view results</Text>
                        </TouchableOpacity>}
                </View>
            </View>
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: "row", width: '100%', marginBottom: 10 }}>
                    <TouchableOpacity style={styles.repeatButton} onPress={() => navigation.goBack()}><Text style={{ color: "blue", fontSize: 20 }}>repeat all</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.repeatButton} onPress={() => navigation.goBack()}><Text style={{ color: "blue", fontSize: 20 }}>repeat cards</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.doneButton} onPress={() => navigation.popToTop()}><Text style={{ color: "white", fontSize: 20 }}>done</Text></TouchableOpacity>
            </View>
        </View >
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
        marginVertical: 10
    },
    repeatButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'blue',
        width: '50%',
        height: 40,
    },
    doneButton: {
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        borderRadius: 20,
        width: '100%',
        height: 40
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
