import { async } from '@firebase/util';
import { setStatusBarStyle } from 'expo-status-bar';
import { useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { addCard, addCollection, addspending, getspending } from '../api/firebaseApi';

export const AddCard = ({ navigation, route }) => {
    const [cname, setCname] = useState('')
    const [cid, setCid] = useState()
    const [en, setEn] = useState('')
    const [vi, setVi] = useState('')
    const [ex, setEx] = useState('')
    useEffect(() => {
        setCname(route.params.name)
        setCid(route.params.id)
    }, []);
    useEffect(() => {
        //   console.log(route.params)
    }, [])
    const handle = () => {
        addCard({ en: en, vi: vi, cid: cid, ex: ex })
        setEn('')
        setVi('')
        // console.log(note, name)
    }
    return (<>

        <View>
            {/* <Button title='Add default' onPress={handle} ></Button> */}
            <Text>
                enlish card cua {cname}
            </Text>
            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to add money!"
                onChangeText={newname => setEn(newname)}
                defaultValue={en}

            />
            <Text>
                vi
            </Text>
            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to note!"
                onChangeText={newText => setVi(newText)}
                defaultValue={vi}
            />
            <Text>
                ex
            </Text>
            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to note!"
                onChangeText={newText => setEx(newText)}
                defaultValue={ex}
            />
            <Button title='add transaction' onPress={handle}>

            </Button>
            <Button title={cname || 'we'} onPress={handle}>

            </Button>

        </View>

    </>)
}