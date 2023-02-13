import { async } from '@firebase/util';
import { setStatusBarStyle } from 'expo-status-bar';
import { useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Pressable, Dimensions, Image } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { addCard, addCollection, addspending, getspending, main } from '../api/firebaseApi';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/Ionicons";
import { uuidv4 } from '@firebase/util';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from '../firebase';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const AddCardScreen = ({ navigation, route }) => {
  const [cname, setCname] = useState('')
  const [cid, setCid] = useState()
  const [en, setEn] = useState('')
  const [vi, setVi] = useState('')
  const [ex, setEx] = useState('')

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };


  useEffect(() => {
    setCname(route.params.name)
    setCid(route.params.id)
  }, []);
  useEffect(() => {
    // console.log(route.params)
  }, [])
  const handle = async () => {
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

    setEn('')
    setVi('')
    // console.log(note, name)
  }

  return (
    <SafeAreaView style={[styles.base, { display: 'flex' }]}>
      <View style={styles.navbar}>
        <View style={styles.sub_block}>
          <Pressable >
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
  },
  icon: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }

});
export { AddCardScreen };
