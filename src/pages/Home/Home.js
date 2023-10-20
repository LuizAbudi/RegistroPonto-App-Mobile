import {
  Animated,
  Button,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { useContext } from "react";

import { AuthContext } from "../../contexts/auth";
import { StatisticsBar } from "./StatisticsBar";
import { UserHeader } from "./UserHeader";

export function Home() {
  const { user, signOut } = useContext(AuthContext);

  function handleLogOut() {
    signOut();
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#19173D" }}
    >
      <UserHeader user={user} handleLogOut={handleLogOut} />

      <View style={styles.container}>
        <StatisticsBar />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#262450",
    flex: 1,
  },
});
