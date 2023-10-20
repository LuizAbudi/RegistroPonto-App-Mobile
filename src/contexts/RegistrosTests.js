import React, { createContext, useState, useEffect, useCallback } from "react";

export const RegistersTestsContext = createContext({});

function RegistersTestsProvider({ children }) {
  const ANO_ATUAL = 2023;
  const MES_INICIAL = 8; // Agora 8 para Setembro
  const DIA_ATUAL = 20; // Supondo que a data atual é 20 de outubro
  const MES_ATUAL = 9; // Agora 9 para Outubro

  const [registros, setRegistros] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [mesAtual, setMesAtual] = useState({ nome: null, numero: null });

  function gerarHoraEntrada() {
    let hora = 8;
    let minuto = Math.floor(Math.random() * 31);
    let segundo = Math.floor(Math.random() * 60);
    return `${hora.toString().padStart(2, "0")}:${minuto
      .toString()
      .padStart(2, "0")}:${segundo.toString().padStart(2, "0")}`;
  }

  function gerarHoraSaida() {
    let hora = 17;
    let minuto = 30 + Math.floor(Math.random() * 31);
    let segundo = Math.floor(Math.random() * 60);
    return `${hora.toString().padStart(2, "0")}:${minuto
      .toString()
      .padStart(2, "0")}:${segundo.toString().padStart(2, "0")}`;
  }

  function criarRegistro(data) {
    return {
      nome: "Funcionario",
      data: data.toLocaleDateString("pt-BR"),
      horaEntrada: gerarHoraEntrada(),
      horaSaida: gerarHoraSaida(),
    };
  }

  function gerarRegistrosFuncionario() {
    let dataAtual = new Date(ANO_ATUAL, MES_INICIAL, 1);
    let tempRegistros = [];
    while (
      dataAtual.getMonth() < MES_ATUAL ||
      (dataAtual.getMonth() === MES_ATUAL &&
        dataAtual.getDate() <= DIA_ATUAL - 1)
    ) {
      if (dataAtual.getDay() !== 0 && dataAtual.getDay() !== 6) {
        tempRegistros.push(criarRegistro(dataAtual));
      }
      dataAtual.setDate(dataAtual.getDate() + 1);
    }
    return tempRegistros;
  }

  useEffect(() => {
    const initialRegisters = gerarRegistrosFuncionario();
    setRegistros(initialRegisters);
    getMesAtual();
  }, []);

  const mesesDisponiveis = registros.map((registro) => {
    let [dia, mes, ano] = registro.data.split("/").map(Number);
    return mes;
  });

  function calculateHours(hEntrada, hSaida) {
    // Criar objetos de data usando os horários fornecidos
    let dateEntrada = new Date(`2023-01-01T${hEntrada}Z`);
    let dateSaida = new Date(`2023-01-01T${hSaida}Z`);

    // Calcular a diferença em milissegundos
    let differenceInMillis = dateSaida - dateEntrada;

    // Se o horário de saída for menor do que o de entrada, presumimos que é do dia seguinte e ajustamos o dia de saída
    if (differenceInMillis < 0) {
      dateSaida.setDate(dateSaida.getDate() + 1);
      differenceInMillis = dateSaida - dateEntrada;
    }

    // Converter a diferença em horas
    const totalHoras = differenceInMillis / 3600000; // pois há 3600000 milissegundos em uma hora

    return totalHoras;
  }

  const registrosDoMesAtual = Array.isArray(registros)
    ? registros.filter((registro) => {
        if (!registro.data || typeof registro.data !== "string") return false;
        let [dia, mes, ano] = registro.data.split("/").map(Number);
        return mes === mesAtual.numero;
      })
    : [];

  const getMesAtual = () => {
    const data = new Date();
    const mesNome = data.toLocaleDateString("pt-BR", { month: "long" });
    const mesNumber = data.getMonth() + 1;
    setMesAtual({ nome: mesNome, numero: mesNumber });
  };

  useEffect(() => {
    const totalHorasTrabalhadas = () => {
      let totalHoras = 0;
      registrosDoMesAtual.forEach((registro) => {
        totalHoras += calculateHours(registro.horaEntrada, registro.horaSaida);
      });
      return totalHoras;
    };

    const totalDiasTrabalhados = () => {
      return registrosDoMesAtual.length;
    };

    setTotalHours(totalHorasTrabalhadas());
    setTotalDays(totalDiasTrabalhados());
  }, [registrosDoMesAtual]);

  const uniqueMonths = [...new Set(mesesDisponiveis)];

  useEffect(() => {
    console.log("Registros: ", registros);
  }, [registros]);

  return (
    <RegistersTestsContext.Provider
      value={{
        registros,
        setRegistros,
        uniqueMonths,
        totalHours,
        totalDays,
        getMesAtual,
        mesAtual,
      }}
    >
      {children}
    </RegistersTestsContext.Provider>
  );
}

export default RegistersTestsProvider;
