async function loadChain() {
  const res = await fetch("http://localhost:5000/chain");
  const chain = await res.json();

  const list = document.getElementById("blockList");
  list.innerHTML = "";

  chain.forEach((block, index) => {
    const li = document.createElement("li");
    li.innerText = `Block ${index}: ${block.data}`;
    list.appendChild(li);
  });
}

loadChain();
