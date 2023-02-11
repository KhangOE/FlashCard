import { async } from '@firebase/util';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { addCollection, addspending, getspending } from '../api/firebaseApi';

export const Add = () => {

    const [name, setName] = useState('')
    const [note, setNote] = useState('')

    const handle = () => {
        addCollection({ name: name, note: note })
        setNote('')
        setName('')
        console.log(note, name)
    }
    return (<>

        <View>
            {/* <Button title='Add default' onPress={handle} ></Button> */}
            <Text style={{ height: 20, margin: 8 }}>
                Tên
            </Text>
            <TextInput
                style={{
                    height: 40,
                    backgroundColor: '#fff',
                    margin: 8,
                    justifyContent: 'center',
                    borderRadius: 5,
                    //paddingVertical: 15,
                    paddingHorizontal: 10,
                    marginTop: 4,
                }}
                placeholder=""
                onChangeText={newname => setName(newname)}
                defaultValue={name}

            />
            <Text style={{ height: 20, margin: 8 }}>
                Mô tả - không bắt buộc
            </Text>
            <TextInput
                style={{
                    height: 40,
                    backgroundColor: '#fff',
                    margin: 8,
                    justifyContent: 'center',
                    borderRadius: 5,
                    //paddingVertical: 15,
                    paddingHorizontal: 10,
                    marginTop: 4,
                }}
                placeholder=""
                onChangeText={newText => setNote(newText)}
                defaultValue={note}


            />
            <Button title='Thêm bộ' onPress={handle}>

            </Button>

        </View>

    </>)
}