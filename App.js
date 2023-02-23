import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './navigation/DrawerStack';
import * as SQLite from 'expo-sqlite'

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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoggedIn(true);
        setLoaded(true);
        setUser(currentUser);
      }
      return () => {
        unsubscribe();
      };
    });
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {loggedIn ? <DrawerStack /> : <AuthStack />}
    </NavigationContainer>

    //<View style={{ marginTop: 100 }}>
    // <Text>ádd</Text>
    //  <Button title='add' onPress={newCard}>ad</Button>
    //  </View>
  );
}
