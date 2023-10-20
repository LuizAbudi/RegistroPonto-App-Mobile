import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("teste");
  const [password, setPassword] = useState("teste");

  const { signIn } = useContext(AuthContext);

  function handleLogin() {
    signIn(email, password);
    //setPassword("");
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Logo-branco.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.inputs}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Digite seu email"
      />

      <TextInput
        style={styles.inputs}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Digite sua senha"
      />

      <View style={styles.Logando}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#19173D" : "#262450",
            },
            styles.button,
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.text}>Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#19173D",
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    backgroundColor: "#fff",
    width: "90%",
    marginBottom: 15,
    color: "#222",
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  logo: {
    alignSelf: "center",
    height: 225,
    marginTop: 20,
    resizeMode: "contain",
    width: 200,
  },
  Logando: {
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#19173D",
    borderRadius: 30,
    marginHorizontal: 20,
    height: 80,
    justifyContent: "center",
    width: 300,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default LoginPage;
