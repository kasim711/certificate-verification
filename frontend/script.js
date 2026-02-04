const socket = io("http://localhost:5000");

function issueCert() {
  const data = document.getElementById("certData").value;

  fetch("http://localhost:5000/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileData: data })
  })
  .then(res => res.json())
  .then(() => alert("Certificate Issued"));
}

function verifyCert() {
  const data = document.getElementById("verifyData").value;
  socket.emit("verifyCertificate", data);
}

socket.on("verificationResult", (msg) => {
  document.getElementById("result").innerText = msg;
});
