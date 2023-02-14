import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
import HomeStack from "./navigation/HomeStack"
import DrawerStack from './navigation/DrawerStack';


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
