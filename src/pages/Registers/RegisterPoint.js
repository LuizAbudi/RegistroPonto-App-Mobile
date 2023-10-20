import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import MenuThreeDots from "../../components/MenuThreeDots";
import { AuthContext } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { RegisterDailyContext } from "../../contexts/registersDaily";

export function RegisterPoint() {
  const date = new Date().toLocaleDateString("pt-BR");

  const {
    registraPonto,
    currentTime,
    horaEntrada,
    horaSaida,
    setHoraEntrada,
    setHoraSaida,
  } = useContext(RegisterDailyContext);

  function onClickButtonRegister() {
    registraPonto();
  }

  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const options = [
    {
      label: "Alterar marcação de ponto",
      onPress: () => {
        navigation.navigate("AlterarHora");
      },
    },
    {
      label: "Sair",
      onPress: () => {
        signOut();
      },
    },
  ];

  const goBackHome = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      <View style={styles.header}>
        <Entypo
          name="chevron-left"
          size={24}
          color="#fff"
          onPress={goBackHome}
        />
        <Text style={styles.headerText}>Registro de Ponto</Text>
        <MenuThreeDots options={options} />
      </View>
      <View style={styles.container}>
        <Text style={styles.Hora}>{currentTime}</Text>
        <Text style={styles.Data}>{date}</Text>
        <View style={styles.Registrar}>
          <Pressable style={styles.button} onPress={onClickButtonRegister}>
            <Text style={styles.text}>Registrar Ponto</Text>
          </Pressable>
        </View>
        <View style={styles.Registros}>
          <Text style={styles.registroItem}>
            Dia: {date}
            <Text style={styles.registroSubItem}>
              {"\n"}
              Entrada: {horaEntrada}
              {"\n"}
              Saída: {horaSaida}
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 30,
    backgroundColor: "#19173D",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    zIndex: 1,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    backgroundColor: "#262450",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Registrar: {
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
    backgroundColor: "#262450",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  Hora: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  Data: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  Registros: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#19173D",
    borderRadius: 30,
    marginHorizontal: 20,
    height: 80,

    width: 300,
  },
  registroItem: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
  },
  registroSubItem: {
    color: "#7B78AA",
    fontSize: 15,
    marginLeft: 10,
  },
});
