import { async } from '@firebase/util';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { addspending, getspending } from '../api/firebaseApi';

export const Test = ({ navigation }) => {


    const [data, setdata] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getspending().then(data => {
                setdata(data)
                console.log(data)
            }).then(() => {
            })
            //  console.log('Hello World!')
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {

    }, [])

    const handle = () => {
        navigation.navigate({ name: 'addSpending' })
    }


    return (<>

        <View>
            <Button title='add' onPress={handle} ></Button>
            {data.map((item, ind) => {
                return (
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate({ name: 'SpendingDetail', params: { id: item?.id, money: item?.money, note: item?.note } })}>
                            <Text>
                                {`${ind} \n id : ${item?.id} \n money : ${item?.money} \n note: ${item?.note}`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            })}



        </View>

    </>)
}