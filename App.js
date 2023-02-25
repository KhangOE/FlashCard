import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './navigation/DrawerStack';
import { db } from './utils'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, (error, resultSet) => { });
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Categories (id INTEGER PRIMARY KEY AUTOINCREMENT, color TEXT, name TEXT)'
      )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Collections (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, note TEXT, categoryId INT )'
      )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Cards (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, meaning TEXT, ex TEXT, image TEXT, CID INT, memorized INT, favorited INT, FOREIGN KEY (CID) REFERENCES Collections(id) ON UPDATE CASCADE ON DELETE CASCADE)'
      )
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Progress (date TEXT PRIMARY KEY)'
      )
      //tx.executeSql('DROP TABLE IF EXISTS ', []);
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
