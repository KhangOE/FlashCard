import { async } from '@firebase/util';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { addspending, getspending } from '../api/firebaseApi';

export const Add = () => {

    const [text, setText] = useState('')
    const [note, setNote] = useState('')

    const handle = () => {
        addspending({ money: text, note: note })
        setNote('')
        setText('')
        console.log(note, text)
    }
    return (<>

        <View>
            <Button title='Add default' onPress={handle} ></Button>
            <Text>
                thêm số tiền
            </Text>
            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to add money!"
                onChangeText={newText => setText(newText)}
                defaultValue={text}

            />
            <Text>
                ghi chu
            </Text>
            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to note!"
                onChangeText={newText => setNote(newText)}
                defaultValue={note}


            />
            <Button title='add transaction' onPress={handle}>

            </Button>

        </View>

    </>)
}