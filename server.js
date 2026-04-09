const express = require("express");
const fs = require("fs");

const app = express();

app.get("/ver", (req, res) => {
  const id = req.query.id || "sem_id";

  const agora = new Date().toLocaleString("pt-BR");

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  fs.appendFileSync("aberturas.txt", `${id} | ${agora} | ${ip}\n`);

  res.send(`
    <html>
      <body style="font-family: Arial; text-align:center; margin-top:50px;">
        <h2>DOCUMENTO VISUALIZADO</h2>
        <p><strong>Status:</strong> Confirmado</p>
        <p><strong>Data e hora:</strong> ${agora}</p>
      </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
