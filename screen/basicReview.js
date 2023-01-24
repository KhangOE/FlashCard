import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableHighlight, TouchableOpacity, Animated, Easing, Dimensions, SafeAreaView } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import { checkDoc } from '../api/firebaseApi';
import { Audio } from 'expo-av';

const tenvhHeight = Dimensions.get('screen').height * 0.1;
const cardWidth = Dimensions.get('window').width * 0.8;

function CardReview() {
  const rotate = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);
  const rotateFront = rotate.interpolate({
    inputRange: [0,1],
    outputRange: ['0deg','180deg']
  });
  const rotateBack = rotate.interpolate({
    inputRange: [0,1],
    outputRange: ['180deg','360deg']
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
      <View style={styles.cardWrapper}>
          <Animated.View style={[styles.cardFront, {transform: [{rotateY: rotateFront}]} ]}>
              <Text style={styles.vocabulary}> green </Text>
              <View style={styles.sound}>
                <AntDesign name="sound" size={24} color="black" /> 
              </View>  
          </Animated.View>
          <Animated.View style={[styles.cardBack, {transform: [{rotateY: rotateBack}]} ]}>
              <Text style={styles.cardBackText}>màu xanh </Text> 
          </Animated.View>
      </View>
    </Pressable>
  );
}


function BasicReviewScreen({ navigation, route }) {
    // Xu ly am thanh
    const [card, setCard] = useState([])
    const [sound, setSound] = useState();
    useEffect(() => {
        console.log(route?.params)
        checkDoc({ cid: route.params || 1 }).then(data => {
            setCard(data)
            console.log(data)
            //  console.log(data)
        }).then(() => {
        })
    }, [])

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            { uri: `https://api.dictionaryapi.dev/media/pronunciations/en/white-us.mp3` },
            { shouldPlay: true }
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }
    useEffect(() => {
        playSound()
    }, [])
    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    
    // Xử lý animation flip va scroll
  const cardTotal = 12;     // Tong so luong card
  const scrollPoint = useRef(0);
  let distance = cardWidth + 20;
  const [cardNumber, setCardNumber] = useState(1);
  function moveLeftRight(index) {
    if (index == 1) {
      scrollPoint.current.scrollTo({x: distance * cardNumber, animated: true});
      setCardNumber(cardNumber == cardTotal ? cardTotal : cardNumber + 1);
    }
    else {
      scrollPoint.current.scrollTo({x: distance * (cardNumber - 2), animated: true});
      setCardNumber(cardNumber == 1 ? 1 : cardNumber - 1);
    }
    
  }
  // Trang chia thành 3 thành phần chính : navbar, scrollview , footer
    return (
       <SafeAreaView style={styles.base}>
        <View style={styles.navbar}>
          <View style={styles.sub_block}>
            <View style={styles.heading}>
              <TouchableHighlight>
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableHighlight>
              <Text style={styles.topicTitle}> Color </Text>
            </View>
            <TouchableHighlight style={{opacity: 0}}>
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
          <CardReview />
          <CardReview />
          <CardReview />
          <CardReview />
          <CardReview />
          <CardReview />
          <CardReview />
          <CardReview />
          <CardReview />
          <CardReview />
          <CardReview />
          <CardReview />
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
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    marginTop: 24
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
    backgroundColor: 'white'
  },
  vocabulary: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: '30%',
    marginBottom: '20%'
  },
  sound: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    padding: 10
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
  }
});

export { BasicReviewScreen };
