import { async } from '@firebase/util';
import { setStatusBarStyle } from 'expo-status-bar';
import { useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { addCard, addCollection, addspending, getspending, main } from '../api/firebaseApi';

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
            <View>
                
                <Text style={{ height : 20, margin : 8}}>
                    Thuật ngữ 
                </Text>

            </View>

            <TextInput
                style={{height: 40 , 
                    backgroundColor: '#fff' , 
                    margin : 8, 
                    justifyContent: 'center',
                    borderRadius: 5,
                    //paddingVertical: 15,
                    paddingHorizontal: 10,
                    marginTop: 4}}
                placeholder=""
                onChangeText={newname => setEn(newname)}
                defaultValue={en}

            />
            <Text style={{ height : 20 , margin : 8}}>
                Định nghĩa
            </Text>

            <TextInput
                style={{ height: 40 , 
                    backgroundColor: '#fff' , 
                    margin : 8, 
                    justifyContent: 'center',
                    borderRadius: 5,
                    //paddingVertical: 15,
                    paddingHorizontal: 10,
                    marginTop: 4,
                }}
                placeholder=""
                onChangeText={newText => setVi(newText)}
                defaultValue={vi}
            />
            {/* <Text>
                ex
            </Text>
            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to note!"
                onChangeText={newText => setEx(newText)}
                defaultValue={ex}
            /> */}
            <Button title='Thêm thẻ' onPress={handle}>

            </Button>
            {/* <Button title={cname || 'we'} onPress={handle}>

            </Button> */}

        </View>

    </>)
}

const styles = StyleSheet.create({
    
  });