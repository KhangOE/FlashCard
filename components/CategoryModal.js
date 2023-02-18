import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CustomModal from './CustomModal'
import { PlusBtn } from './PlusButton'
import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { app, auth } from '../firebase'
import { FontAwesome5 } from '@expo/vector-icons';
import { addCategory } from '../api/firebaseApi'


const db = getFirestore(app);


export default function CategoryModal({ setModalVisible, modalVisible, data, selected, setSelected, updateCategory }) {
    const [addCategoryVisible, setAddCategoryVisible] = useState(false)
    const [category, setCategory] = useState('')
    const [color, setColor] = useState('#6A197D')
    const [selectedCategory, setSelectedCategory] = useState(null)

    const onAddCategory = async () => {
        try {
            addCategory({ category, color })
            updateCategory()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const editCategory = async () => {
        try {
            const docRef = await setDoc(doc(db, "categories", auth.currentUser.uid, "categories", selectedCategory.id), {
                name: category,
                color: color
            });
            updateCategory()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const deleteCategory = async (id) => {
        try {
            await deleteDoc(doc(db, "categories", auth.currentUser.uid, "categories", id));
            updateCategory()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        if (!addCategoryVisible) setSelectedCategory(null)
    }, [addCategoryVisible])

    return (
        <CustomModal modalVisible={modalVisible} setModalVisible={setModalVisible} title='category' fixedHeight={true}>
            <CustomModal modalVisible={addCategoryVisible} setModalVisible={setAddCategoryVisible} title={selectedCategory ? "edit category" : "add category"} checkBtn={true} checkFunc={selectedCategory ? editCategory : onAddCategory} themeColor={color}>
                <View style={{ height: 200 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="category"
                        placeholderTextColor="#B0B0B0"
                        onChangeText={(text) => setCategory(text)}
                        value={category}
                    />
                    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                        <TouchableOpacity style={{ backgroundColor: "#6A197D", height: 40, width: 40 }} onPress={() => setColor("#6A197D")}>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "#F9ED69", height: 40, width: 40 }} onPress={() => setColor("#F9ED69")}>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "#F08A5D", height: 40, width: 40 }} onPress={() => setColor("#F08A5D")}>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "#B83B5E", height: 40, width: 40 }} onPress={() => setColor("#B83B5E")}>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "#3F72AF", height: 40, width: 40 }} onPress={() => setColor("#3F72AF")}>
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomModal>
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => {
                    setModalVisible(false)
                    setSelected(null)
                }} style={[styles.item, selected === null && { backgroundColor: "#6A197D" }]}>
                    <Text style={selected === null && { color: "white" }}>all</Text>
                </TouchableOpacity>
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => {
                            setModalVisible(false)
                            setSelected(item)
                        }} style={[styles.item, selected === item && { backgroundColor: item.color }]}>
                            <Text style={selected === item && { color: "white" }}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', width: 50, justifyContent: 'space-between', marginRight: 10 }}>
                                <TouchableOpacity onPress={() => deleteCategory(item.id)}>
                                    <FontAwesome5 name="trash" size={18} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setAddCategoryVisible(true), setSelectedCategory(item), setCategory(item.name) }}>
                                    <FontAwesome5 name="pen" size={18} color="black" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <PlusBtn press={() => setAddCategoryVisible(true)} />
        </CustomModal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#dfdfdf"
    },
    item: {
        height: 40,
        borderRadius: 10,
        backgroundColor: "white",
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        height: 40,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        margin: 10
    },
})
