import { Text, View, Button, StyleSheet } from "react-native";
import Login from "./Login";

export default function Landing({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      {/* <Login></Login> */}
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
