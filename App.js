import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import AuthProvider from "./src/contexts/auth";
import RegisterDailyProvider from "./src/contexts/registersDaily";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RegisterDailyProvider>
          <Routes />
        </RegisterDailyProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
