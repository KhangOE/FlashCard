import { async } from '@firebase/util';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { addspending, getspending } from '../api/firebaseApi';

export const Add = ()=>{
    

  

    const handle = ()=> {
        addspending({money:123,note:'12'})
    }
    return(<>
   
    <View>
     <Button title='Add default' onPress={handle} ></Button>
        <Text>
            
        </Text>
         
          
        </View>
     
    </>)
}