"use strict";
const socket = io();

const button = document.getElementById("button");
const input = document.getElementById("input");
const form = document.getElementById("form");
const resultado = document.getElementById("resultado");
const erro = document.getElementById("erro");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  erro.style.display = 'none';
  const file = input.files[0];
  if(file) {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (e) => {
      socket.emit('fileUpload', {data: e.target.result})
    }
    reader.onerror = (e) => {
      erro.style.display = 'flex';
      socket.emit('fileUpload', {data: 'falhou'})
    }
  }
})

socket.on('resultado', (data) => {
  const valor = data.data;
  resultado.textContent = `Seu resultado foi de ${valor} acertos!`
  resultado.style.display = "flex"
  console.log(`Resultado: ${resultado}`)
})

socket.on('erro', (data) => {
  erro.style.display = 'flex';
})
