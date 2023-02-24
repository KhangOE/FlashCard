
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Image, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.testDb') // returns Database object
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const AddCardScreen = ({ navigation, route }) => {
  const [cname, setCname] = useState('')
  const [cid, setCid] = useState()
  const [en, setEn] = useState('')
  const [vi, setVi] = useState('')
  const [ex, setEx] = useState('')
  const [exist, setExist] = useState([])
  const [sound, setSound] = useState(null)
  const [image, setImage] = useState(null);
  const [checkWord, setCheckWord] = useState(false)
  const [showErr, setShowErr] = useState('')
  const [freshCall, setFreshCall] = useState(1)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };


  useEffect(() => {
    setCname(route.params.name)
    setCid(route.params.id)
  }, []);


  useEffect(() => {
    exist.includes(en) ? setCheckWord(false) : setCheckWord(true)
  }, [en])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Cards WHERE CID = ?', [route.params.id],
        (txObj, { rows: { _array } }) => { setExist(_array.map(obj => obj.word)) },
        (txObj, error) => console.log('Error ', error)
      )
    })
  }, [freshCall])


  useEffect(() => {
    setShowErr('')
  }, [checkWord])

  const handle = async () => {
    if (en) {
      if (checkWord) {
        db.transaction(tx => {
          tx.executeSql('INSERT INTO Cards (word, meaning, ex, image, CID, memorized, favorited) values (?, ?, ?, ?, ?, 0, 0)', [en, vi, ex, image?.uri || "", cid],
            (txObj, resultSet) => Alert.alert(
              'Thông báo',
              'Thêm thẻ thành công',
            ),
            (txObj, error) => console.log('Error ', error)
          )
        })

        setFreshCall(state => state + 1)
        setEn('')
        setVi('')
        setImage(null)
      }
      else {
        setShowErr('Word existed !')
      }
    }
    else {
      setShowErr('Word is required !')
    }
  }





  return (
    <View style={styles.base}>
      <View style={styles.navbar}>
        <View style={styles.sub_block}>
          <Pressable onPress={() => {
            navigation.goBack()
          }}>
            <Feather name="x" size={24} color="white" />
          </Pressable>
          <Pressable onPress={handle}>
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
            <Text style={{ color: 'red', fontSize: 18 }}>
              {showErr ? showErr : ''}
            </Text>
          </View>
          <View style={styles.addMeaning}>
            <Text style={[styles.title, { marginBottom: 10 }]}>
              Định nghĩa
            </Text>
            <TextInput style={[styles.inputField, { marginBottom: 20 }]}
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

          <View style={styles.addExample}>
            <Text style={styles.title}>
              Hình ảnh
            </Text>

            {image ? (
              <View style={{ position: "relative" }}>
                <Pressable onPress={pickImage}>
                  <Image source={{ uri: image.uri }} style={{ width: width, height: (width / image.width * image.height) }} resizeMode="contain" />
                </Pressable>
                <Pressable onPress={() => setImage(null)} style={{ backgroundColor: "red", zIndex: 1000, position: "absolute", top: 5, right: 5, borderRadius: 12 }}>
                  <Feather name="x" size={24} color="white" />
                </Pressable>
              </View>
            ) : (
              <View style={styles.icon}>
                <Ionicons name="md-image-outline" size={26} onPress={pickImage} />
              </View>)}
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
    </View>

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
    marginBottom: 10
  },
  addMeaning: {
    marginTop: 10,
    marginBottom: 10
  },
  addExample: {
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4
  },
  inputField: {
    borderWidth: 1,
    height: 40,
    padding: 5,
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
  },
  icon: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }

});
export { AddCardScreen };