import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity,  Dimensions, Pressable, SafeAreaView } from 'react-native';
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { PlusBtn } from '../components/PlusButton'
import { ModalPractice } from '../components/modalPractice';
import { useState, useEffect } from 'react';
import { getCollection } from '../api/firebaseApi';
import { collection } from 'firebase/firestore';
import { getTopicById } from '../api/firebaseApi';
import { getAuth, signOut } from 'firebase/auth';

// New Screen
import {OptionBlock} from './OptionBlock';
import {AddTopicScreen} from './addTopic';
import {RepairTopicScreen} from './repairTopic';
import {DeleteNotification} from './deleteNotification';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


function TopicTag(props) {

    const handle = () => {
        navigation.navigate({ name: 'addSpending' })
    }
    
    const [show, setShow] = useState('none');
  
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
                        <View style={styles.optBlock}>
                          <Pressable onPress={showBlock}>
                            {(show == 'none') ? <Entypo name="dots-three-vertical" size={15} color="black" />: <AntDesign name="close" size={24} color="black" />}
                          </Pressable>
                          <OptionBlock top={'100%'} right={-10} display={show} isRepairBtn={props.isRepairBtn} repairTopic={props.repairTopic} isDelete={props.isDelete} deleteTopic={props.deleteTopic}/>
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
    const [data, setdata] = useState([])
    const [topic, setTopic] = useState()


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTopicById().then(data => {
                setdata(data)
                console.log(data)
            }).then(() => {
            })
            //  console.log('Hello World!')
        });
        return unsubscribe;
    }, [navigation]);

    const [modalVisible, setModalVisible] = useState(false);

    const Logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
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
    if(isDelete == 'none') {
      setIsDelete('flex');
    }
    else {
      setIsDelete('none');
    }
  }
    
    return (
        <SafeAreaView style={styles.base}>
            <View style={styles.navbar}>
                <View style={styles.sub_block}>
                  <TouchableHighlight>
                    <AntDesign name="arrowleft" size={24} color="white" />
                  </TouchableHighlight>
                  <TouchableHighlight>
                    <FontAwesome name="search" size={20} color="white" />
                  </TouchableHighlight>
                </View>
              </View>

            <ModalPractice visible={modalVisible} setVisible={setModalVisible} navigation={navigation} id={topic}></ModalPractice>

            <ScrollView style={styles.topicList}>

                {data.map((item, idx) => {
                    return (
                        <TopicTag key={idx} settopic={() => { setTopic(item.id) }} setvisible={setModalVisible} name={item.name} press={() => navigation.navigate('Card', item)}
                            pressAdd={() => { navigation.navigate('addCard', item) }} isRepairBtn={isRepairBtn} repairTopic={displayRepairTopicScreen} isDelete={isDelete} deleteTopic={displayDeleteNotification} />
                    )
                })}
            </ScrollView>
            
            {/* Nút bấm để thêm topic*/}
            <PlusBtn press={() => { navigation.navigate({ name: 'Add Collection' }); displayAddTopicScreen() }} />

            {/* Cửa sổ nhỏ để nhập tên Topic*/}
              <AddTopicScreen display={isPressBtn} handle={displayAddTopicScreen}/>

              {/* Cửa sổ nhỏ để sửa thông tin Topic*/}
              <RepairTopicScreen display={isRepairBtn} handle={displayRepairTopicScreen}/>

              {/* Cửa sổ nhỏ để xóa topic*/}
              <DeleteNotification display={isDelete} handle={displayDeleteNotification}/>
                  
            <TouchableHighlight style={styles.topicPractise} onPress={() => Logout()}>
                <Text> Logout </Text>
            </TouchableHighlight>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    marginTop: 28
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
    paddingHorizontal: 8
  },
  topicList: {
    backgroundColor: '#DFDFDE',
    paddingTop: 5,
    minHeight: height * 0.7,
    maxHeight: height * 0.77
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
export {MainScreen};
