import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Pressable} from 'react-native';
import {FontAwesome5, AntDesign} from '@expo/vector-icons';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function OptionBlock(props) {
  return (
    <View style={[styles.optionBlock, {display: props.display, top: props.top, bottom: props.bottom, left: props.left, right: props.right}]}>
      <TouchableOpacity style={styles.childBlock} onPress={props.repairTopic}>
        <FontAwesome5 name="pen" size={20} color="black" />
        <Text style={styles.description}>Sửa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.childBlock} onPress={props.deleteTopic}>
        <AntDesign name="delete" size={20} color="red" />
        <Text style={styles.description}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  optionBlock: {
    backgroundColor: '#fff',
    width: width * 0.35,
    position: 'absolute',
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  childBlock: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20
  }
}
);
export {OptionBlock};
