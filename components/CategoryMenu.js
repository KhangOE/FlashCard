import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

export default function CategoryMenu({ editCategory, deleteCategory }) {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    return (
        <View style={{ zIndex: 100, elevation: 100 }}>
            <Provider>
                <Menu
                    style={{ top: 20, left: -120, position: 'absolute', zIndex: 100 }}
                    contentStyle={{ zIndex: 100 }}
                    visible={visible}
                    onDismiss={closeMenu}
                    overlayAccessibilityLabel='Close menu'
                    anchor={
                        <TouchableOpacity onPress={openMenu}>
                            <Entypo name="dots-three-vertical" size={15} color="black" />
                        </TouchableOpacity>
                    }>
                    <Menu.Item
                        onPress={editCategory}
                        title="Edit"
                    />
                    <Menu.Item
                        onPress={deleteCategory}
                        title="Delete"
                    />
                </Menu>
            </Provider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});