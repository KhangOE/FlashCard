import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { db } from '../utils'

// returns Database object
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function DeleteNotification(props) {
  const del = async (id) => {
    console.log('delete')
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Collections WHERE id = ? ', [id])
    })
    // setFreshkey(state => state + 1)
  }

  const delCard = async (id) => {
    console.log('delete')
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Cards WHERE id = ? ', [id])
    })
    // setFreshkey(state => state + 1)
  }

  const deleteCard = async () => {

    if (props.isTopic) {
      await del(props.id)
      console.log(props.id)
      props.setFreshKeyc(state => state + 1)
    }
    else {
      //    await deleteSpending(props.id)
      console.log(props.id)
      await delCard(props.id)
      props.setFreshKey(state => state + 1)
      props.setCard(state => state.filter((item) => {
        return item.id != props.id

      }))
    }

  }
  return (
    <View style={[styles.bigBlock, { display: props.display }]}>
      <Pressable style={styles.wrapper}>

        <View style={styles.dialog}>
          <View style={styles.notification}>
            <Text style={styles.msg}> Bạn có chắc muốn xóa ? </Text>
          </View>

          <View style={styles.selectBtn}>
            <Pressable style={[styles.btn, { marginRight: 10 }]} onPress={props.handle}>
              <Text style={[styles.textSelect, { color: 'red' }]}>Hủy</Text>
            </Pressable>

            <Pressable style={[styles.btn, { marginLeft: 10 }]} onPress={() => {
              props.handle()
              // props.displayDeleteNotification
              deleteCard()

            }}>
              <Text style={styles.textSelect}>Xóa</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
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
    marginBottom: 20,
    padding: 20,
  },
  notification: {
    width: '100%'
  },
  msg: {
    fontSize: 18,
    fontWeight: '700'
  },
  selectBtn: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: 10
  },
  btn: {
    padding: 6
  },
  textSelect: {
    fontSize: 16,
    fontWeight: '500'
  }
});
export { DeleteNotification };
