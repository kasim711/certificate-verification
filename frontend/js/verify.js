/*function verifyCert() {
  const data = document.getElementById("verifyData").value;

  showLoader();
  resetTimeline();

  setTimeout(() => activateStep("step1"), 400);
  setTimeout(() => activateStep("step2"), 800);

  socket.emit("verifyCertificate", data);
}

socket.on("verificationResult", (msg) => {
  hideLoader();
  activateStep("step3");

  const result = document.getElementById("result");
  result.innerText = msg;

  result.className = msg.includes("AUTHENTIC")
    ? "status-success"
    : "status-error";
});*/
const socket = io();

function verifyCert() {
  const data = document.getElementById("verifyInput").value;

  if (!data) {
    alert("Enter certificate ID / hash");
    return;
  }

  socket.emit("verifyCertificate", data);
}

socket.on("verificationResult", (msg) => {
  const result = document.getElementById("result");
  result.innerText = msg;

  result.className = msg.includes("AUTHENTIC")
    ? "status-success"
    : "status-error";
});


