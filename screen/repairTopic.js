import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableHighlight, TouchableOpacity, TextInput, Button, Pressable, Dimensions} from 'react-native';
import {FontAwesome5, AntDesign, Entypo, Feather} from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
function RepairTopicScreen(props) {
  return (
    <View style={[styles.bigBlock, {display: props.display}]}>
      <Pressable style={styles.wrapper}>

      <View style={styles.dialog}>
        <View style={styles.header}>
          <Pressable onPress={props.handle}>
            <Feather name="x" size={20} color="white" />
          </Pressable>
          <View style={styles.optionBlock}>
            <Pressable style={{marginRight: 10}}>
              <FontAwesome5 name="trash" size={16} color="white" />
            </Pressable>
            <Pressable style={{marginLeft: 10}}>
              <Feather name="check" size={20} color="white" />
            </Pressable>
          </View>
        </View>

        <View style={styles.bodyContent}>
          <TextInput style={styles.inputField}
                  placeholder="Chủ đề"
          />
        </View>

      </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bigBlock: {
    position: 'absolute',
    width: width,
    height: height,
  },
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    width: width * 0.9,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    position: 'absolute',
    backgroundColor: 'white',
    paddingBottom: 30,
    marginBottom: 20,
    transform: [{translateY: -60}]
  },
  header: {
    backgroundColor: '#6A197D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%'
  },
  optionBlock: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bodyContent: {
    paddingVertical: 70,
    paddingHorizontal: 10,
    width: '90%'
  },
  inputField: {
    borderWidth: 1,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16
  }
});
export {RepairTopicScreen};
