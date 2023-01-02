import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { PlusBtn } from '../components/PlusButton'

function Card(props) {
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
                    <TouchableHighlight style={styles.cardOpion}>
                        <Entypo name="dots-three-vertical" size={13} color="black" />
                    </TouchableHighlight>
                </View>
            </View>
        </TouchableHighlight>
    );
}

function CardScreen({ navigation, route }) {
    const [cName, setCName] = useState()
    useEffect(() => {
        setCName(route.params.name)
    }, [])
    return (
        <View style={styles.base}>
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

            <View style={styles.cardList}>
                <View style={styles.cardFirstBlock}>
                    <Text style={styles.cardTotal}> Tất cả : 2 </Text>
                </View>
                <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }} style={styles.cardSecondBlock}>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </ScrollView>
            </View>

            <View style={styles.cardThirdBlock}>
                <TouchableHighlight>
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
        color: 'white',
        //fontWeight: 400,
        fontSize: 16
    },
    cardSecondBlock: {
        backgroundColor: '#DFDFDE',
        maxHeight: 350,
        minHeight: 350,
        paddingHorizontal: 14
    },
    card: {
        backgroundColor: 'white',
        width: 140,
        maxWidth: 140,
        paddingVertical: 5,
        paddingHorizontal: 12,
        marginBottom: 5
    },
    cardTitle: {
        //fontWeight: 700,
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
        // position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#DFDFDE',
        borderTopWidth: 1,
        borderTopColor: 'white'
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
        color: 'white',
        //fontWeight: 500
    }
});
export { CardScreen };

