import React, { useRef, useState, useEffect } from 'react'
import { TouchableHighlight, View, StyleSheet, Dimensions, TouchableOpacity, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { db } from '../../utils';
import { useIsFocused } from '@react-navigation/native';

const { StorageAccessFramework } = FileSystem;


export default function Backup({ navigation, route }) {


    const [data, setData] = useState(
        {
            Collection: [],
            Card: [],
            Categories: [],
            Progress: []

        })

    const isFocused = useIsFocused();


    // useEffect(() => {
    //     console.log('cards')
    //     db.transaction(tx => {
    //         tx.executeSql('SELECT * FROM Cards', null,
    //             (txObj, { rows: { _array } }) => console.log('cards', _array),
    //             (txObj, error) => console.log('Error ', error)
    //         )
    //     })
    // }, []);


    useEffect(() => {
        console.log('data')
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Collections', null,
                (txObj, { rows: { _array } }) => {
                    setData(preState => ({

                        ...preState,
                        Collection: _array

                    }))
                },
                (txObj, error) => console.log('Error ', error)
            )
            tx.executeSql('SELECT * FROM Cards', null,
                (txObj, { rows: { _array } }) => {
                    setData(preState => (
                        {
                            ...preState,
                            Cards: _array
                        }
                    ))
                },
                (txObj, error) => console.log('Error ', error)
            )
            tx.executeSql('SELECT * FROM Categories', null,
                (txObj, { rows: { _array } }) => {
                    setData(preState => (
                        {
                            ...preState,
                            Categories: _array
                        }
                    ))
                },
                (txObj, error) => console.log('Error ', error)
            )
            tx.executeSql('SELECT * FROM Progress', null,
                (txObj, { rows: { _array } }) => {
                    setData(preState => (
                        {
                            ...preState,
                            Progress: _array
                        }
                    ))
                },
                (txObj, error) => console.log('Error ', error)
            )
        })
    }, [isFocused]);

    useEffect(() => {
        console.log(data.Progress)
    }, [])
    const pathUri = useRef();

    function changeObjToJSON(data) {
        let myJSON = JSON.stringify(data);
        return myJSON;
    }

    async function createJSONFile(object) {
        // Chuyển object thành json
        let data = changeObjToJSON(object)

        // Mở hộp thoại rồi chọn thư mục để cấp quyền tạo file trong thư mục đó
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

        // Nếu thư mục cho phép thực hiện các thao tác trong đó thì ...
        if (permissions.granted) {

            // Lấy đường dẫn đến thư mục 
            let directoryUri = permissions.directoryUri;

            // Tạo file thử nghiệm sau đó xóa file đó để lấy đường dẫn chung : đường dẫn chung + tên file
            try {
                await StorageAccessFramework.createFileAsync(directoryUri, 'zzz.txt', 'text')
                    .then(async (fileUri) => {
                        pathUri.current = fileUri.replace('zzz.txt', '')
                        await StorageAccessFramework.deleteAsync(pathUri.current + 'zzz.txt')
                    })
            }
            catch (e) {
                alert(e)
            }

            // Tạo file json : Nếu có sẵn file có cùng tên thì viết trực tiếp vào file đó, nếu không có sẽ tạo file mới
            try {
                // Viết trực tiếp vào file có sẵn
                await StorageAccessFramework.writeAsStringAsync(pathUri.current + 'flashcard.json', data)
            }
            catch (err) {
                // Tạo file mới
                await StorageAccessFramework.createFileAsync(directoryUri, 'flashcard.json', 'application/json')
                    .then(async (fileUri) => {
                        await StorageAccessFramework.writeAsStringAsync(fileUri, data)
                    })
            }

        }
    }

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


                <Text style={{ fontWeight: '800', fontSize: 40, marginBottom: 140, marginTop: 60 }}> Back Up</Text>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://static.thenounproject.com/png/2406231-200.png',
                    }}
                />
                <TouchableOpacity onPress={() => createJSONFile(data)}>
                    <View style={{ marginTop: 50, backgroundColor: '#492780', maxWidth: 200, paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>
                            Dowload your data here !
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
