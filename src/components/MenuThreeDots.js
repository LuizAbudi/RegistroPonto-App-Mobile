import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const MenuThreeDots = ({ options }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const getMaxWidth = () => {
    const padding = 20; // 10 padding on each side
    const textWidths = options.map(
      (option) => option.label.length * 10 + padding
    ); // Estimativa simples
    return Math.max(...textWidths);
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
      <TouchableOpacity onPress={handleToggleMenu}>
        <Entypo name="dots-three-vertical" size={24} color="#fff" />
      </TouchableOpacity>
      {showMenu && (
        <View style={{ ...styles.dropdown, width: dropdownWidth }}>
          {options.map((option, index) => (
            <TouchableOpacity
              style={styles.option}
              key={index}
              onPress={option.onPress}
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
  dropdown: {
    position: "absolute",
    top: 30,
    right: 0,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    zIndex: 2,
  },
  option: {
    padding: 10,
  },
  TextDrop: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MenuThreeDots;
