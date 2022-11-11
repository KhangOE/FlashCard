import { async } from '@firebase/util';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { addspending, deleteSpending, getspending } from '../api/firebaseApi';

export const Detail = ({navigation,route})=>{
    

    const [data,setdata] = useState([])
    const [id,setid] = useState()
    useEffect(() => {
        if (route.params?.post) {
            setid(route.params?.post)
          // Post updated, do something with `route.params.post`
          // For example, send the post to the server
        }
      }, [route.params?.post]);


    const handle = async ()=> {
       
        
      await deleteSpending(id).then(()=>{
       navigation.navigate("Spending")
       console.log('delete',id)
      })
      
    }
    return(<>
   
    <View>
     <Button title='delete' onPress={handle} ></Button>
        <Text>
            {id}
        </Text>
 
         
        </View>
     
    </>)
}