import { async } from '@firebase/util';
import { setStatusBarStyle } from 'expo-status-bar';
import { useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView,  Pressable, Dimensions } from 'react-native';
import {FontAwesome, AntDesign, Entypo, Feather} from '@expo/vector-icons';
import { addCard, addCollection, addspending, getspending, main } from '../api/firebaseApi';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
export const AddCardScreen = ({ navigation, route }) => {
    const [cname, setCname] = useState('')
    const [cid, setCid] = useState()
    const [en, setEn] = useState('')
    const [vi, setVi] = useState('')
    const [ex, setEx] = useState('')
    useEffect(() => {
        setCname(route.params.name)
        setCid(route.params.id)
    }, []);
    useEffect(() => {
        //   console.log(route.params)
    }, [])
    const handle = () => {
        addCard({ en: en, vi: vi, cid: cid, ex: ex })
        setEn('')
        setVi('')
        // console.log(note, name)
    }

   return (
        <SafeAreaView style={[styles.base, {display: props.display}]}>
          <View style={styles.navbar}>
            <View style={styles.sub_block}>
              <Pressable onPress={props.handle}>
                <Feather name="x" size={24} color="white" />
              </Pressable>
              <Pressable>
                <Feather name="check" size={24} color="white" />
              </Pressable>
            </View>
          </View>

          
          <View style={styles.mainBlock}>
            <View style={styles.wrapper}>
            {/* <Button title='Add default' onPress={handle} ></Button> */}
            <View style={styles.addVocabulary}>
              <Text style={styles.title}>
                  Thuật ngữ 
              </Text>
              <TextInput style={styles.inputField}
                  placeholder=""
                  onChangeText={newname => setEn(newname)}
                  defaultValue={en}
              />
            </View>
            <View style={styles.addMeaning}>
              <Text style={styles.title}>
                  Định nghĩa
              </Text>
              <TextInput style={styles.inputField}
                  placeholder=""
                  onChangeText={newText => setVi(newText)}
                  defaultValue={vi}
              />
            </View>
            <View style={styles.addExample}>
              <Text style={styles.title}>
                  Ví dụ
              </Text>
              <TextInput style={styles.inputField}
                  placeholder=""
                  onChangeText={newname => setEn(newname)}
                  defaultValue={en}
              />
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
              <Pressable style={styles.addBtn} onPress={handle}>
                <Text style={styles.textBtn}>Thêm thẻ tiếp theo</Text>
              </Pressable>
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
export {AddCardScreen};
