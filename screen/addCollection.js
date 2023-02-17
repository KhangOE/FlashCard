import { async } from '@firebase/util';
import { setStatusBarStyle } from 'expo-status-bar';
import { useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Pressable, Dimensions } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { addCard, addCollection, addspending, getspending, main } from '../api/firebaseApi';
import { getTopicById } from '../api/firebaseApi';
import SafeViewAndroid from "../safeAreaViewAndroid";
import safeAreaViewAndroid from '../safeAreaViewAndroid';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;



export const AddCollection = ({ navigation }) => {

  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [exist, setExist] = useState([])
  const [checkName, setChechName] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const [freshCall, setFreshCall] = useState(1)
  useEffect(() => {
    getTopicById().then((data) => {
      setExist(data.map(a => a.name))
    })
  }, [freshCall])

  useEffect(() => {
    console.log(checkName)
    exist.includes(name) || name === '' ? setChechName(false) : setChechName(true)
  }, [name])

  useEffect(() => {
    setShowErr(false)
  }, [checkName])

  const handle = async () => {
    if (checkName) {
      await addCollection({ name: name, note: note })
      setNote('')
      setName('')
      console.log(note, name)
      setFreshCall(state => state + 1)
    }
    else {
      setShowErr(true)
    }
  }

  const handleComplte = async () => {
    if (checkName) {
      await addCollection({ name: name, note: note })
      setNote('')
      setName('')
      console.log(note, name)

      navigation.navigate('Collection')
    }
    else {
      setShowErr(true)
    }

  }
  return (<>

    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View style={styles.navbar}>
        <View style={styles.sub_block}>
          <Pressable onPress={() => {
            navigation.navigate('Collection')
          }}>
            <Feather name="x" size={24} color="white" />
          </Pressable>
          <Pressable onPress={handleComplte}>
            <Feather name="check" size={24} color="white" />
          </Pressable>
        </View>
      </View>


      <View style={styles.mainBlock}>
        <View style={styles.wrapper}>
          <View style={styles.addVocabulary}>
            <Text style={styles.title}>
              Tên
            </Text>
            <TextInput style={styles.inputField}
              placeholder=""
              onChangeText={newname => setName(newname)}
              defaultValue={name}
            />
            <Text style={{ fontSize: 18, color: 'red' }}>
              {showErr ? 'Name exist' : ''}
            </Text>
          </View>
          <View style={styles.addMeaning}>
            <Text style={styles.title}>
              Mô tả - không bắt buộc
            </Text>
            <TextInput style={styles.inputField}
              placeholder=""
              onChangeText={newText => setNote(newText)}
              defaultValue={note}
            />
          </View>

          <Pressable style={[styles.addBtn]} onPress={handle}  >
            <Text style={styles.textBtn}>Thêm bộ</Text>
          </Pressable>

        </View>
      </View>
    </SafeAreaView>
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
    marginBottom: 5
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