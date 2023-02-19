import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableHighlight, TouchableOpacity, TextInput, Button, Pressable, Dimensions, Alert } from 'react-native';
import { getCategories, getCategorybyCID, updateCollection } from '../api/firebaseApi';
import { Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import CategoryModal from '../components/CategoryModal';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
function RepairTopicScreen(props) {
  const [topic, setTopic] = useState()
  const [note, setNote] = useState()
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedC, setSelectedC] = useState(null)

  useEffect(() => {
    setTopic(props.item?.name)
    setNote(props.item?.note)
    getCategorybyCID(props.item?.category).then(data => {
      setSelectedC(data)
    })
  }, [props?.item])

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
    })
  }, []);


  const handleUpdate = async () => {
    await updateCollection({
      id: props.item.id,
      name: topic,
      note: note,
      userID: props.item.userID,
      category: selectedC ? selectedC.id : ""
    })
    //props.setFresKey(state => state + 1)
    props.setFreshKey(state => state + 1)
    Alert.alert(
      'Thông báo',
      'Sửa topic thành công',
    )
  }
  return (
    <View style={[styles.bigBlock, { display: props.display }]}>
      <CategoryModal modalVisible={categoryModalVisible} setModalVisible={setCategoryModalVisible} data={categories} selected={selectedC} setSelected={setSelectedC}></CategoryModal>
      <Pressable style={styles.wrapper}>

        <View style={styles.dialog}>
          <View style={styles.header}>
            <Pressable onPress={props.handle}>
              <Feather name="x" size={24} color="white" />
            </Pressable>
            <View style={styles.optionBlock}>
              <Pressable style={{ marginLeft: 10 }} onPress={handleUpdate}>
                <Feather name="check" size={20} color="white" />
              </Pressable>
            </View>
          </View>
          <View style={styles.bodyContent}>
            <Text style={styles.title}>
              Tên
            </Text>
            <TextInput style={styles.inputField}
              value={topic}
              defaultValue={props.item?.name}
              onChangeText={text => setTopic(text)}
            />
            <Text style={styles.title}>
              Ghi chú
            </Text>
            <TextInput style={styles.inputField}
              value={note}
              defaultValue={props.item?.note}
              onChangeText={text => setNote(text)}
            />
            <View style={styles.addMeaning}>
              <Text style={styles.title}>
                Chủ đề
              </Text>
              {selectedC ? <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={{ height: 50, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16 }}>{selectedC.name}</Text>
              </TouchableOpacity> :
                <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={{ height: 50, justifyContent: 'center' }} >
                  <MaterialIcons name='topic' size={28} />
                </TouchableOpacity>}
            </View>
          </View>

        </View>
      </Pressable >
    </View >
  );
}

const styles = StyleSheet.create({
  bigBlock: {
    position: 'absolute',
    width: width,
    height: height,
  },
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    width: width * 0.9,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    position: 'absolute',
    backgroundColor: 'white',
    paddingBottom: 30,
    marginBottom: 20,
    transform: [{ translateY: -60 }]
  },
  header: {
    backgroundColor: '#6A197D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    height: 60
  },
  optionBlock: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bodyContent: {
    paddingVertical: 10,
    width: '90%'
  },
  inputField: {
    paddingHorizontal: 5,
    borderWidth: 1,
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16
  },
  addMeaning: {
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10
  },
});
export { RepairTopicScreen };
