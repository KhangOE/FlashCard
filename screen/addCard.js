import { async } from '@firebase/util';
import { setStatusBarStyle } from 'expo-status-bar';
import { useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Pressable, Dimensions, Image } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { addCard, addCollection, addspending, getCardsbyCID, getspending, main } from '../api/firebaseApi';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/Ionicons";
import { uuidv4 } from '@firebase/util';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from '../firebase';
import SafeViewAndroid from "../safeAreaViewAndroid";
import axios from 'axios';
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
    getCardsbyCID({ cid: route.params.id }).then((item) => {
      // console.log('daa', item)
      setExist(item.map(i => i.word))
    })
  }, [freshCall])




  useEffect(() => {
    setShowErr('')
  }, [checkWord])

  const callSound = async () => {
    const URL = `https://od-api.oxforddictionaries.com:443/api/v2/entries/en-gb/${en.toLowerCase()}?strictMatch=false`
    await axios.get(URL,
      {
        headers: {
          app_id: '20d5be5c',
          app_key: '3689eaa3c8bbb54c633611ce106adb70'
        }
      }).then((res) => {
        console.log('res', res.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile)
        //setSound(res.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile)
        return res.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile
      })
  }

  // useEffect(() => {
  //   const a = async () => {
  //     const URL = `https://od-api.oxforddictionaries.com:443/api/v2/entries/en-gb/yellow?strictMatch=false`
  //     await axios.get(URL,
  //       {
  //         headers: {
  //           app_id: '20d5be5c',
  //           app_key: '3689eaa3c8bbb54c633611ce106adb70'
  //         }
  //       }).then((res) => {
  //         console.log('res', res.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile)
  //         setSound(res.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile)
  //       })
  //   }

  // }, [])

  useEffect(() => {
    console.log('lll', sound)
  }, [sound])
  const handle = async () => {

    if (en) {

      if (checkWord) {
        // const s = await callSound().then(() => {
        //   console.log('call sound')
        //   console.log('soundddd ', sound)
        // })
        const s = await axios.get(`https://od-api.oxforddictionaries.com:443/api/v2/entries/en-gb/${en.toLowerCase()}?strictMatch=false`,
          {
            headers: {
              app_id: '20d5be5c',
              app_key: '3689eaa3c8bbb54c633611ce106adb70'
            }
          }).then((res) => {
            console.log('res', res.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile)
            //setSound(res.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile)
            return res.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile
          })
        console.log('ssss', s)
        if (image) {
          const response = await fetch(image.uri);
          const blob = await response.blob();
          const childPath = `cardsImage/${auth.currentUser.uid}/${uuidv4()}`;

          const storage = getStorage();
          const storageRef = ref(storage, childPath);



          await uploadBytes(storageRef, blob).then((snapshot) => {
            console.log("uploaded image to storage");
          });

          getDownloadURL(ref(storage, childPath))
            .then(async (url) => {
              addCard({ en: en, vi: vi, cid: cid, ex: ex, img: url, sound: s })
            })
            .catch((error) => {
              console.log(error);
              return null;
            });
        }
        else {
          await addCard({ en: en, vi: vi, cid: cid, ex: ex, sound: s })

          setFreshCall(state => state + 1)
          console.log('add card')
        }

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


    // console.log(note, name)
  }


  const handleComplte = async () => {

    if (checkWord) {
      if (image) {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const childPath = `cardsImage/${auth.currentUser.uid}/${uuidv4()}`;

        const storage = getStorage();
        const storageRef = ref(storage, childPath);


        await uploadBytes(storageRef, blob).then((snapshot) => {
          console.log("uploaded image to storage");
        });

        getDownloadURL(ref(storage, childPath))
          .then(async (url) => {
            addCard({ en: en, vi: vi, cid: cid, ex: ex, img: url })
          })
          .catch((error) => {
            console.log(error);
            return null;
          });
      } else {
        addCard({ en: en, vi: vi, cid: cid, ex: ex })
      }

      navigation.goBack()
    }
    else {
      setShowErr(true)
    }

    // console.log(note, name)
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
          <Pressable onPress={handleComplte

          }>
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
                <Icon name="md-image-outline" size={26} onPress={pickImage} />
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
