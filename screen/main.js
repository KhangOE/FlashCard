import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity, Dimensions, Pressable, SafeAreaView, TextInput } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { PlusBtn } from '../components/PlusButton'
import { ModalPractice } from '../components/modalPractice';
import { useState, useEffect } from 'react';
import { getCategories, getCollection } from '../api/firebaseApi';
import { collection } from 'firebase/firestore';
import { getTopicById } from '../api/firebaseApi';
import SafeViewAndroid from "../safeAreaViewAndroid";
// New Screen
import { OptionBlock } from './OptionBlock';
import { RepairTopicScreen } from './repairTopic';
import { DeleteNotification } from './deleteNotification';
import CategoryModal from '../components/CategoryModal';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


function TopicTag(props) {

  const handle = () => {
    navigation.navigate({ name: 'addSpending' })
  }

  const [show, setShow] = useState('none');
  useEffect(() => {
    setShow('none')
  }, [])

  function showBlock() {
    if (show == 'none') {
      setShow('flex');
    }
    else {
      setShow('none');
    }
  }
  return (
    <TouchableOpacity onPress={props.press}>
      <View style={styles.topicTag}>
        <View style={styles.topicTagSet}>
          <View style={styles.topicFirstBlock}>
            <Text style={styles.topicTitle}> {props.name}</Text>
            <View >
              <Pressable onPress={() => {
                showBlock()
                props.setPick(props.item)
              }
              }>
                <View style={styles.optBlock}>
                  {(show == 'none') ? <Entypo name="dots-three-vertical" size={15} color="black" /> : <AntDesign name="close" size={24} color="black" />}
                </View>
              </Pressable>
              <OptionBlock top={'100%'} right={-10} display={show} isRepairBtn={props.isRepairBtn} repairTopic={props.repairTopic} isDelete={props.isDelete} deleteTopic={props.deleteTopic} />
            </View>
          </View>
          <View style={styles.topicSecondBlock}>
            <TouchableHighlight onPress={props.pressAdd}>
              <View style={styles.topicAddButton}>
                <AntDesign name="plus" size={16} color="white" />
                <Text style={styles.topicFirstText}> Thêm thẻ </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.topicPractise} onPress={() => {
              props.setvisible(state => !state)
              props.settopic()

            }}>
              <Text style={styles.topicSecondText}> Thực hành </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}



function MainScreen({ navigation }) {
  const [categories, setCategories] = useState([])
  const [selectedC, setSelectedC] = useState(null)
  const [data, setdata] = useState([])
  const [shownData, setShownData] = useState([])
  const [topic, setTopic] = useState()
  const [pick, setPick] = useState()
  const [freshKey, setFreshKey] = useState(1)
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)

  useEffect(() => {
    setFilteredData(shownData.filter(i => {
      return i.name.toLowerCase().includes(search.toLowerCase())
    }))
  }, [search])


  useEffect(() => {
    setFilteredData(shownData.filter(i => {
      return i.name.toLowerCase().includes(search.toLowerCase())
    }))
  }, [shownData])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCategories().then(data => {
        setCategories(data)
      })
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getTopicById().then(data => {
      setdata(data)
      setShownData(data)
    })
  }, [freshKey]);

  useEffect(() => {
    if (selectedC === null) {
      setShownData(data)
    } else
      setShownData(data.filter(d => d.category === selectedC.id))
  }, [selectedC]);


  const updateCategory = () => {
    getCategories().then(data => {
      setCategories(data)
    })
  }

  // Add topic
  const [isPressBtn, setIsPressBtn] = useState('none');
  // Repair topic
  const [isRepairBtn, setIsRepairBtn] = useState('none');
  // Delete notification
  const [isDelete, setIsDelete] = useState('none');


  function displayAddTopicScreen() {
    if (isPressBtn == 'none') {
      setIsPressBtn('flex');
    }
    else {
      setIsPressBtn('none');
    }
  }
  function displayRepairTopicScreen() {
    if (isRepairBtn == 'none') {
      setIsRepairBtn('flex');
    }
    else {
      setIsRepairBtn('none');
    }
  }
  function displayDeleteNotification() {
    if (isDelete == 'none') {
      setIsDelete('flex');
    }
    else {
      setIsDelete('none');
    }
  }

  return (
    <View style={styles.base}>
      <View style={styles.navbar}>
        <View style={styles.sub_block}>
          <TouchableHighlight style={{ padding: 10 }} onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableHighlight>
          {
            showSearch ?
              [
                <TouchableHighlight style={{ padding: 10 }} onPress={() => {
                  setShowSearch(false)
                  setSearch('')
                }}>
                  <FontAwesome name="arrow-left" size={20} color="white" />
                </TouchableHighlight>, <TextInput
                  style={styles.input}
                  onChangeText={(e) => {
                    setSearch(e)
                  }}
                  autoFocus
                  value={search}
                  placeholder="search..."

                />
              ]
              : <TouchableHighlight style={{ marginRight: 20, padding: 10 }} onPress={() => setShowSearch(true)}>
                <FontAwesome name="search" size={20} color="white" />
              </TouchableHighlight>
          }
          {/* <TouchableHighlight>
            <FontAwesome name="search" size={20} color="white" />
          </TouchableHighlight> */}


        </View>
      </View>

      <ModalPractice modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} id={topic}></ModalPractice>
      <CategoryModal modalVisible={categoryModalVisible} setModalVisible={setCategoryModalVisible} data={categories} selected={selectedC} setSelected={setSelectedC} updateCategory={updateCategory}></CategoryModal>
      <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={styles.categoryBar}>
          <View style={{ height: 25, borderRadius: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center', minWidth: 60, flexDirection: 'row', paddingHorizontal: 10 }}>
            <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: selectedC?.color ?? '#6A197D', marginRight: 5 }}></View>
            <Text>{selectedC?.name ?? 'all'}</Text>
          </View>
          <SimpleLineIcons style={{}} name='arrow-down' size={16} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.topicList}>

        {filteredData.map((item, idx) => {
          return (
            <TopicTag key={idx} setPick={setPick} item={item} settopic={() => { setTopic(item.id) }} setvisible={setModalVisible} name={item.name} press={() => navigation.navigate('Card', item)}
              pressAdd={() => { navigation.navigate('addCard', item) }} isRepairBtn={isRepairBtn} repairTopic={displayRepairTopicScreen} isDelete={isDelete} deleteTopic={displayDeleteNotification} />
          )
        })}
      </ScrollView>

      {/* Nút bấm để thêm topic*/}
      <PlusBtn press={() => { navigation.navigate({ name: 'Add Collection' }); displayAddTopicScreen() }} />

      {/* Cửa sổ nhỏ để nhập tên Topic*/}
      {/* <AddTopicScreen display={isPressBtn} handle={displayAddTopicScreen} /> */}

      {/* Cửa sổ nhỏ để sửa thông tin Topic*/}
      <RepairTopicScreen display={isRepairBtn} handle={displayRepairTopicScreen} item={pick} setFreshKey={setFreshKey} />

      {/* Cửa sổ nhỏ để xóa topic*/}
      <DeleteNotification display={isDelete} handle={displayDeleteNotification} id={pick?.id} isTopic={1} setFreshKey={setFreshKey} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '70%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  base: {
    flex: 1,
    // marginTop: 28
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
  optBlock: {
    paddingHorizontal: 16,
    paddingVertical: 12,

  },
  categoryBar: {
    height: 35,
    minWidth: 200,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  topicList: {
    backgroundColor: '#DFDFDE',
    paddingTop: 5,
    // minHeight: height * 0.7,
    // maxHeight: height * 0.77
  },
  topicTag: {
    backgroundColor: '#fff',
    margin: 8,
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 15
  },
  topicFirstBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topicSecondBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    zIndex: -1
  },
  topicTitle: {
    fontWeight: '600',
    fontSize: 23
  },
  topicAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    backgroundColor: '#6A197D'
  },
  topicPractise: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 5
  },
  topicFirstText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 3
  },
  topicSecondText: {
    color: 'blue',
    fontWeight: '600'
  }
});
export { MainScreen };
