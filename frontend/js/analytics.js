const socket = io();

socket.on("analyticsData", (data) => {
  document.getElementById("certCount").innerText =
    data.totalCertificates;

  document.getElementById("blockCount").innerText =
    data.totalBlocks;
});
