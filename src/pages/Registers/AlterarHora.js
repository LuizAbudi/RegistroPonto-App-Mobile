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
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropDown from "../../components/SelectDropDown";

import { RegistersTestsContext } from "../../contexts/RegistrosTests";

const AlterarHora = () => {
  const { registros, setRegistros, uniqueMonths } = useContext(
    RegistersTestsContext
  );

  //console.log(registros);

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const [modalTimeVisible, setModalVisible] = useState(false);
  const [selectedRegistro, setSelectedRegistro] = useState(null);

  const showRegistroModal = (registro, index) => {
    setSelectedRegistro(registro);
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const [editingField, setEditingField] = useState(null);
  const [dateEdited, setDateEdited] = useState(new Date());
  const [timeMode, setTimeMode] = useState("time");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateEdited;
    setShowPicker(false);
    setDateEdited(currentDate);

    let tempTime = new Date(currentDate);
    let fTime = tempTime.toLocaleTimeString("pt-br");

    if (editingField === "horaEntrada") {
      setSelectedRegistro({ ...selectedRegistro, horaEntrada: fTime });
    } else {
      setSelectedRegistro({ ...selectedRegistro, horaSaida: fTime });
    }
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setTimeMode(currentMode);
  };

  // console.log(`registros antigos: ${}`);

  const saveChanges = () => {
    if (selectedRegistro && selectedIndex !== null) {
      let updateRegistros = [...registros];

      // Remove o registro antigo
      updateRegistros.splice(selectedIndex, 1);

      // Encontre a posição correta para o novo registro
      let insertIndex = updateRegistros.findIndex((r) => {
        let [dia1, mes1, ano1] = r.data.split("/").map(Number);
        let [dia2, mes2, ano2] = selectedRegistro.data.split("/").map(Number);
        return new Date(ano1, mes1 - 1, dia1) > new Date(ano2, mes2 - 1, dia2);
      });

      // Verifique se já existe um registro com a mesma data
      let existingIndex = updateRegistros.findIndex(
        (r) => r.data === selectedRegistro.data
      );

      if (existingIndex !== -1) {
        updateRegistros[existingIndex] = selectedRegistro;
      } else {
        if (insertIndex === -1) {
          insertIndex = updateRegistros.length;
        }
        // Insira o novo registro na posição correta
        updateRegistros.splice(insertIndex, 0, selectedRegistro);
      }

      setRegistros(updateRegistros);

      setSelectedIndex(null);
      setSelectedRegistro(null);
      setModalVisible(false);

      console.log(updateRegistros);
    }
  };

  const [mesSelecionado, setMesSelecionado] = useState(null);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const uniqueMonthsOptions = uniqueMonths.map((month) => ({
    label: monthNames[month - 1],
    value: month,
  }));

  const handleMonthSelect = (selectedMonth) => {
    setMesSelecionado(selectedMonth.value);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#19173D",
          flexWrap: "wrap",
        }}
      >
        <View style={styles.header}>
          <Pressable onPress={handleBack}>
            <Entypo name="chevron-left" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerText}>Alterar marcação de ponto</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.containerHeader}>
          <View style={styles.select}>
            <Pressable style={styles.selectButton} onPress={uniqueMonths}>
              <SelectDropDown
                options={uniqueMonthsOptions.map((month) => ({
                  ...month,
                  onSelect: handleMonthSelect,
                }))}
              />
            </Pressable>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalTimeVisible}
          onRequestClose={() => {
            setModalVisible(!modalTimeVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Alterar Horário</Text>
              <TouchableOpacity
                style={styles.inputTouchable}
                onPress={() => {
                  showMode("time");
                  setEditingField("horaEntrada");
                }}
              >
                <Text style={styles.inputText}>
                  {selectedRegistro?.horaEntrada ||
                    "Toque para definir a entrada"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inputTouchable}
                onPress={() => {
                  showMode("time");
                  setEditingField("horaSaida");
                }}
              >
                <Text style={styles.inputText}>
                  {selectedRegistro?.horaSaida || "Toque para definir a saída"}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  padding: 10,
                  margin: 7,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Pressable
                  onPress={() =>
                    saveChanges(registros.horaEntrada, registros.horaSaida)
                  }
                  style={styles.modalButton}
                >
                  <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                    Alterar
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={styles.modalButton}
                >
                  <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                    Cancelar
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateEdited}
              mode={timeMode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </Modal>

        <View style={styles.container}>
          {registros
            .filter((registro) => {
              if (!mesSelecionado) return false;
              let [dia, mes, ano] = registro.data.split("/").map(Number);
              return mes === mesSelecionado;
            })
            .map((registro, index) => {
              return (
                <Pressable
                  style={styles.registro}
                  key={index}
                  onPress={() => showRegistroModal(registro, index)}
                >
                  <Text
                    style={[
                      styles.registroText,
                      { fontWeight: "bold", fontSize: 14 },
                    ]}
                  >
                    Dia:{"\n"}
                    {registro.data}
                  </Text>
                  <Text style={styles.registroText}>
                    Entrada:{"\n"}
                    <Text style={{ color: "red" }}>
                      {registro.horaEntrada}
                      {"\n"}
                      <Text style={styles.registroText}>
                        Saida:{"\n"}
                        <Text
                          style={{
                            color: "red",
                          }}
                        >
                          {registro.horaSaida}
                        </Text>
                      </Text>
                    </Text>
                  </Text>
                </Pressable>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#262450",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  header: {
    paddingVertical: 30,
    backgroundColor: "#19173D",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  containerHeader: {
    backgroundColor: "#262450",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    position: "fixed",
    zIndex: 1,
  },
  registro: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    height: 80,
    justifyContent: "center",
    width: 160,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "stretch",
    flexWrap: "wrap",
  },
  registroText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  select: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 1,
    backgroundColor: "#19173D",
    margin: 10,
  },
  selectButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  selectText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    position: "relative",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#19173D",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: 200,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: "#fff",
  },
  inputText: {
    color: "#fff",
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#262450",
  },
  inputTouchable: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: 200,
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AlterarHora;
