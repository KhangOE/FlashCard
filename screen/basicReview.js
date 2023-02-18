import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableHighlight, Image, TouchableOpacity, Animated, Easing, Dimensions, SafeAreaView } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import { getCardsbyCID, getTopicById } from '../api/firebaseApi';
import { Audio } from 'expo-av';
import { auth } from '../firebase';
import SafeViewAndroid from "../safeAreaViewAndroid";
//import { getTopicById } from '../api/firebaseApi';
const tenvhHeight = Dimensions.get('screen').height * 0.1;
const cardWidth = Dimensions.get('window').width * 0.8;

function CardReview(props) {
  const rotate = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);
  const rotateFront = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  const rotateBack = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg']
  });

  function flipCard() {
    Animated.timing(rotate, {
      toValue: isFlipped ? 0 : 1,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => setIsFlipped(!isFlipped));


  }
  return (
    <Pressable style={styles.card} onPress={flipCard} android_disableSound={true}>

      {
        props.item.image ?
          <View style={styles.cardWrapper}>
            <Animated.View style={[styles.cardFront, { transform: [{ rotateY: rotateFront }] }]}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: props.item.image,
                }}
              />
              <Text style={styles.vocabulary}>{props.en}</Text>
              <Pressable style={styles.sound} onPress={() => { props.sound() }}>
                {/* // Đặt hàm playSound ở đây */}
                <AntDesign name="sound" size={24} color="black" />
              </Pressable>

            </Animated.View>
            <Animated.View style={[styles.cardBack, { transform: [{ rotateY: rotateBack }] }]}>
              <Text style={styles.cardBackText}>{props.vi} </Text>
            </Animated.View>
          </View>

          :

          <View style={styles.cardWrapper}>
            <Animated.View style={[styles.cardFront, { transform: [{ rotateY: rotateFront }] }]}>
              <Text style={styles.vocabulary2}>{props.en}</Text>
              <Pressable style={styles.sound} onPress={() => { props.sound() }}>
                {/* // Đặt hàm playSound ở đây */}
                <AntDesign name="sound" size={24} color="black" />
              </Pressable>

            </Animated.View>
            <Animated.View style={[styles.cardBack, { transform: [{ rotateY: rotateBack }] }]}>
              <Text style={styles.cardBackText}>{props.vi} </Text>
            </Animated.View>
          </View>
      }

    </Pressable>
  );
}


function BasicReviewScreen({ navigation, route }) {
  // Xu ly am thanh
  const [card, setCard] = useState([])
  const [sound, setSound] = useState();
  const [cardNumber, setCardNumber] = useState(1);


  useEffect(() => {
    // console.log(route?.params)
    const callApi = async () => {
      await getCardsbyCID({ cid: route.params || 1 }).then(data => {
        console.log('data', data)
        setCard(data)
        // console.log(data)
        //  console.log(data)
      }).then(() => {
      })

    }
    callApi()

    //console.log(`https://api.dictionaryapi.dev/media/pronunciations/en/${card[cardNumber - 1].en.toLowerCase()}-uk.mp3`)
  }, [])


  async function playSound() {
    console.log('sound')
    const a = axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${card[cardNumber - 1].word.toLowerCase()}`
    ).then(async (data) => {
      if (data.data[0].phonetics[0].audio) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: data.data[0].phonetics[0].audio },
          { shouldPlay: true }
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
      }
      else if (data.data[0].phonetics[1].audio) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: data.data[0].phonetics[1].audio },
          { shouldPlay: true }
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
      }
      else {
        const { sound } = await Audio.Sound.createAsync(
          { uri: data.data[0].phonetics[2].audio },
          { shouldPlay: true }
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
      }

    })
  }


  async function playSound2() {
    console.log('sound')
    const URL = `https://od-api.oxforddictionaries.com:443/api/v2/entries/en-gb/${card[cardNumber - 1].word.toLowerCase()}?strictMatch=false`
    const a = axios.get(URL,
      {
        headers: {
          app_id: '20d5be5c',
          app_key: '3689eaa3c8bbb54c633611ce106adb70'
        }
      }).then(async (data) => {
        const { sound } = await Audio.Sound.createAsync(
          { uri: data.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile },
          { shouldPlay: true }
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
        console.log(data.data.results[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile)
      }
      )
  }

  async function playSound3() {
    console.log('sound')
    const { sound } = await Audio.Sound.createAsync(
      { uri: card[cardNumber - 1].sound },
      { shouldPlay: true }
    );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();



  }





  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  // Xử lý animation flip va scroll
  const cardTotal = card.length || 10;     // Tong so luong card
  const scrollPoint = useRef(0);
  let distance = cardWidth + 20;

  function moveLeftRight(index) {
    if (index == 1) {
      scrollPoint.current.scrollTo({ x: distance * cardNumber, animated: true });
      setCardNumber(cardNumber == cardTotal ? cardTotal : cardNumber + 1);
    }
    else {
      scrollPoint.current.scrollTo({ x: distance * (cardNumber - 2), animated: true });
      setCardNumber(cardNumber == 1 ? 1 : cardNumber - 1);
    }

  }
  // Trang chia thành 3 thành phần chính : navbar, scrollview , footer
  return (
    <View style={styles.base}>
      <View style={styles.navbar}>
        <View style={styles.sub_block}>
          <View style={styles.heading}>
            <TouchableHighlight onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableHighlight>
            <Text style={styles.topicTitle}> Color </Text>
          </View>
          <TouchableHighlight style={{ opacity: 0 }}>
            <FontAwesome name="search" size={20} color="white" />
          </TouchableHighlight>
        </View>
      </View>

      <ScrollView style={styles.mainSection} horizontal={true} showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        decelerationRate="fast"
        snapToInterval={cardWidth + 22}
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: 10,
          bottom: 0,
          right: 10,
        }}
        ref={scrollPoint}
      >
        {card.map((item, index) => {
          return (<>
            <CardReview item={item} en={item.word} vi={item.meaning} key={index} sound={playSound3} />
          </>)
        })}

      </ScrollView>


      <View style={styles.footerCard}>
        <View style={styles.footerCardBlock}>
          <TouchableOpacity onPress={() => moveLeftRight(-1)}>
            <Feather name="arrow-left-circle" size={40} color="#6A197D" />
          </TouchableOpacity>
          <Text style={styles.cardPosition}> {cardNumber} / {cardTotal} </Text>
          <TouchableOpacity onPress={() => moveLeftRight(1)}>
            <Feather name="arrow-right-circle" size={40} color="#6A197D" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    // marginTop: 24
  },
  sub_block: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: tenvhHeight
  },
  navbar: {
    backgroundColor: '#6A197D',
    alignItems: 'center'
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  topicTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 15
  },
  mainSection: {
    backgroundColor: '#DFDFDE',
    overflow: 'hidden',
    paddingLeft: 20,
    paddingRight: 10
  },
  card: {
    width: cardWidth,
    height: '80%',
    marginTop: 25,
    marginRight: 10,
    marginLeft: 10
  },
  cardWrapper: {
    width: '100%',
    height: '100%'
  },
  cardFront: {
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    zIndex: 1
  },
  vocabulary: {
    fontSize: 35,
    fontWeight: '700',
    marginTop: '15%',
    marginBottom: '8%'
  },
  vocabulary2: {
    fontSize: 35,
    fontWeight: '700',
    marginTop: '50%',
    marginBottom: '15%'
  },
  sound: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    padding: 15
  },
  cardBack: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: 'white'
  },
  cardBackText: {
    fontSize: 25,
    fontWeight: '500',
    bottom: '10%'
  },
  footerCard: {
    height: tenvhHeight,
    paddingHorizontal: 40,
    paddingVertical: 5,
    marginBottom: '3%'
  },
  footerCardBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  cardPosition: {
    fontSize: 18,
    fontWeight: '400'
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: '80%',
    height: 250,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black'
  },
  logo: {
    width: 66,
    height: 58,
  },

});

export { BasicReviewScreen };
