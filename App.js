import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './navigation/DrawerStack';
import * as SQLite from 'expo-sqlite'

// LogBox.ignoreAllLogs()

export default function App() {
  const db = SQLite.openDatabase('flashcard.db')
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, color TEXT) ')
    })

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS collections (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, note TEXT, categoryId INTEGER REFERENCES categories(id)) ')
    })

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, meaning TEXT, example TEXT, memorized INTEGER, image TEXT, favorited INTEGER, collectionId INTEGER REFERENCES collections(id)) ')
    })

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT) ')
    })

    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}
