"use strict";
const socket = io();

const button = document.getElementById("button");
const input = document.getElementById("input");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = input.files[0];
  if(file) {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (e) => {
      socket.emit('fileUpload', {data: e.target.result})
    }
    reader.onerror = (e) => {
      socket.emit('fileUpload', {data: 'falhou'})
    }
  }
})

socket.on('resultado', (data) => {
  const resultado = data.data;
  console.log(`Resultado: ${resultado}`)
})
