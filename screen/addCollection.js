import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import SafeViewAndroid from "../safeAreaViewAndroid";
import { TouchableOpacity } from 'react-native-gesture-handler';
import CategoryModal from '../components/CategoryModal';
import { db } from '../utils'


export const AddCollection = ({ navigation }) => {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [exist, setExist] = useState([])
  const [checkName, setChechName] = useState(false)
  const [showErr, setShowErr] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedC, setSelectedC] = useState(null)
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Categories', null,
          (txObj, { rows: { _array } }) => setCategories(_array),
          (txObj, error) => console.log('Error ', error)
        )
      })
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Collections', null,
        (txObj, { rows: { _array } }) => { setExist(_array.map(obj => obj.name)) },
        (txObj, error) => console.log('Error ', error)
      )
    })
  }, [])

  useEffect(() => {

    exist.includes(name) || name === '' ? setChechName(false) : setChechName(true)
  }, [name])

  useEffect(() => {
    setShowErr('')
  }, [checkName])

  const handleComplte = async () => {
    if (name) {
      if (checkName) {
        db.transaction(tx => {
          tx.executeSql('INSERT INTO Collections (name, note, categoryId) values (?, ?, ?)', [name, note, selectedC?.id || 0],
            (txObj, resultSet) => console.log(resultSet),
            (txObj, error) => console.log('Error ', error)
          )
        })
        setNote('')
        setName('')
        setSelectedC(null)
        navigation.navigate("Main")
      }
      else {
        setShowErr('Name existed')
      }
    }
    else {
      setShowErr('Name is required !')
    }
  }

  const updateCategory = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Categories', null,
        (txObj, { rows: { _array } }) => setCategories(_array),
        (txObj, error) => console.log('Error ', error)
      )
    })
  }

  return (<>
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>

      <View style={styles.base}>
        <View style={styles.navbar}>
          <View style={styles.sub_block}>
            <Pressable onPress={() => {
              navigation.goBack()
            }}>
              <Feather name="x" size={24} color="white" />
            </Pressable>
            <Pressable onPress={handleComplte}>
              <Feather name="check" size={24} color="white" />
            </Pressable>
          </View>
        </View>

        <CategoryModal modalVisible={categoryModalVisible} setModalVisible={setCategoryModalVisible} data={categories} selected={selectedC} setSelected={setSelectedC} updateCategory={updateCategory}></CategoryModal>
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
                {showErr ? showErr : ''}
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
            <View style={styles.addMeaning}>
              <Text style={styles.title}>
                Chủ đề
              </Text>
              {selectedC ? <TouchableOpacity onPress={() => setCategoryModalVisible(true)}>
                <Text>{selectedC.name}</Text>
              </TouchableOpacity> :
                <TouchableOpacity onPress={() => setCategoryModalVisible(true)}>
                  <MaterialIcons name='topic' size={28} />
                </TouchableOpacity>}
            </View>

            <Pressable style={[styles.addBtn]} onPress={handleComplte}  >
              <Text style={styles.textBtn}>Thêm bộ</Text>
            </Pressable>

          </View>
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