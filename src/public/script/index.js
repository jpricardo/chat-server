"use strict";
const socket = io();
const uploader = new SocketIOFileUpload(socket);

const button = document.getElementById("button");
const input = document.getElementById("input");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
})

uploader.listenOnSubmit(button, input)

console.log("xD")
