import {
  Animated,
  Easing,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

import { useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

export function UserHeader({ user, handleLogOut }) {
  const isFocused = useIsFocused();

  const rotateYValue = useRef(new Animated.Value(0)).current;

  const rotateY = rotateYValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  function startRotateAnimation() {
    Animated.timing(rotateYValue, {
      toValue: 5,
      duration: 2000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }

  const userImageTranslateX = useRef(new Animated.Value(-100)).current;
  const userNameTranslateX = useRef(new Animated.Value(100)).current;

  function startUserNameAndImageAnimation() {
    Animated.parallel([
      Animated.timing(userImageTranslateX, {
        toValue: 0,
        duration: 3000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(userNameTranslateX, {
        toValue: 0,
        duration: 3000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }

  useEffect(() => {
    if (isFocused) {
      rotateYValue.setValue(0);
      userImageTranslateX.setValue(-100);
      userNameTranslateX.setValue(100);
      startRotateAnimation();
      startUserNameAndImageAnimation();
    }
  }, [isFocused]);

  return (
    <View style={styles.header}>
      <View style={styles.User}>
        <Animated.View
          style={[
            styles.userImage,
            { transform: [{ translateX: userImageTranslateX }] },
          ]}
        />
        <Animated.Text
          style={[
            styles.userName,
            { transform: [{ translateX: userNameTranslateX }] },
          ]}
        >
          Bem-vindo!{"\n"}
          {user.nome}
        </Animated.Text>
        <TouchableOpacity style={styles.logOut} onPress={handleLogOut}>
          <Entypo name="log-out" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Animated.Image
        style={{
          ...styles.logo,
          transform: [{ rotateY }],
        }}
        source={require("../../assets/Logo-branco.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 30,
    backgroundColor: "#19173D",
    width: "100%",
  },
  logo: {
    alignSelf: "center",
    height: 225,
    marginTop: 20,
    resizeMode: "contain",
    width: 200,
  },
  User: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  userHeader: {},
  userImage: {
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logOut: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});
