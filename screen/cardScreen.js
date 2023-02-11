import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity, SafeAreaView, Dimensions, Pressable } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { PlusBtn } from '../components/PlusButton'
import { getCardByCid } from '../api/firebaseApi';
import { checkDoc } from '../api/firebaseApi';
import { Audio } from 'expo-av';
import { Buffer } from "buffer";
import SoundPlayer from 'react-native-sound-player'
import { ModalPractice } from '../components/modalPractice';

// New Screen
import { OptionBlock } from './OptionBlock';
import { DeleteNotification } from './deleteNotification'
import { AddCardScreen } from './addCard';
import { RepairCardScreen } from './repairCard';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

function Card(props) {
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
    <TouchableHighlight style={styles.card}>
      <View>
        <View>
          <Text style={styles.cardTitle}>green</Text>
        </View>
        <View style={styles.cardMeaning}>
          <Text>màu xanh</Text>
        </View>
        <View style={styles.cardFooter}>
          <AntDesign name="sound" size={18} color="black" />
          <View style={styles.optBlock}>
            <Pressable style={styles.cardOpion} onPress={showBlock}>
              {(show == 'none') ? <Entypo name="dots-three-vertical" size={15} color="black" /> : <AntDesign name="close" size={15} color="black" />}
            </Pressable>
            <OptionBlock bottom={'101%'} right={-20} display={show} isRepairBtn={props.isRepairBtn} repairTopic={props.repairTopic} isDelete={props.isDelete} deleteTopic={props.deleteTopic} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

function CardScreen({ navigation, route }) {

  const [card, setCard] = useState()
  const [cid, setCid] = useState()
  // const [sound, setSound] = useState();


  const [modalVisible, setModalVisible] = useState(false);

  // async function playSound() {
  //     const { sound } = await Audio.Sound.createAsync(
  //         { uri: 'https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3' },
  //         { shouldPlay: true }
  //     );
  //     setSound(sound);

  //     console.log('Playing Sound');
  //     await sound.playAsync();
  // }



  // useEffect(() => {
  //     playSound()
  // }, [])
  // React.useEffect(() => {
  //     return sound
  //         ? () => {
  //             console.log('Unloading Sound');
  //             sound.unloadAsync();
  //         }
  //         : undefined;
  // }, [sound]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(route.params.id)
      setCid(route.params.id)
      checkDoc({ cid: route.params.id }).then(data => {
        setCard(data)
        console.log(data)
        //  console.log(data)
      }).then(() => {
      })
      //  console.log('Hello World!')
    });
    return unsubscribe;
  }, [navigation]);


  // Add card
  const [isPressBtn, setIsPressBtn] = useState('none');
  // Repair card
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
      {/* <Button title="Play Sound" onPress={playSound} /> */}



      <View style={styles.cardList}>
        <ModalPractice visible={modalVisible} setVisible={setModalVisible} navigation={navigation}
          tobasic={() => { navigation.navigate('basicreview', cid) }} id={cid}></ModalPractice>
        <View style={styles.cardFirstBlock}>
          <Text style={styles.cardTotal}> Tất cả : 2 </Text>
        </View>
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingVertical: 10 }} style={styles.cardSecondBlock}>
          {card?.map((item) => {
            return (
              <View key={item.id}>

                <Card vi={item.meaning} en={item.word} isRepairBtn={isRepairBtn} repairTopic={displayRepairTopicScreen} isDelete={isDelete} deleteTopic={displayDeleteNotification}></Card>
              </View>

            )
          })}
        </ScrollView>
      </View>

      <View style={styles.cardThirdBlock}>
        <Pressable onPress={() => { setModalVisible(state => !state) }}>
          <View style={styles.footerButton}>
            <SimpleLineIcons name="graduation" size={24} color="white" />
            <Text style={styles.footerText}>Thực hành</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {
          navigation.navigate('addCard', route.params
          );
          displayAddTopicScreen();
        }}>
          <View style={styles.footerButton}>
            <Feather name="plus" size={24} color="white" />
            <Text style={styles.footerText}>Thêm thẻ</Text>
          </View>
        </Pressable>
      </View>

      {/* Cửa sổ nhỏ để nhập tên Topic*/}
      <AddCardScreen display={isPressBtn} handle={displayAddTopicScreen} />

      {/* Cửa sổ nhỏ để sửa thông tin Topic*/}
      <RepairCardScreen display={isRepairBtn} handle={displayRepairTopicScreen} />

      {/* Cửa sổ nhỏ để xóa topic*/}
      <DeleteNotification display={isDelete} handle={displayDeleteNotification} />
    </SafeAreaView >
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
  cardList: {
    backgroundColor: '#DFDFDE'
  },
  cardFirstBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  cardTotal: {
    backgroundColor: '#6A197D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: '#fff',
    fontWeight: '400',
    fontSize: 16
  },
  cardSecondBlock: {
    backgroundColor: '#DFDFDE',
    minHeight: height * 0.7,
    maxHeight: height * 0.77,
    paddingHorizontal: 14
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: 20,
    zIndex: 1
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 18
  },
  cardMeaning: {
    marginVertical: 5
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  cardOpion: {
    marginTop: 3
  },
  cardThirdBlock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#fff'
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6A197D',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20
  },
  footerText: {
    marginLeft: 12,
    color: '#fff',
    fontWeight: '500'
  }
});
export { CardScreen };

