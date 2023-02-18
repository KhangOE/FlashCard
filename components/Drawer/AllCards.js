import React, { useEffect, useRef, useState } from 'react'
import { TouchableHighlight, View, StyleSheet, Dimensions, Text, ScrollView, Pressable, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome, AntDesign, Entypo, Feather, SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { getCardsbyUID } from '../../api/firebaseApi';
import Card from '../Card';
import { ModalPractice } from '../modalPractice';

import { DeleteNotification } from '../../screen/deleteNotification'
import { RepairCardScreen } from '../../screen/repairCard';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


export default function AllCards({ navigation, route }) {
    const [card, setCard] = useState([])
    const [cid, setCid] = useState()
    const [item, setItem] = useState()
    const [freshKey, setFreshKey] = useState(1)
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [shownData, setShownData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState('all')


    const ref_input = useRef();
    useEffect(() => {
        setFilteredData(shownData.filter(i => {
            return i.word.toLowerCase().includes(search.toLowerCase()) ||
                i.meaning.toLowerCase().includes(search.toLowerCase())
        }))

    }, [search])

    useEffect(() => {
        setFilteredData(shownData.filter(i => {
            return i.word.toLowerCase().includes(search.toLowerCase()) ||
                i.meaning.toLowerCase().includes(search.toLowerCase())
        }))
    }, [shownData])

    useEffect(() => {
        if (showSearch) {
            () => ref_input.current.focus()
        }

    }, [showSearch])

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getCardsbyUID().then(data => {
                setShownData(data)
                setCard(data)

                //  console.log(data)
            }).then(() => {
            })
            //  console.log('Hello World!')
        });
        return unsubscribe;
    }, [navigation, freshKey]);


    useEffect(() => {
        getCardsbyUID().then(data => {
            setShownData(data)
            setCard(data)
        })

    }, [freshKey]);

    // Add card
    const [isPressBtn, setIsPressBtn] = useState('none');
    // Repair card
    const [isRepairBtn, setIsRepairBtn] = useState('none');
    // Delete notification
    const [isDelete, setIsDelete] = useState('none');
    function displayAddTopicScreen() {
        if (isPressBtn == 'none') {
            setIsPressBtn('flex');
        }
        else {
            setIsPressBtn('none');
        }
    }
    function displayRepairTopicScreen() {
        if (isRepairBtn == 'none') {
            setIsRepairBtn('flex');
        }
        else {
            setIsRepairBtn('none');
        }
    }
    function displayDeleteNotification() {
        if (isDelete == 'none') {
            setIsDelete('flex');
        }
        else {
            setIsDelete('none');
        }
    }

    return (
        <View style={styles.base}>
            <View style={styles.navbar}>
                <View style={styles.sub_block}>
                    <TouchableHighlight style={{ padding: 10 }} onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={24} color="white" />
                    </TouchableHighlight>

                    {showSearch ?
                        [
                            <TouchableHighlight style={{ padding: 10 }} onPress={() => {
                                setShowSearch(false)
                                setSearch('')
                            }}>
                                <FontAwesome name="arrow-left" size={20} color="white" />
                            </TouchableHighlight>,
                            <TextInput
                                autoFocus
                                ref={ref_input}
                                style={styles.input}
                                onChangeText={(e) => {
                                    setSearch(e)
                                }}
                                value={search}
                                placeholder="search..."

                            />

                        ]
                        : <TouchableHighlight style={{ marginRight: 20, padding: 10 }} onPress={() => setShowSearch(true)}>
                            <FontAwesome name="search" size={20} color="white" />
                        </TouchableHighlight>
                    }
                </View>
            </View>

            <View style={styles.cardList}>
                <ModalPractice modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} id={cid}></ModalPractice>
                <View style={styles.cardFirstBlock}>
                    <TouchableOpacity style={[{ marginRight: 5, borderColor: '#6A197D', borderWidth: 1, borderRadius: 20, marginBottom: 10 }, selected === 'all' && { backgroundColor: "#6A197D" }]} onPress={() => { setShownData(card), setSelected('all') }}>
                        <Text style={[styles.cardTotal, selected === 'all' && { color: "#fff" }]}> Tất cả : {card?.length} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ marginRight: 5, borderColor: '#6A197D', borderWidth: 1, borderRadius: 20 }, selected === 'memorized' && { backgroundColor: "#6A197D" }]} onPress={() => { setShownData(card.slice(0).filter(item => item.memorized === true)), setSelected('memorized') }}>
                        <Text style={[styles.cardTotal, selected === 'memorized' && { color: "#fff" }]}> Đã ghi nhớ : {card?.slice(0).filter(item => item.memorized === true).length} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ borderColor: '#6A197D', borderWidth: 1, borderRadius: 20 }, selected === 'notMemorized' && { backgroundColor: "#6A197D" }]} onPress={() => { setShownData(card.slice(0).filter(item => item.memorized === false)), setSelected('notMemorized') }}>
                        <Text style={[styles.cardTotal, selected === 'notMemorized' && { color: "#fff" }]}> Chưa ghi nhớ : {card?.slice(0).filter(item => item.memorized === false).length} </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingVertical: 10 }} style={styles.cardSecondBlock}>
                    {filteredData?.map((item) => {
                        return (
                            <View key={item.id}>

                                <Card item={item} vi={item.meaning} en={item.word} isRepairBtn={isRepairBtn} id={item.id} favorited={item.favorited} setFreshKey={setFreshKey} repairTopic={displayRepairTopicScreen} isDelete={isDelete} deleteTopic={displayDeleteNotification} setItem={setItem}></Card>
                            </View>

                        )
                    })}
                </ScrollView>
            </View>

            <View style={styles.cardThirdBlock}>
                <Pressable onPress={() => { setModalVisible(state => !state) }}>
                    <View style={styles.footerButton}>
                        <SimpleLineIcons name="graduation" size={24} color="white" />
                        <Text style={styles.footerText}>Thực hành</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => {
                    navigation.navigate('addCard', route.params
                    );
                    //displayAddTopicScreen();
                }}>
                    <View style={styles.footerButton}>
                        <Feather name="plus" size={24} color="white" />
                        <Text style={styles.footerText}>Thêm thẻ</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        // marginTop: 28
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
    optBlock: {
        paddingHorizontal: 8
    },
    cardList: {
        backgroundColor: '#DFDFDE'
    },
    cardFirstBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    cardTotal: {
        backgroundColor: '#6A197D',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: '#fff',
        fontWeight: '400',
        fontSize: 16
    },
    cardSecondBlock: {
        backgroundColor: '#DFDFDE',
        minHeight: height * 0.7,
        maxHeight: height * 0.77,
        paddingHorizontal: 14
    },
    card: {
        backgroundColor: '#fff',
        minWidth: '48%',
        paddingVertical: 5,
        paddingHorizontal: 12,
        marginBottom: 20,
        zIndex: 1
    },
    input: {
        width: '70%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    cardTitle: {
        fontWeight: '700',
        fontSize: 18
    },
    cardMeaning: {
        marginVertical: 5
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    cardOpion: {
        marginTop: 3
    },
    cardThirdBlock: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 8,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#fff'
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6A197D',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20
    },
    footerText: {
        marginLeft: 12,
        color: '#fff',
        fontWeight: '500'
    }
});
