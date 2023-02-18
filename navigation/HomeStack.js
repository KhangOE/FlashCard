import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddCardScreen, AddCollection, BasicReviewScreen, CardScreen, MainScreen, MatchCards, MemoryGame, MultipleChoices, PracticeComplete, PracticeWrite } from '../screen';
import { SafeAreaView } from 'react-native';
import safeAreaViewAndroid from '../safeAreaViewAndroid';

const Stack = createNativeStackNavigator();


export default function HomeStack() {
    return (
        <SafeAreaView style={safeAreaViewAndroid.AndroidSafeArea}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Collection"
                    component={MainScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Card"
                    component={CardScreen}
                    options={{ tabBarLabel: 'Home!', headerShown: false }}
                />
                <Stack.Screen
                    name="Add Collection"
                    component={AddCollection}
                    options={{
                        tabBarLabel: 'Home!',
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="addCard"
                    component={AddCardScreen}
                    options={{ tabBarLabel: 'Home!', headerShown: false }}
                />
                <Stack.Screen
                    name="MatchCards"
                    component={MatchCards}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MultipleChoices"
                    component={MultipleChoices}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MemoryGame"
                    component={MemoryGame}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PracticeComplete"
                    component={PracticeComplete}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="basicReview"
                    component={BasicReviewScreen}
                    options={{ tabBarLabel: 'Home!', headerShown: false }}
                />
                <Stack.Screen
                    name="practiceWrite"
                    component={PracticeWrite}
                    options={{ tabBarLabel: 'Home!' }}
                />
            </Stack.Navigator>
        </SafeAreaView >
    )
}
