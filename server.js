const express = require("express");
const fs = require("fs");
const { createCanvas } = require("canvas");

const app = express();

app.get("/track/:id", (req, res) => {
  const id = req.params.id;
  const agora = new Date().toLocaleString("pt-BR");
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Salva a abertura
  fs.appendFileSync("aberturas.txt", `${id} | ${agora} | ${ip}\n`);

  // Gera imagem com o horário
  const canvas = createCanvas(300, 36);
  const ctx = canvas.getContext("2d");

  // Fundo verde
  ctx.fillStyle = "#25a244";
  ctx.fillRect(0, 0, 300, 36);

  // Texto branco
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 15px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`✓ Leitura confirmada - ${agora}`, 150, 18);

  // Retorna como imagem PNG
  res.set("Content-Type", "image/png");
  res.set("Cache-Control", "no-store");
  canvas.createPNGStream().pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));