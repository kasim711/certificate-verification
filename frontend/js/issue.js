async function issueCert() {
  const name = document.getElementById("studentName").value;
  const certId = document.getElementById("certId").value;
  const course = document.getElementById("course").value;
  const date = document.getElementById("date").value;

  if (!name || !certId || !course || !date) {
    alert("Please fill all fields");
    return;
  }

  //combine
  const certificateData = `
    Name: ${name}
    Certificate ID: ${certId}
    Course: ${course}
    Date: ${date}
  `;

  try {
    const res = await fetch("/issue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileData: certificateData }),
    });

    const result = await res.json();

    document.getElementById("issueResult").innerText =
      "Certificate Issued Successfully ";

    document.getElementById("hashOutput").innerText = result.hash;
  } catch (err) {
    document.getElementById("issueResult").innerText =
      "Error issuing certificate ";
  }
  app.post("/issue", (req, res) => {
  const { fileData } = req.body;
  const cleanData = fileData.trim();
  const hash = crypto.createHash("sha256").update(cleanData).digest("hex");

  certificateChain.addBlock(hash);

  // broadcast analytics update
  io.emit("analyticsData", {
    totalBlocks: certificateChain.chain.length,
    totalCertificates: certificateChain.chain.length - 1,
  });

  res.json({ message: "Certificate Issued Successfully", hash });
});

}
