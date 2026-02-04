function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function resetTimeline() {
  document.querySelectorAll(".timeline li")
    .forEach(li => li.classList.remove("active"));
}

function activateStep(id) {
  document.getElementById(id).classList.add("active");
}
