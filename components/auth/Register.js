import { View, Button, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const db = getFirestore();

  const onSignUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          name: name,
          email: user.email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstBlock}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.firstBlockText, styles.nonSelectedText]}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.firstBlockText}> / </Text>
        <TouchableOpacity>
          <Text style={styles.firstBlockText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondBlock}>
        <Text style={styles.secondBlockText}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={styles.secondBlockText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.secondBlockText}>password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.thirdBlock}>
        <TouchableOpacity style={styles.button} onPress={onSignUp}>
          <Text style={styles.thirdBlockText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  firstBlock: {
    flexDirection: "row",
    marginVertical: 20
  },
  firstBlockText: {
    fontSize: 30,
    fontWeight: 600,
    color: "#0D2841"
  },
  nonSelectedText: {
    color: "#B0B0B0"
  },
  secondBlock: {
    marginVertical: 20
  },
  secondBlockText: {
    fontSize: 16,
    color: "#0D2841"
  },
  input: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 15,
    fontSize: 16,
  },
  thirdBlock: {
    marginVertical: 20,
  },
  button: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#0D2841",
    alignItems: "center",
    justifyContent: "center"
  },
  thirdBlockText: {
    fontWeight: 500,
    fontSize: 24,
    color: "#FAFAFA"
  }
})
