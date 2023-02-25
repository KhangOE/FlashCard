import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions, Image, Alert } from 'react-native';
import { FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../utils'


const width = Dimensions.get('screen').width;
function RepairCardScreen(props) {

  const [word, setWord] = useState(props.item?.word)
  const [meaning, setMeaning] = useState(props.item?.meaning)
  const [example, setExample] = useState(props.item?.example)
  const [image, setImage] = useState(props.item?.image)
  const handleUpdate = async () => {
    db.transaction(tx => {
      tx.executeSql('UPDATE Cards SET word = ?, meaning = ?, ex = ?, image = ? WHERE id = ?', [word, meaning, example, image || "", props.item?.id],
        (txObj, resultSet) => Alert.alert(
          'Thông báo',
          'Thêm thẻ thành công',
        ),
        (txObj, error) => console.log('Error ', error)
      )
    })

    props.setFreshKey(state => state + 1)
  }
  useEffect(() => {
    setExample(props.item?.example)
    setMeaning(props.item?.meaning)
    setWord(props.item?.word)
    setImage(props.item?.image)
  }, [props.item?.example, props.item?.meaning, props.item?.word, props.item?.image])


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

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
          <View style={styles.addVocabulary}>
            <Text style={styles.title}>
              Thuật ngữ
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
            <View style={styles.addExample}>
              <Text style={styles.title}>
                Hình ảnh
              </Text>
              {image ? (
                <View style={{ position: "relative" }}>
                  <Pressable onPress={pickImage}>
                    <Image source={{ uri: image }} style={{ width: width, height: 200 }} resizeMode="contain" />
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
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
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
