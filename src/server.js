"use strict";
module.exports = () => {
  const express = require("express");
  const http = require("http");
  const path = require("path");
  const socketIo = require("socket.io");
  const siofu = require("socketio-file-upload");

  const handlebars = require("express-handlebars");
  const favicon = require("serve-favicon");
  // const cookieParser = require('cookie-parser');

  // Configurações do express / http / socket
  const app = express().use(siofu.router);
  const server = http.createServer(app);
  const io = new socketIo.Server(server);


  // Arquivos de config
  const config = require("./config/server.config");
  const middleware = require("./lib/middleware.lib");

  const hbs = handlebars.create({
    partialsDir: path.join(__dirname, "./templates", "/partials"),
    layoutsDir: path.join(__dirname, "./templates", "/layouts"),
    defaultLayout: "main",
  });
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");
  app.set("trust proxy", 1);
  app.set("views", __dirname + "/templates");


  // Caminho para o favicon
  app.use(favicon(path.join(__dirname, "./public/images", "chat.png")));
  // app.use(cookieParser());
  // app.use(config.session);

  // Logamos todas as requisições para o servidor
  app.use(middleware.timeLog);

  // Na página "/", renderizamos a página "index"
  app.get("/", (req, res) => {
    res.render("index");
  });

  // Roteamos as requisições para /public para a pasta ./public
  app.use("/public", express.static(path.join(__dirname, "./public")));

  // Função pra "formatar" os logs do websocket, usamos webSocket.log() ao invés de console.log()
  const webSocket = {
    log: (d) => {
      console.log(`[WEBSOCKET] ${new Date().toLocaleString()} - ${d}`);
    },
  };

  // Quando há uma nova conexão
  io.on("connection", (socket) => {
    webSocket.log("Nova conexão!");
    const uploader = new siofu();
    uploader.dir = path.join(__dirname, "./uploads");
    uploader.listen(socket);

    uploader.on("saved", (e) => {
      webSocket.log("UPLOAD DE ARQUIVO!")
    })

  });

  server.listen(config.port, () => {
    console.log(`[SERVER] Servidor ouvindo na porta ${config.port}`);
  });
};
