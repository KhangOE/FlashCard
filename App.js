import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Text, View, LogBox } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import HomeStack from "./navigation/HomeStack"
import DrawerStack from './navigation/DrawerStack';

LogBox.ignoreAllLogs()

export default function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({});

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
  );
}
