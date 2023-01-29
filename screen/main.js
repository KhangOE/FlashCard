import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { PlusBtn } from '../components/PlusButton'
import { ModalPractice } from '../components/modalPractice';
import { useState, useEffect } from 'react';
import { getCollection } from '../api/firebaseApi';
import { collection } from 'firebase/firestore';

function TopicTag(props) {

    const handle = () => {
        navigation.navigate({ name: 'addSpending' })
    }

    return (
        <TouchableOpacity onPress={props.press}>
            <View style={styles.topicTag}>
                <View style={styles.topicTagSet}>
                    <View style={styles.topicFirstBlock}>
                        <Text style={styles.topicTitle}> {props.name}</Text>
                        <Entypo name="dots-three-vertical" size={15} color="black" />
                    </View>
                    <View style={styles.topicSecondBlock}>
                        <TouchableHighlight onPress={props.pressAdd}>
                            <View style={styles.topicAddButton}>
                                <AntDesign name="plus" size={16} color="white" />
                                <Text style={styles.topicFirstText}> Thêm thẻ </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.topicPractise} onPress={() => {
                            props.setvisible(state => !state)
                            props.setopic

                        }}>
                            <Text style={styles.topicSecondText}> Thực hành </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}



function MainScreen({ navigation }) {
    const [data, setdata] = useState([])
    const [topic, setTopic] = useState()


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getCollection().then(data => {
                setdata(data)
                console.log(data)
            }).then(() => {
            })
            //  console.log('Hello World!')
        });
        return unsubscribe;
    }, [navigation]);

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.base}>
            <ModalPractice visible={modalVisible} setVisible={setModalVisible} navigation={navigation}></ModalPractice>
            <ScrollView style={styles.topicList}>

                {data.map((item, idx) => {
                    return (
                        <TopicTag key={idx} settopic={() => { settopic(item.id) }} setvisible={setModalVisible} name={item.name} press={() => navigation.navigate('SpendingDetail', item)}
                            pressAdd={() => { navigation.navigate('addCard', item) }} />
                    )
                })}
            </ScrollView>

            <PlusBtn press={() => { navigation.navigate({ name: 'addSpending' }) }} />
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        marginTop: 28
    },
    sub_block: {
        width: '92%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    navbar: {
        backgroundColor: '#6A197D',
        alignItems: 'center'
    },
    topicList: {
        backgroundColor: '#DFDFDE',
        paddingTop: 5
    },
    topicTag: {
        backgroundColor: 'white',
        margin: 8,
        justifyContent: 'center',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 8
    },
    topicFirstBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topicSecondBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25
    },
    topicTitle: {
        fontWeight: '600',
        fontSize: 23
    },
    topicAddButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        justifyContent: 'space-between',
        backgroundColor: '#6A197D'
    },
    topicPractise: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        marginLeft: 5
    },
    topicFirstText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 3
    },
    topicSecondText: {
        color: 'blue',
        fontWeight: '600'
    }
});
export { MainScreen };

