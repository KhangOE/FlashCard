import { async } from '@firebase/util';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { addspending, getspending } from '../api/firebaseApi';

export const Test = ({navigation})=>{
    

    const [data,setdata] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getspending().then(data =>{
                setdata(data)
            //    console.log(data)
            }).then(()=>{
            })
          //  console.log('Hello World!')
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(()=>{
       
    },[])

    const handle = ()=> {
        navigation.navigate({name:'addSpending'})
    }


    return(<>
   
    <View>
     <Button title='add' onPress={handle} ></Button>
           {data.map((item,id) =>{
            return (
                <View>
                    <Text>
                        <Button
                            title={'00'+id}
                            onPress={() => navigation.navigate({name:'SpendingDetail', params: { post: item?.id }})}
                        />
                    </Text>
                </View>
            )
           })}

         
          
        </View>
     
    </>)
}