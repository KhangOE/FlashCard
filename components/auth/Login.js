import { View, Button, TextInput, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const db = getFirestore();

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const onSignIn = async () => {
    if (email === "" || password === "") {
      setError("Vui lòng nhập đầy đủ thông tin!")
    } else if (!validateEmail(email)) {
      setError("Email không đúng!")
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/user-not-found") {
            setError("Người dùng không tìm thấy")
          } else if (errorCode === "auth/wrong-password") {
            setError("Sai mật khẩu")
          }
        });
    }

  };

  const onGoogleSignIn = async () => {
    signInWithPopup(auth, provider).then(result => {
      const user = result.user;
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        image: user.photoURL
      });
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.firstBlock}>
        <TouchableOpacity>
          <Text style={styles.firstBlockText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.firstBlockText}> / </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[styles.firstBlockText, styles.nonSelectedText]}>Sign Up</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.secondBlock}>
        <Text style={styles.secondBlockText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="#B0B0B0"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.secondBlockText}>password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="#B0B0B0"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <Text style={[styles.errorMessage, error !== "" && { opacity: 1 }]}>{error}</Text>
      </View>
      <View style={styles.thirdBlock}>
        <TouchableOpacity style={styles.button} onPress={onSignIn}>
          <Text style={styles.thirdBlockText}>Log in</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: "center", marginVertical: 10 }}>or</Text>
        <FontAwesome.Button name="google" backgroundColor="#4285F4" style={{ fontFamily: "Roboto", alignSelf: "center" }} onPress={onGoogleSignIn}>
          Login with Google
        </FontAwesome.Button>

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
    marginTop: 20,
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
    marginBottom: 10
  },
  errorMessage: {
    marginBottom: 10,
    height: 20,
    opacity: 0,
    color: "red",
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
