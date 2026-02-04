const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const crypto = require("crypto");
const Blockchain = require("./blockchain");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const certificateChain = new Blockchain();

// WebSocket connection
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("verifyCertificate", (fileData) => {
    const cleanData = fileData.trim(); // ✅ FIX
    const hash = crypto
      .createHash("sha256")
      .update(cleanData)
      .digest("hex");

    const found = certificateChain.chain.find(
      (block) => block.data === hash
    );

    if (found) {
      socket.emit("verificationResult", "Certificate is AUTHENTIC ✅");
    } else {
      socket.emit("verificationResult", "Certificate is TAMPERED ❌");
    }
  });
});

// API to issue certificate
app.post("/issue", (req, res) => {
  const { fileData } = req.body;
  const cleanData = fileData.trim(); // ✅ FIX
  const hash = crypto
    .createHash("sha256")
    .update(cleanData)
    .digest("hex");

  certificateChain.addBlock(hash);
  res.json({ message: "Certificate Issued Successfully", hash });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
