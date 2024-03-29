import React, { useEffect, useRef, useState } from 'react'
import { TouchableHighlight, View, StyleSheet, Dimensions, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Card from '../Card';
import { ModalPractice } from '../modalPractice';

import { DeleteNotification } from '../../screen/deleteNotification'
import { RepairCardScreen } from '../../screen/repairCard';

import { db } from '../../utils'

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
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM Cards', null,
                    (txObj, { rows: { _array } }) => { setShownData(_array); setCard(_array) },
                    (txObj, error) => console.errror(error)
                )
            })
        });
        return unsubscribe;
    }, [navigation, freshKey]);


    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Cards', null,
                (txObj, { rows: { _array } }) => { setShownData(_array); setCard(_array) },
                (txObj, error) => console.error('Error in AllCards: ', error)
            )
        })

    }, [freshKey]);

    // Repair card
    const [isRepairBtn, setIsRepairBtn] = useState('none');
    // Delete notification
    const [isDelete, setIsDelete] = useState('none');
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
                    <TouchableOpacity style={[{ marginRight: 5, borderColor: '#6A197D', borderWidth: 1, borderRadius: 20, marginBottom: 10 }, selected === 'memorized' && { backgroundColor: "#6A197D" }]} onPress={() => { setShownData(card.slice(0).filter(item => item.memorized === 1)), setSelected('memorized') }}>
                        <Text style={[styles.cardTotal, selected === 'memorized' && { color: "#fff" }]}> Đã ghi nhớ : {card?.slice(0).filter(item => item.memorized === 1).length} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ marginRight: 5, borderColor: '#6A197D', borderWidth: 1, borderRadius: 20, marginBottom: 10 }, selected === 'notMemorized' && { backgroundColor: "#6A197D" }]} onPress={() => { setShownData(card.slice(0).filter(item => item.memorized === 0)), setSelected('notMemorized') }}>
                        <Text style={[styles.cardTotal, selected === 'notMemorized' && { color: "#fff" }]}> Chưa ghi nhớ : {card?.slice(0).filter(item => item.memorized === 0).length} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ borderColor: '#6A197D', borderWidth: 1, borderRadius: 20, marginBottom: 10 }, selected === 'favorited' && { backgroundColor: "#6A197D" }]} onPress={() => { setShownData(card.slice(0).filter(item => item.favorited === 1)), setSelected('favorited') }}>
                        <Text style={[styles.cardTotal, selected === 'favorited' && { color: "#fff" }]}> Đã thích : {card?.slice(0).filter(item => item.favorited === 1).length} </Text>
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

            {/* Cửa sổ nhỏ để sửa thông tin Topic*/}
            <RepairCardScreen display={isRepairBtn} handle={displayRepairTopicScreen} item={item} setCard={setCard} setFreshKey={setFreshKey} />

            {/* Cửa sổ nhỏ để xóa topic*/}
            <DeleteNotification display={isDelete} handle={displayDeleteNotification} id={item?.id} setCard={setCard} setFreshKey={setFreshKey} />
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
        paddingVertical: 10,
        flexWrap: 'wrap'
    },
    cardTotal: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
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
    }
});
