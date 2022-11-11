import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button,SafeAreaView } from 'react-native';
import safeAreaViewAndroid from '../safeAreaViewAndroid';
export const Todos = () => { 
    return (
       
        <SafeAreaView style={safeAreaViewAndroid.AndroidSafeArea}>
        <View>
        <Text style={styles.text}>Todos</Text>
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      fontSize: 25,
      fontWeight: '500',
    }
  });