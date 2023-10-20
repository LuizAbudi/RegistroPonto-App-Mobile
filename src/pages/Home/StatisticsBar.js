import { Animated, Easing, StyleSheet, Text, View } from "react-native";
// import { RegistrosFuncionario } from "../../utils/registros";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { RegisterDailyContext } from "../../contexts/registersDaily";
import { RegistersTestsContext } from "../../contexts/RegistrosTests";

export function StatisticsBar() {
  const { horaEntrada, horaSaida } = useContext(RegisterDailyContext);
  const { registros, setRegistros } = useContext(RegistersTestsContext);
  const [mesAtual, setMesAtual] = useState({ nome: null, numero: null });

  //console.log(registros);

  const isFocused = useIsFocused();

  function formatarHora(hEntrada, hSaida) {
    let horaEntrada = hEntrada.split(":");
    let horaSaida = hSaida.split(":");
    let hora = horaSaida[0] - horaEntrada[0];
    let minuto = horaSaida[1] - horaEntrada[1];
    let segundo = horaSaida[2] - horaEntrada[2];
    if (segundo < 0) {
      segundo += 60;
      minuto--;
    }
    if (minuto < 0) {
      minuto += 60;
      hora--;
    }
    if (hora < 0) {
      hora += 24;
    }

    const totalHoras = hora + minuto / 60 + segundo / 3600;

    return totalHoras;
  }

  const getMesAtual = () => {
    const data = new Date();
    const mesNome = data.toLocaleDateString("pt-BR", { month: "long" });
    const mesNumber = data.getMonth() + 1;
    setMesAtual({ nome: mesNome, numero: mesNumber });
  };

  const registrosDoMesAtual = registros.filter((registro) => {
    if (!registro.data || typeof registro.data !== "string") return false;
    let [dia, mes, ano] = registro.data.split("/").map(Number);
    return mes === mesAtual.numero;
  });

  const totalDiasTrabalhados = () => {
    return registrosDoMesAtual.length;
  };

  const totalHorasTrabalhadas = () => {
    let totalHoras = 0;
    registrosDoMesAtual.forEach((registro) => {
      totalHoras += formatarHora(registro.horaEntrada, registro.horaSaida);
    });

    return totalHoras;
  };

  const progressoHoras = (totalHorasTrabalhadas() / 240) * 100;
  const progressoDias = (totalDiasTrabalhados() / 30) * 100;

  //###################################################
  //Animação barra de progresso
  //###################################################

  const progressBarHoras = useRef(new Animated.Value(0)).current;
  const progressBarDias = useRef(new Animated.Value(0)).current;

  function startProgressBarAnimation() {
    Animated.parallel([
      Animated.timing(progressBarHoras, {
        toValue: progressoHoras,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(progressBarDias, {
        toValue: progressoDias,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  }

  const diaAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    if (isFocused) {
      getMesAtual();
      progressBarHoras.setValue(0);
      progressBarDias.setValue(0);
      startProgressBarAnimation();
    }
  }, [isFocused]);

  const registroEntradaSaida = () => {
    if (horaEntrada && horaSaida) {
      return (
        <View style={styles.HoraTrabalhadaDoDia}>
          <Text style={styles.textItemEntrada}>
            {`Entrada: ${horaEntrada}`}
          </Text>
          <Text style={styles.textItemSaida}>{`Saida:${horaSaida}`}</Text>
        </View>
      );
    } else if (horaEntrada) {
      return (
        <View style={styles.HoraTrabalhadaDoDia}>
          <Text
            style={styles.textItemEntrada}
          >{`Entrada: ${horaEntrada} - Saida: Não registrado`}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.HoraTrabalhadaDoDia}>
          <Text
            style={styles.textItemEntradaSaida}
          >{`Entrada: Não registrada - Saida: Não registrada`}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headeRegistros}>
        {`Estatísticas do dia - ${diaAtual}`}
      </Text>
      <View style={styles.Teste}>{registroEntradaSaida()}</View>

      <Text style={styles.headeRegistros}>
        {`Estatísticas do mês - ${mesAtual.nome}`}
      </Text>
      <View style={styles.Registros}>
        <Animated.View
          style={[
            styles.barraDeFundo,
            {
              width: progressBarDias.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        >
          <LinearGradient
            colors={["#44D6F1", "#0DA6C2", "#1341CE"]}
            start={[0, 0]}
            end={[1, 0]}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
        <Text style={styles.textItem}>
          Total de dias Trabalhados: {totalDiasTrabalhados()} dias
        </Text>
      </View>
      <View style={styles.Registros}>
        <Animated.View
          style={[
            styles.barraDeFundo,
            {
              width: progressBarDias.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        >
          <LinearGradient
            colors={["#44D6F1", "#0DA6C2", "#1341CE"]}
            start={[0, 0]}
            end={[1, 0]}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
        <Text style={styles.textItem}>
          Total de horas Trabalhadas: {totalHorasTrabalhadas().toFixed(2)} horas
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#262450",
    flex: 1,
  },
  Teste: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    height: 50,
    textAlign: "center",
    marginHorizontal: 20,
  },
  Registros: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#19173D",
    borderRadius: 50,
    marginHorizontal: 20,
    height: 80,
    overflow: "hidden",
    justifyContent: "space-between",
    shadowColor: "#00D7FF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
  },
  HoraTrabalhadaDoDia: {
    flexDirection: "row",
    margin: 15,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    height: 50,
    textAlign: "center",
  },
  textItemEntrada: {
    color: "#0DA6C2",
    fontSize: 17,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
  textItemSaida: {
    color: "#0DA6C2",
    fontSize: 17,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
  textItemEntradaSaida: {
    color: "#0DA6C2",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
  },
  barraDeFundo: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "center",
    position: "absolute",
    shadowColor: "#00D7FF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  textItem: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    fontWeight: "bold",
  },
  headeRegistros: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
    textAlign: "center",
  },
});
