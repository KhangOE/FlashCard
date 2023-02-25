import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import {
  AntDesign,
} from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import { db } from '../../utils'


const width = Dimensions.get('window').width

export const PracticeWrite = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState({});
  const [userChoice, setUserChoice] = useState('');
  const [complete, setComplete] = useState(false);
  const [correct, setCorrect] = useState(null);
  const [wrongList, setWrongList] = useState([]);
  const [correctList, setCorrectList] = useState([]);
  const [hide, setHide] = useState(true)

  const isFocused = useIsFocused();

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    if (isFocused) {
      setComplete(false)
      setWrongList([])
      const callApi = async () => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM Cards WHERE CID = ?', [route.params],
            (txObj, { rows: { _array } }) => {
              setData(shuffle(_array))
              setCorrectList(_array)
            }
          )
        })
      }
      callApi()
    }
  }, [isFocused]);

  const firstUpdate = useRef(true);

  // if data change (because of shift) update question 
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (data.length != 0) {
      setQuestion({ data: data[0] })
    } else {
      setComplete(true)
    }
  }, [data])


  const submit = () => {
    if (userChoice !== '') {
      setHide(false)
      if (userChoice === question.data.word) {
        setCorrect(true);
      } else {
        setCorrect(false)
        if (!wrongList.includes(question.data)) {
          setWrongList(prev => [...prev, question.data])
          setCorrectList(prev => prev.filter(x => x !== question.data))
        }
      }
    }
  }

  const nextCard = () => {
    setHide(true)
    setData(data.slice(1))
    setCorrect(null)
    setUserChoice('')
  }

  useEffect(() => {
    if (complete) {
      navigation.navigate('PracticeComplete', { wrongList: wrongList, correctList: correctList })
    }
  }, [complete]);

  return (
    <View style={styles.base}>
      <View style={styles.navbar}>
        <View style={styles.sub_block}>
          <TouchableHighlight onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableHighlight>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <View style={styles.questionBlock}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.question}>{question.data?.meaning}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.question, styles.questionAnswer, hide && { display: 'none' }]}>{question.data?.word}</Text>
            </View>
          </View>
          {question.data?.image && <View style={styles.imageBlock}>
            <RemoteImage uri={question.data.image} desiredWidth={width} />
          </View>}
          <View style={styles.answerBlock}>
            <TextInput style={styles.answerInput}
              onChangeText={(text) => setUserChoice(text)}
              value={userChoice} />
          </View>
        </View>
        {correct === null ? <View style={{ height: 100, backgroundColor: "gray" }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#A91079' }} onPress={() => setHide(prev => !prev)}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Xem kết quả</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#570A57' }} onPress={submit}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Kiểm tra</Text>
          </TouchableOpacity>
        </View> :
          <TouchableOpacity style={[{ height: 50, backgroundColor: "gray", justifyContent: 'center', alignItems: 'center' }, correct ? { backgroundColor: 'green' } : { backgroundColor: 'red' }]} onPress={nextCard}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Thẻ tiếp theo</Text>
          </TouchableOpacity>
        }
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  sub_block: {
    width: "92%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  navbar: {
    backgroundColor: "#6A197D",
    alignItems: "center",
  },
  questionBlock: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  question: {
    fontSize: 20
  },
  questionAnswer: {
    fontWeight: '700',
  },
  imageBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  answerBlock: {
    height: 120
  },
  answerInput: {
    borderWidth: 2,
    borderColor: "#3E54AC",
    flex: 1,
    borderRadius: 10,
    margin: 5,
    fontSize: 20,
    padding: 5
  }
});

const RemoteImage = ({ uri, desiredWidth }) => {
  const [desiredHeight, setDesiredHeight] = React.useState(0)

  Image.getSize(uri, (width, height) => {
    setDesiredHeight(desiredWidth / width * height)
  })

  return (
    <Image
      source={{ uri }}
      style={{
        borderWidth: 1,
        width: desiredWidth,
        height: desiredHeight
      }}
    />
  )
}