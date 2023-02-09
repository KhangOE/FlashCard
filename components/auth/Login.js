import { View, Button, TextInput } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSignIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const onGoogleSignIn = async () => {
    signInWithPopup(auth, provider).then(result => {
      const user = result.user;
      console.log(user)
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
      });
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    })
  }

  return (
    <View>
      <TextInput
        placeholder="email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Sign In" onPress={onSignIn} />
      <Button title="Google Sign In" onPress={onGoogleSignIn} />
    </View>
  );
}
