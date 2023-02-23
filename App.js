import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './navigation/DrawerStack';
import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('db.testDb') // returns Database object

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'PRAGMA foreign_keys = ON'
      )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Collections (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, note TEXT, categoryId INT REFERENCES Categories(id) )'
      )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Cards (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, meaning TEXT, ex TEXT, image TEXT, CID INT REFERENCES Collections(id), memorized INT, favorited INT)'
      )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Categories (id INTEGER PRIMARY KEY AUTOINCREMENT, color TEXT, name TEXT)'
      )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Progress (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT)'
      )
      //tx.executeSql('DROP TABLE IF EXISTS Card', []);
    })
    setIsLoading(false)
  }, [])

  if (isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  }

  return (
    <NavigationContainer>
      <DrawerStack></DrawerStack>
    </NavigationContainer>
  );
}
