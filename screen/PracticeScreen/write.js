import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import {
  AntDesign,
} from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { getCardsbyCID } from "../../api/firebaseApi";

export const PracticeWrite = () => {
  const [words, setWords] = useState([]);
  const [meanings, setMeanings] = useState([]);

  const [firstWord, setFirstWord] = useState(null);
  const [secondWord, setSecondWord] = useState(null);

  const [complete, setComplete] = useState(false);
  const [wrongList, setWrongList] = useState([]);
  const [correctList, setCorrectList] = useState([])
  const [card, setCard] = useState([])

  const isFocused = useIsFocused();

  return (<>
    <View>
      <TextInput
        style={styles.inputField}
        placeholder=""
      />
    </View>
  </>)
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  sub_block: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  navbar: {
    backgroundColor: '#6A197D',
    alignItems: 'center'
  },
  mainBlock: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  wrapper: {
    flex: 1
  },
  addVocabulary: {
    marginBottom: 20
  },
  addMeaning: {
    marginTop: 10,
    marginBottom: 20
  },
  addExample: {
    marginTop: 10,
    marginBottom: 20
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10
  },
  inputField: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#fff',
    marginTop: 20
  },
  addBtn: {
    backgroundColor: '#6A197D',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    marginTop: 20
  },
  textBtn: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white'
  }
});