import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const SelectDropDown = ({ options }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const getMaxWidth = () => {
    if (!options || options.length === 0) return 150; // largura padrão

    const padding = 20;
    const textWidths = options.map((option) => {
      // Verifique se a opção possui um rótulo e que é uma string antes de acessar sua propriedade length
      return option && typeof option.label === "string"
        ? option.label.length * 10 + padding
        : 0;
    });

    const maxComputedWidth = Math.max(...textWidths);

    // Evitar -Infinity ou valores muito pequenos
    return isFinite(maxComputedWidth) && maxComputedWidth > 50
      ? maxComputedWidth
      : 150;
  };

  const dropdownWidth = getMaxWidth();

  return (
    <View style={styles.container}>
      {showMenu && (
        <TouchableOpacity
          style={{
            position: "absolute",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            zIndex: 1,
          }}
          onPress={handleToggleMenu}
        />
      )}
      <TouchableOpacity onPress={handleToggleMenu} style={styles.header}>
        <Text style={styles.selectText}>Selecione o Mês</Text>
        <Entypo name="chevron-down" size={24} color="#fff" />
      </TouchableOpacity>
      {showMenu && (
        <View style={{ ...styles.dropdown, width: dropdownWidth }}>
          {options.map((option, index) => (
            <TouchableOpacity
              style={styles.option}
              key={index}
              onPress={() => {
                handleToggleMenu();
                if (option.onSelect) {
                  option.onSelect(option);
                }
              }}
            >
              <Text style={styles.TextDrop}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#19173D",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dropdown: {
    position: "absolute",
    top: 30,
    right: 0,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    zIndex: 1,
  },
  option: {
    padding: 10,
  },
  TextDrop: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    position: "relative",
  },
});

export default SelectDropDown;
