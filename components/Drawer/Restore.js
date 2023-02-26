import React, { useState, useEffect } from 'react'
import { TouchableHighlight, View, StyleSheet, Dimensions, TouchableOpacity, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'
import * as ExpoFileSystem from 'expo-file-system'
import { db } from '../../utils';
export default function Restore({ navigation, route }) {


    const [state, setState] = useState()


    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        await ExpoFileSystem.readAsStringAsync(result.uri).then(res => {
            setState(JSON.parse(res))
        });

    }
    useEffect(() => {
        // console.log('Collection', state?.Collection)
        // console.log('Card', state?.Cards)
        //console.log('PRogress', state?.Progress)
        console.log('Categories', state?.Categories)
    }, [state])


    useEffect(() => {


        state?.Categories && state.Categories.forEach(x => {
            db.transaction(tx => {
                tx.executeSql('INSERT INTO Categories (name, color) values (?, ?)', [x.name, x.color],
                    (txObj, resultSet) => {
                        state?.Collection && state.Collection.forEach(e => {
                            //  console.log(e),
                            if (e.categoryId == x.id) {
                                db.transaction(tx => {
                                    tx.executeSql('INSERT INTO Collections (name, note, categoryId) values (?, ?, ?)', [e.name, e.note, resultSet.insertId],
                                        (txObj, resultSet2) => (console.log(resultSet2)
                                            , state?.Cards.forEach(e2 => {
                                                console.log('card', e2.CID, e.id)
                                                if (e2.CID == e.id) {
                                                    db.transaction(tx => {
                                                        tx.executeSql('INSERT INTO Cards (word, meaning, ex, image, CID, memorized, favorited) values (?, ?, ?, ?, ?, 0, 0)', [e2.word, e2.meaning, e2.ex, e2.image, resultSet2.insertId],
                                                            (txObj, resultSet) => console.log(resultSet)
                                                        ),
                                                            (txObj, error) => console.log('Error ', error)
                                                    })
                                                }
                                            })
                                        ),
                                        //  (txObj, error) => console.log('Error ', error)
                                    )
                                })
                            }

                        })
                    }
                    ,
                    (txObj, error) => console.log('Error ', error)
                )
            })
        })


        state?.Collection && state.Collection.forEach(e => {
            if (e.categoryId == 0) {
                db.transaction(tx => {
                    tx.executeSql('INSERT INTO Collections (name, note, categoryId) values (?, ?, ?)', [e.name, e.note, e.categoryId],
                        (txObj, resultSet) => (console.log(resultSet)
                            , state?.Cards.forEach(e2 => {
                                console.log('card', e2.CID, e.id)
                                if (e2.CID == e.id) {
                                    db.transaction(tx => {
                                        tx.executeSql('INSERT INTO Cards (word, meaning, ex, image, CID, memorized, favorited) values (?, ?, ?, ?, ?, 0, 0)', [e2.word, e2.meaning, e2.ex, e2.image, resultSet.insertId],
                                            (txObj, resultSet) => console.log(resultSet)
                                        ),
                                            (txObj, error) => console.log('Error ', error)
                                    })
                                }
                            })
                        ),
                        //  (txObj, error) => console.log('Error ', error)
                    )
                })
            }

        })
    }, [state])

    return (
        <View style={styles.base}>
            <View style={styles.navbar}>
                <View style={styles.sub_block}>
                    <TouchableHighlight style={{ padding: 10 }} onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={24} color="white" />
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.content}>


                <Text style={{ fontWeight: '800', fontSize: 40, marginBottom: 140, marginTop: 60 }}> Restore</Text>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'http://cdn.onlinewebfonts.com/svg/img_115498.png',
                    }}
                />
                <TouchableOpacity onPress={pickDocument}>
                    <View style={{ marginTop: 50, backgroundColor: '#492780', maxWidth: 200, paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>
                            Upload your data here !
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: "#e8deff",

    },
    sub_block: {
        width: '92%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,

    },
    content: {
        alignContent: 'center',
        alignItems: 'center'
    },
    navbar: {
        backgroundColor: '#6A197D',
        alignItems: 'center'
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
});
