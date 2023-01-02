import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign, Entypo, Feather, SimpleLineIcons } from '@expo/vector-icons';

function BasicReviewScreen() {
    return (
        <View style={styles.base}>
            <View style={styles.navbar}>
                <View style={styles.sub_block}>
                    <View style={styles.heading}>
                        <TouchableHighlight>
                            <AntDesign name="arrowleft" size={24} color="white" />
                        </TouchableHighlight>
                        <Text style={styles.topicTitle}> Color </Text>
                    </View>
                    <TouchableHighlight>
                        <FontAwesome name="search" size={20} color="white" />
                    </TouchableHighlight>
                </View>
            </View>

            <TouchableHighlight style={styles.cardBlock}>
                <View style={styles.card}>
                    <View style={styles.cardWrapper}>
                        <Text style={styles.vocabulary}> green </Text>
                        <View style={styles.sound}>
                            <AntDesign name="sound" size={24} color="black" />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>

            <View style={styles.footerCard}>
                <View style={styles.footerCardBlock}>
                    <Feather name="arrow-left-circle" size={40} color="#6A197D" />
                    <Feather name="arrow-right-circle" size={40} color="#6A197D" />
                </View>
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
        height: '10vh',
    },
    navbar: {
        backgroundColor: '#6A197D',
        alignItems: 'center'
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30
    },
    topicTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 700
    },
    cardBlock: {
        backgroundColor: '#DFDFDE',
        flex: 1,
        backfaceVisibility: 'visible'
    },
    card: {
        backgroundColor: 'white',
        width: '80%',
        height: '80%',
        marginHorizontal: 'auto',
        marginTop: 25,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    cardWrapper: {
        alignItems: 'center',
        gap: 20
    },
    vocabulary: {
        fontSize: 30,
        fontWeight: 700
    },
    sound: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 50,
        padding: 10
    },
    footerCard: {
        height: '10vh',
        paddingHorizontal: 40,
        paddingVertical: 5,
        marginBottom: '3%'
    },
    footerCardBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    }
});

export { BasicReviewScreen };