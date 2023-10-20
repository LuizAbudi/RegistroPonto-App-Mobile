import React, { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  function signIn(email, password) {
    if (email !== "" && password !== "") {
      setUser({
        email: email,
        nome: "João da Silva",
        status: "Ativo",
      });

      navigation.navigate("Logado");
    }
  }

  function signOut() {
    setUser({
      email: "",
      nome: "",
      status: "Desativado",
    });
    navigation.navigate("Login");
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
