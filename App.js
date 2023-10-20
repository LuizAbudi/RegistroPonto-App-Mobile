import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import AuthProvider from "./src/contexts/auth";
import RegisterDailyProvider from "./src/contexts/registersDaily";
import RegistersTestsProvider from "./src/contexts/RegistrosTests";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RegistersTestsProvider>
          <RegisterDailyProvider>
            <Routes />
          </RegisterDailyProvider>
        </RegistersTestsProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
