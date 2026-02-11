/*const express = require("express");
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
*/
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const crypto = require("crypto");
const Blockchain = require("./blockchain");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

/* 🔥 FRONTEND STATIC FILES */
app.use(express.static(path.join(__dirname, "../frontend")));

const certificateChain = new Blockchain();

// WebSocket connection
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("verifyCertificate", (hashFromUser) => {
  const cleanHash = hashFromUser.trim();

  const found = certificateChain.chain.find(
    (block) => block.data === cleanHash
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
  const cleanData = fileData.trim();
  const hash = crypto.createHash("sha256").update(cleanData).digest("hex");

  certificateChain.addBlock(hash);
  res.json({ message: "Certificate Issued Successfully", hash });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
//view only -explorer
app.get("/chain", (req, res) => {
  res.json(certificateChain.chain);
});

//analytics
io.on("connection", (socket) => {
  console.log("User connected");

  // send initial analytics data
  socket.emit("analyticsData", {
    totalBlocks: certificateChain.chain.length,
    totalCertificates: certificateChain.chain.length - 1,
  });

  socket.on("verifyCertificate", (hashFromUser) => {
    const cleanHash = hashFromUser.trim();

    const found = certificateChain.chain.find(
      (block) => block.data === cleanHash
    );

    if (found) {
      socket.emit("verificationResult", "Certificate is AUTHENTIC ✅");
    } else {
      socket.emit("verificationResult", "Certificate is TAMPERED ❌");
    }
  });
});
