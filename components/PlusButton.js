import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons'

function PlusBtn(props) {
    return (
        <TouchableHighlight style={styles.btn} onPress={props.press}>
            <AntDesign name='plus' size={25} color='white' />
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#6A197D',
        padding: 15,
        alignSelf: 'center',
        position: 'absolute',
        right: 15,
        bottom: 25,
        borderRadius: 50
    }
});

export { PlusBtn };
