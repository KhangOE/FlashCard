import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableHighlight, TouchableOpacity, TextInput, Button, Pressable, Dimensions} from 'react-native';
import {FontAwesome, AntDesign, Entypo, Feather} from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
function AddTopicScreen(props) {
  return (
    <View style={[styles.bigBlock, {display: props.display}]}>
      <Pressable style={styles.wrapper}>

      <View style={styles.dialog}>
        <View style={styles.header}>
          <Pressable onPress={props.handle} style={{padding: 5}}>
            <Feather name="x" size={20} color="white" />
          </Pressable>
          <Pressable style={{padding: 5}}>
            <Feather name="check" size={20} color="white" />
          </Pressable>
        </View>

        <View style={styles.bodyContent}>
          <TextInput style={styles.inputField}
                  placeholder="Chủ đề"
          />
        </View>

        <Pressable style={styles.addBtn}>
          <Text style={styles.textBtn}>Thêm thẻ</Text>
        </Pressable>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%'
  },
  bodyContent: {
    paddingVertical: 90,
    paddingHorizontal: 10,
    width: '80%'
  },
  inputField: {
    borderWidth: 1,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16
  },
  addBtn: {
    backgroundColor: '#6A197D',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    width: '90%'
  },
  textBtn: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white'
  }
});
export {AddTopicScreen};
