import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { addspending, deleteSpending, getspending } from './api/firebaseApi';
import { autoSignIn } from './api/firebaseApi';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"
import { async } from '@firebase/util';
import { Test } from './screen/Spendings';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Add } from './screen/addSpending';
import { Detail } from './screen/collectionDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Targets } from './screen/targets';
import { AddSpending } from './screen/addSpending';
import { Todos } from './screen/todos';
import { Statistic } from './screen/statistic';
import { MainScreen } from './screen/main';
import { MatchCards, MemoryGame, MultipleChoices, PracticeComplete } from "./screen/PracticeScreen"

import { CardScreen } from './screen/cardScreen';
import { AddCard } from './screen/addCard';
import { BasicReviewScreen } from './screen/basicReview';

const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Spending"
        component={MainScreen}
        options={{ tabBarLabel: 'Home!' }}
      />
      <HomeStack.Screen
        name="SpendingDetail"
        component={CardScreen}
        options={{ tabBarLabel: 'Home!' }}
      />
      <HomeStack.Screen
        name="addSpending"
        component={Add}
        options={{ tabBarLabel: 'Home!' }}
      />
      <HomeStack.Screen
        name="addCard"
        component={AddCard}
        options={{ tabBarLabel: 'Home!' }}
      />
      <HomeStack.Screen
        name="MatchCards"
        component={MatchCards}
        options={{ tabBarLabel: 'Home!' }}
      />
      <HomeStack.Screen
        name="MultipleChoices"
        component={MultipleChoices}
        options={{ tabBarLabel: 'Home!' }}
      />
      <HomeStack.Screen
        name="MemoryGame"
        component={MemoryGame}
        options={{ tabBarLabel: 'Home!' }}
      />
      <HomeStack.Screen
        name="PracticeComplete"
        component={PracticeComplete}
        options={{ tabBarStyle: { display: 'none' } }}
      />
      <HomeStack.Screen
        name="basicReview"
        component={BasicReviewScreen}
        options={{ tabBarLabel: 'Home!' }}
      />
    </HomeStack.Navigator>
  );
}




const Tab = createBottomTabNavigator();


export default function App() {
  const [data, setData] = useState([])

  const [uid, setUid] = useState(null);

  useEffect(() => {
    signInAnonymously(auth).then(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const { uid } = user;
          setUid(uid);
        } else {
          signInAnonymously();
        }
      });
    }).then(
      () => {
        // addspending({money:123123,note:'1243'})
        // deleteSpending("5Vw24snnMZuHVz6UCIcI")
      }
    )

  }, []);

  useEffect(() => {
    console.log(uid)
  }, [])



  return (
    uid ?
      <NavigationContainer screenOptions={{
        headerShown: false
      }}>
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarShowLabel: false
        }}>
          <Tab.Screen options={{
            tabBarIcon: ({ focused, color, size },) => (
              <Icon name="money-bill" size={30} color={focused ? "#900" : 'gray'} />),

          }} name="Home" component={HomeStackScreen} />

          <Tab.Screen options={{
            tabBarIcon: ({ focused, color, size },) => (
              <Icon name="piggy-bank" size={30} color={focused ? "#900" : 'gray'} />),

          }} name="H" component={Targets} />
          <Tab.Screen options={{
            tabBarIcon: ({ focused, color, size },) => (
              <Icon name="chart-bar" size={30} color={focused ? "#900" : 'gray'} />),

          }} name="Statistic" component={Statistic} />

          <Tab.Screen options={{
            tabBarIcon: ({ focused, color, size },) => (
              <Icon name="th-list" size={30} color={focused ? "#900" : 'gray'} />),

          }} name="Todos" component={Todos} />

        </Tab.Navigator>
      </NavigationContainer> : <View><Text>123</Text></View>
    /*
      <View style={styles.container}>
        {uid ? <Text><Test></Test></Text> : <Text>123</Text> }
      </View>*/


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
