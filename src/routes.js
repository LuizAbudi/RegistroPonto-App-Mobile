import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./pages/Home/Home";
import { RegisterPoint } from "./pages/Registers/RegisterPoint";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Profile } from "./pages/Profile/Profile";
import LoginPage from "./pages/Login/LoginPage";
import { createStackNavigator } from "@react-navigation/stack";
import AlterarHora from "./pages/Registers/AlterarHora";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
const size = 24;

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 85,
    backgroundColor: "#19173D",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 70,
    borderRadius: 40,
  },
  Focado: {
    position: "absolute",
    borderRadius: 30,
    padding: 11,
    shadowColor: "#00D7FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  HeaderStyle: {
    backgroundColor: "#19173D",
    height: 100,
  },
  HeaderTitleStyle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const TabBarItems = [
  {
    name: "Home",
    icon: <Entypo name="home" color="#7B78AA" size={size} opacity={0.5} />,
    iconFocused: (
      <Entypo name="home" color="#00D7FF" size={size} style={styles.Focado} />
    ),
    component: Home,
  },
  {
    name: "Pontos",
    icon: <Entypo name="clock" size={size} color="#7B78AA" opacity={0.5} />,
    iconFocused: (
      <Entypo name="clock" size={size} color="#00D7FF" style={styles.Focado} />
    ),
    component: RegisterPoint,
  },
  {
    name: "Profile",
    icon: <Entypo name="user" color="#7B78AA" size={size} opacity={0.5} />,
    iconFocused: (
      <Entypo name="user" color="#00D7FF" size={size} style={styles.Focado} />
    ),
    component: Profile,
  },
  {
    name: "Statistics",
    icon: <Entypo name="bar-graph" size={size} color="#7B78AA" opacity={0.5} />,
    iconFocused: (
      <Entypo
        name="bar-graph"
        size={size}
        color="#00D7FF"
        style={styles.Focado}
      />
    ),
    component: Home,
  },
];

export function Routes() {
  const Logado = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarContainer,
          headerStyle: styles.HeaderStyle,
          headerTitleStyle: styles.HeaderTitleStyle,
        }}
      >
        {TabBarItems.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.tabBarIconContainer}>
                  {focused ? item.iconFocused : item.icon}
                </View>
              ),
              tabBarLabel: () => null,
            }}
          />
        ))}
      </Tab.Navigator>
    );
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Logado" component={Logado} />
      <Stack.Screen name="AlterarHora" component={AlterarHora} />
    </Stack.Navigator>
  );
}
