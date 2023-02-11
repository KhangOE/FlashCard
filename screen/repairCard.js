import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableHighlight, TouchableOpacity, TextInput, Button, Pressable, Dimensions } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { updateCard } from '../api/firebaseApi';
import { async } from '@firebase/util';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
function RepairCardScreen(props) {

  const [word, setWord] = useState(props.item?.word)
  const [meaning, setMeaning] = useState(props.item?.meaning)
  const [example, setExample] = useState(props.item?.example)
  const handleUpdate = async () => {
    await updateCard({
      id: props.item?.id,
      word: word,
      meaning: meaning,
      example: example
    })
    props.setFreshKey(state => state + 1)

  }
  useEffect(() => {
    setExample(props.item?.example)
    setMeaning(props.item?.meaning)
    setWord(props.item?.word)
  }, [props.item?.example, props.item?.meaning, props.item?.word])
  return (
    <SafeAreaView style={[styles.base, { display: props.display }]}>
      <View style={styles.navbar}>
        <View style={styles.sub_block}>
          <Pressable onPress={props.handle}>
            <Feather name="x" size={24} color="white" />
          </Pressable>
          <View style={styles.optionBlock}>
            <Pressable style={{ marginRight: 15 }}>
              <FontAwesome5 name="trash" size={20} color="white" />
            </Pressable>
            <Pressable style={{ marginLeft: 15 }} onPress={handleUpdate}>
              <Feather name="check" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>


      <View style={styles.mainBlock}>
        <View style={styles.wrapper}>
          {/* <Button title='Add default' onPress={handle} ></Button> */}
          <View style={styles.addVocabulary}>
            <Text style={styles.title}>
              Thuật ngữ {props.item?.id}
            </Text>
            <TextInput style={styles.inputField}
              placeholder=""
              onChangeText={newname => setWord(newname)}
              defaultValue={props.item?.word}
              value={word}
            />
          </View>
          <View style={styles.addMeaning}>
            <Text style={styles.title}>
              Định nghĩa
            </Text>
            <TextInput style={styles.inputField}
              placeholder=""
              onChangeText={newText => setMeaning(newText)}
              defaultValue={props.item?.meaning}
              value={meaning}
            />
          </View>
          <View style={styles.addExample}>
            <Text style={styles.title}>
              Ví dụ
            </Text>
            <TextInput style={styles.inputField}
              placeholder=""
              onChangeText={newname => setExample(newname)}
              defaultValue={props.item?.example}
              value={example}
            />
            <Text>
              {meaning}
            </Text>
          </View>
          {/* <Text>
                  ex
              </Text>
              <TextInput
                  style={{ height: 40 }}
                  placeholder="Type here to note!"
                  onChangeText={newText => setEx(newText)}
                  defaultValue={ex}
              /> */}

          {/* <Button title={cname || 'we'} onPress={handle}>
              </Button> */}
        </View>
      </View>
    </SafeAreaView>

  )

  // Bugs : khi focus vào inputText thì keyboard đẩy button lên che trường ví dụ
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
  optionBlock: {
    flexDirection: 'row',
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
    fontSize: 16
  }
});
export { RepairCardScreen };
