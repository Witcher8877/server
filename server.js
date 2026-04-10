const express = require("express");
const fs = require("fs");
const sharp = require("sharp");

const app = express();

app.get("/track/:id", async (req, res) => {
  const id = req.params.id;
  const agora = new Date().toLocaleString("pt-BR");
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  fs.appendFileSync("aberturas.txt", `${id} | ${agora} | ${ip}\n`);

  // SVG com o texto do horário
  const svg = `
    <svg width="300" height="36" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="36" fill="#25a244"/>
      <text x="150" y="23" 
            font-family="Arial" 
            font-size="14" 
            font-weight="bold"
            fill="white" 
            text-anchor="middle">
        ✓ Leitura confirmada - ${agora}
      </text>
    </svg>
  `;

  const imagem = await sharp(Buffer.from(svg)).png().toBuffer();

  res.set("Content-Type", "image/png");
  res.set("Cache-Control", "no-store");
  res.send(imagem);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));