import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { PlusBtn } from '../components/PlusButton'
import { getCardByCid } from '../api/firebaseApi';
import { checkDoc } from '../api/firebaseApi';
import { Audio } from 'expo-av';
import { Buffer } from "buffer";
import SoundPlayer from 'react-native-sound-player'
import { ModalPractice } from '../components/modalPractice';


function Card(props) {

    return (
        <TouchableHighlight style={styles.card}>
            <View>
                <View>
                    <Text style={styles.cardTitle}>{props.en}</Text>
                </View>
                <View style={styles.cardMeaning}>
                    <Text>{props.vi}</Text>
                </View>
                <View style={styles.cardFooter}>
                    <AntDesign name="sound" size={18} color="black" />
                    <TouchableHighlight style={styles.cardOpion}>
                        <Entypo name="dots-three-vertical" size={13} color="black" />
                    </TouchableHighlight>
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



    return (
        <View style={styles.base}>
            <View style={styles.navbar}>
                {/* <Button title="Play Sound" onPress={playSound} /> */}

            </View>

            <View style={styles.cardList}>
                <ModalPractice visible={modalVisible} setVisible={setModalVisible} navigation={navigation}
                    tobasic={() => { navigation.navigate('basicreview', cid) }}></ModalPractice>
                <View style={styles.cardFirstBlock}>
                    <Text style={styles.cardTotal}> Tất cả : 2 </Text>
                </View>
                <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }} style={styles.cardSecondBlock}>
                    {card?.map((item) => {
                        return (
                            <View key={item.id}>
                                <Card vi={item.vi} en={item.en}></Card>
                            </View>

                        )
                    })}
                </ScrollView>
            </View>

            <View style={styles.cardThirdBlock}>
                <TouchableHighlight onPress={() => { setModalVisible(state => !state) }}>
                    <View style={styles.footerButton}>
                        <SimpleLineIcons name="graduation" size={24} color="white" />
                        <Text style={styles.footerText}>Thực hành</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View style={styles.footerButton}>
                        <Feather name="plus" size={24} color="white" />
                        <Text style={styles.footerText}>Thêm thẻ</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
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
    // maxHeight: 350,
    // minHeight: 350,
    paddingHorizontal: 14
  },
  card: {
    backgroundColor: '#fff',
    width: '45%',
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: 5
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 16
  },
  cardMeaning: {
    marginVertical: 5
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    // left: 0,
    // right: 0,
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

