import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../contexts/auth";

export function Profile() {
  const [edit, setEdit] = useState(false);
  const [inputBackgroundColor, setInputBackgroundColor] = useState("#262450"); // Estado para a cor de fundo
  const [inputColorText, setInputColorText] = useState("#fff"); // Estado para a cor do texto
  const [showPassword, setShowPassword] = useState(true); // Estado para mostrar/esconder a senha

  const [dados, setDados] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleEditPress = () => {
    setEdit(true);
    setInputBackgroundColor("#fff"); // Muda a cor de fundo para branco ao editar
    setInputColorText("#000"); // Muda a cor do texto para preto ao editar
  };

  function validaSenha(senha) {
    return senha.length >= 8;
  }

  function validatePasswords() {
    if (dados.password !== dados.confirmPassword) {
      alert("As senhas não correspondem.");
      return false;
    }

    if (!validaSenha(dados.password)) {
      alert("A senha deve conter no mínimo 8 caracteres.");
      return false;
    }

    return true;
  }

  const handleConfirm = () => {
    if (validatePasswords()) {
      setEdit(false);
      setInputBackgroundColor("#262450");
      setInputColorText("#fff");
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setInputBackgroundColor("#262450");
    setInputColorText("#fff");
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { user } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#19173D" }}
      >
        <View style={styles.User}>
          <View style={styles.userImage}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ height: 90, width: 90, borderRadius: 50 }}
              />
            )}
          </View>
          <Text style={styles.userName}>{user.nome}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.buttonEdit}>
            <Entypo
              name="edit"
              size={24}
              color="#fff"
              onPress={handleEditPress}
            />
          </View>
          {edit && (
            <View style={{ padding: 10 }}>
              <Pressable
                onPress={pickImage}
                color="#00D7FF"
                style={styles.EditarImageButton}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}
                >
                  Editar imagem
                </Text>
              </Pressable>
            </View>
          )}

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBackgroundColor,
                color: inputColorText,
              },
            ]}
            placeholder="Nome"
            editable={edit}
            onChangeText={(text) => setDados({ ...dados, name: text })}
            value={dados.name}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBackgroundColor,
                color: inputColorText,
              },
            ]}
            placeholder="Email"
            editable={edit}
            onChangeText={(text) => setDados({ ...dados, email: text })}
            value={dados.email}
          />
          <View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBackgroundColor,
                  color: inputColorText,
                },
              ]}
              placeholder="Senha"
              editable={edit}
              onChangeText={(text) => setDados({ ...dados, password: text })}
              value={dados.password}
              passwordRules={{
                minLength: 8,
                message: "A senha deve conter no mínimo 8 caracteres",
              }}
              secureTextEntry={showPassword}
            />
            <Entypo
              name="eye"
              size={24}
              color="#fff"
              style={{ position: "absolute", right: 25, top: 20 }}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
          {edit && (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: inputBackgroundColor,
                  color: inputColorText,
                  marginBottom: 0,
                },
              ]}
              placeholder="Confirmar Senha"
              editable={edit}
              onChangeText={(text) =>
                setDados({ ...dados, confirmPassword: text })
              }
              value={dados.confirmPassword}
              passwordRules={validatePasswords}
              secureTextEntry={showPassword}
            />
          )}

          {edit && (
            <View
              style={{
                padding: 10,
                margin: 5,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Pressable
                onPress={handleConfirm}
                color="#00D7FF"
                style={styles.ConfirmarECancelarButton}
              >
                <Text style={{ color: "#fff" }}>Confirmar</Text>
              </Pressable>
              <Pressable
                onPress={handleCancel}
                color="#262450"
                style={styles.ConfirmarECancelarButton}
              >
                <Text style={{ color: "#fff" }}>Cancelar</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  User: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100,
    justifyContent: "center",
  },
  userImage: {
    height: 90,
    width: 90,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  userEmail: {
    marginTop: 10,
    color: "#7B78AA",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 50,
    width: 50,
    position: "absolute",
    right: 20,
    top: 20,
  },
  inputs: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#262450",
    borderRadius: 30,
    marginBottom: 20,
    height: 60,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonEdit: {
    marginBottom: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  ConfirmarECancelarButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#262450",
  },
  EditarImageButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 1,
    backgroundColor: "#00D7FF",
  },
});
