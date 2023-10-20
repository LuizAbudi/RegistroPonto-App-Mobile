import React, { createContext, useState, useEffect } from "react";

export const RegisterDailyContext = createContext({});

function RegisterDailyProvider({ children }) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("pt-BR")
  );
  const [horaEntrada, setHoraEntrada] = useState("");
  const [horaSaida, setHoraSaida] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("pt-BR"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function registraPonto() {
    if (!horaEntrada) {
      setHoraEntrada(currentTime);
    } else if (!horaSaida) {
      setHoraSaida(currentTime);
    }
  }

  return (
    <RegisterDailyContext.Provider
      value={{
        registraPonto,
        currentTime,
        horaEntrada,
        horaSaida,
        setHoraEntrada,
        setHoraSaida,
      }}
    >
      {children}
    </RegisterDailyContext.Provider>
  );
}

export default RegisterDailyProvider;
