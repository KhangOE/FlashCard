import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Add } from './screen/addCollection';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { MainScreen } from './screen/main';
import { MatchCards, MemoryGame, MultipleChoices, PracticeComplete } from "./screen/PracticeScreen"

import { CardScreen } from './screen/cardScreen';
import { AddCard, AddCardScreen } from './screen/addCard';
import { BasicReviewScreen } from './screen/basicReview';
import { PracticeWrite } from './screen/PracticeScreen/write';

import { LandingScreen, LoginScreen, RegisterScreen } from "./components/auth";


const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

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

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen name="Register" component={RegisterScreen} />
          <HomeStack.Screen name="Login" component={LoginScreen} />
        </HomeStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <HomeStack.Navigator
      // screenOptions={{
      //   headerShown: false
      // }}
      >
        <HomeStack.Screen
          name="Collection"
          component={MainScreen}
          options={{ tabBarLabel: 'Home!' }}
        />
        <HomeStack.Screen
          name="Card"
          component={CardScreen}
          options={{ tabBarLabel: 'Home!' }}
        />
        <HomeStack.Screen
          name="Add Collection"
          component={Add}
          options={{ tabBarLabel: 'Home!' }}
        />
        <HomeStack.Screen
          name="addCard"
          component={AddCardScreen}
          options={{ tabBarLabel: 'Home!' }}
        />
        <HomeStack.Screen
          name="MatchCards"
          component={MatchCards}
        />
        <HomeStack.Screen
          name="MultipleChoices"
          component={MultipleChoices}
        />
        <HomeStack.Screen
          name="MemoryGame"
          component={MemoryGame}
        />
        <HomeStack.Screen
          name="PracticeComplete"
          component={PracticeComplete}
        />
        <HomeStack.Screen
          name="basicReview"
          component={BasicReviewScreen}
          options={{ tabBarLabel: 'Home!' }}
        />
        <HomeStack.Screen
          name="practiceWrite"
          component={PracticeWrite}
          options={{ tabBarLabel: 'Home!' }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}




// const Tab = createBottomTabNavigator();


// export default function App() {
//   const [data, setData] = useState([])

//   const [uid, setUid] = useState(null);

//   useEffect(() => {
//     signInAnonymously(auth).then(() => {
//       auth.onAuthStateChanged((user) => {
//         if (user) {
//           const { uid } = user;
//           setUid(uid);
//         } else {
//           signInAnonymously();
//         }
//       });
//     }).then(
//       () => {
//         // addspending({money:123123,note:'1243'})
//         // deleteSpending("5Vw24snnMZuHVz6UCIcI")
//       }
//     )

//   }, []);

//   useEffect(() => {
//     console.log(uid)
//   }, [])



//   return (
//     uid ?
//       <NavigationContainer screenOptions={{
//         headerShown: false
//       }}>
//         <Tab.Navigator screenOptions={{
//           headerShown: false,
//           tabBarShowLabel: false
//         }}>
//           <Tab.Screen options={{
//             tabBarIcon: ({ focused, color, size },) => (
//               <Icon name="money-bill" size={30} color={focused ? "#900" : 'gray'} />),

//           }} name="Home" component={HomeStackScreen} />


//           <Tab.Screen options={{
//             tabBarIcon: ({ focused, color, size },) => (
//               <Icon name="chart-bar" size={30} color={focused ? "#900" : 'gray'} />),

//           }} name="Statistic" component={Statistic} />



//         </Tab.Navigator>
//       </NavigationContainer> : <View><Text>123</Text></View>
//     /*
//       <View style={styles.container}>
//         {uid ? <Text><Test></Test></Text> : <Text>123</Text> }
//       </View>*/


//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
