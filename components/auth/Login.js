import { View, Button, TextInput, TouchableOpacity, Text, StyleSheet, Image, Platform } from "react-native";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Google from "expo-auth-session/providers/google"

//ios: 980173626462-1kg3bj0ff4ii35sfdbi0n7vqsjlevuqc.apps.googleusercontent.com
//android: 980173626462-2p1u32ugvp4cdk9g8adr0cqdbtde1u2t.apps.googleusercontent.com
//web: 980173626462-mtq2np79s57a5l553tbecuqfr2m90n9h.apps.googleusercontent.com

const db = getFirestore();

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [user, setUser] = useState()
  const [accessToken, setAccessToken] = useState()
  const [idToken, setIdToken] = useState()

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: "980173626462-2p1u32ugvp4cdk9g8adr0cqdbtde1u2t.apps.googleusercontent.com",
    iosClientId: "980173626462-1kg3bj0ff4ii35sfdbi0n7vqsjlevuqc.apps.googleusercontent.com",
    expoClientId: "980173626462-mtq2np79s57a5l553tbecuqfr2m90n9h.apps.googleusercontent.com",
    webClientId: "980173626462-036mfnvst586no07f55h4gihsmlu2p97.apps.googleusercontent.com"
  })

  useEffect(() => {
    if (response?.type === "success") {
      setIdToken(response.params.id_token)
      idToken && getUserDataWithIDToken();
    }
  }, [response, idToken])


  const getUserDataWithIDToken = async () => {
    const credential = GoogleAuthProvider.credential(idToken);
    signInWithCredential(auth, credential).then(result => {
      const user = result.user;
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        image: user.photoURL
      });
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The credential that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  };

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
        <FontAwesome.Button name="google" backgroundColor="#4285F4" style={{ fontFamily: "Roboto", alignSelf: "center" }} onPress={Platform.OS === 'web' ? onGoogleSignIn : () => promptAsync({ useProxy: true, showInRecents: true })}>
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
    fontWeight: '600',
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
    fontWeight: '500',
    fontSize: 24,
    color: "#FAFAFA"
  }
})
