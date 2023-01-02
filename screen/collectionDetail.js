import { async } from '@firebase/util';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { addspending, deleteSpending, getspending } from '../api/firebaseApi';

export const Detail = ({ navigation, route }) => {


  const [data, setdata] = useState([])
  const [id, setid] = useState()
  const [money, setMoney] = useState()
  const [note, setNote] = useState()
  useEffect(() => {
    if (route.params?.id) {
      setid(route.params?.id)
      setMoney(route.params?.money)
      setNote(route.params?.note)
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);


  const handle = async () => {


    await deleteSpending(id).then(() => {
      navigation.navigate("Spending")
      console.log('delete', id)
    })

  }
  return (<>

    <View>
      <Button title='delete' onPress={handle} ></Button>
      <Text>

        {`id : ${id}\nmoney: ${money}\nnote:${note}`}
      </Text>


    </View>

  </>)
}