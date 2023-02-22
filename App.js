import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import HomeStack from "./navigation/HomeStack"
import DrawerStack from './navigation/DrawerStack';

import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('db.testDb') // returns Database object

export default function App() {
  useEffect(() => {
    console.log('in')
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Collection (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, note TEXT)'
      )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Cards (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, meaning TEXT, ex TEXT, image TEXT, CID INT, memorized INT, favorite INT)'
      )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Categorys (id INTEGER PRIMARY KEY AUTOINCREMENT, color TEXT, name TEXT)'
      )
      //tx.executeSql('DROP TABLE IF EXISTS Card', []);
    })
  }, [])

  useEffect(() => {
    //  newCard()
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'DROP TABLE cards;', [],
    //     (tx, results) => {
    //       if (results && results.rows && results.rows._array) {
    //         /* do something with the items */
    //         // results.rows._array holds all the results.
    //         console.log(JSON.stringify(results.rows._array));
    //         console.log('table dropped')
    //       } else {
    //         console.log('no results')
    //       }
    //     },
    //     (tx, error) => {
    //       console.log(error);
    //     }
    //   )
    // });
  }, [])




  return (
    <NavigationContainer>

      <DrawerStack></DrawerStack>
    </NavigationContainer>

    //<View style={{ marginTop: 100 }}>
    // <Text>ádd</Text>
    //  <Button title='add' onPress={newCard}>ad</Button>
    //  </View>
  );
}
