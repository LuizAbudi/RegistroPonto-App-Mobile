const RegistrosFuncionario = () => {
  const ANO_ATUAL = 2023;
  const MES_INICIAL = 8; // Agora 8 para Setembro
  const DIA_ATUAL = 20; // Supondo que a data atual é 20 de outubro
  const MES_ATUAL = 9; // Agora 9 para Outubro

  function gerarHoraEntrada() {
    let hora = 8;
    let minuto = Math.floor(Math.random() * 31);
    let segundo = Math.floor(Math.random() * 60); // Gerando segundos aleatórios
    return `${hora.toString().padStart(2, "0")}:${minuto
      .toString()
      .padStart(2, "0")}:${segundo.toString().padStart(2, "0")}`;
  }

  function gerarHoraSaida() {
    let hora = 17;
    let minuto = 30 + Math.floor(Math.random() * 31);
    let segundo = Math.floor(Math.random() * 60); // Gerando segundos aleatórios
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
    let registros = [];
    let dataAtual = new Date(ANO_ATUAL, MES_INICIAL, 1);

    while (
      dataAtual.getMonth() < MES_ATUAL ||
      (dataAtual.getMonth() === MES_ATUAL &&
        dataAtual.getDate() <= DIA_ATUAL - 1)
    ) {
      if (dataAtual.getDay() !== 0 && dataAtual.getDay() !== 6) {
        // excluindo finais de semana
        registros.push(criarRegistro(dataAtual));
      }
      dataAtual.setDate(dataAtual.getDate() + 1);
    }

    return registros;
  }

  return gerarRegistrosFuncionario();
};
