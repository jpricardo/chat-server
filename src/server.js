"use strict";
module.exports = () => {
  const express = require("express");
  const http = require("http");
  const path = require("path");
  const socketIo = require("socket.io");

  // Configurações do express / http / socket
  const app = express();
  const server = http.createServer(app);
  const io = new socketIo.Server(server);

  const PORT = 3000;

  // Logamos todas as requisições para o servidor
  app.use((req, res, next) => {
    const data = new Date();
    console.log(`[SERVER] ${data.toLocaleString()} ${req.ip} - ${req.method} ${req.url} ${res.statusCode}`);
    next();
  });

  // Na página "/", renderizamos a página "index"
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/index.html"));
  });

  // Roteamos as requisições a /public para a pasta ./public
  app.use("/public", express.static(path.join(__dirname, "./public")));

  const parseTxt = (data) => {
    // Divide o arquivo em linhas
    const lines = data.split("\n")
    // Lista contendo objetos => { pergunta: X, respostas: [...] }
    const arr = lines
    .map((lin) => {
      // Some com os caracteres \r, caso existam
      const d = lin.replace("\r", "").split('-');
      // Caso a linha não siga o padrão, retorna
      if (!d[1]) {
        return
      }
      // Respostas
      const r = d[1].split(";");
      // Pergunta
      const p = d[0];
      return { pergunta: p, respostas: r }
    })
    .filter((val) => val); // Exclui os valores indefinidos
    return arr
  }

  // Função que utilizamos pra corrigir a prova
  const corrigirProva = (prova, gabarito) => {
    let acertos = 0;
    // Pra cada pergunta no gabarito, chamamos de atualGabarito
    gabarito.forEach((atualGabarito) => {
      // Procuramos na prova a pergunta que estamos olhando no gabarito
      const atualProva = prova.find((quest) => quest.pergunta === atualGabarito.pergunta);
      // Pegamos as respostas
      const respGabarito = atualGabarito.respostas
      const respProva = atualProva.respostas
      // Pra cada resposta no gabarito, comparamos com a sua correspondente na prova
      respGabarito.forEach((resposta, ind) => {
        if (resposta === respProva[ind]) {
          acertos++
        }
      });
    })
    console.log(`Correção realizada! Acertos: ${acertos}`)
    return acertos
  }

  // Quando há uma nova conexão
  io.on("connection", (socket) => {

    console.log("Nova conexão ao Socket!");

    socket.on('fileUpload', (data) => {

      console.log('Arquivo recebido!');
      const fs = require("fs");
      const prova = parseTxt(data.data);

      try {
        const data = fs.readFileSync(path.join(__dirname, "./gabarito.txt"), "utf-8");
        const gabarito = parseTxt(data);
        socket.emit('resultado',{ data: corrigirProva(prova, gabarito) });
      } catch (err) {
        socket.emit('erro', {data: 'erro'})
        console.error(err);
      }
    })
  });

  server.listen(PORT, () => {
    console.log(`[SERVER] Servidor ouvindo na porta ${PORT}`);
  });
};
