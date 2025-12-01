const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Endpoint SSE
app.get("/events", (req, res) => {
  // Headers obligatorios para SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Enviar un evento inicial
  res.write("data: " + JSON.stringify({ message: "Conexión establecida" }) + "\n\n");

  // Enviar un evento cada 3 segundos
  const interval = setInterval(() => {
    const payload = {
      time: new Date().toISOString(),
      value: Math.floor(Math.random() * 100)
    };

    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  }, 3000);

  // Limpiar cuando el cliente se desconecta
  req.on("close", () => {
    clearInterval(interval);
    console.log("Cliente SSE desconectado");
  });
});

app.listen(3000, () => console.log("SSE backend en http://localhost:3000"));
