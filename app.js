const nameInput = document.getElementById("nameInput");
const addBtn = document.getElementById("addBtn");
const pickBtn = document.getElementById("pickBtn");

const participantList = document.getElementById("participantList");
const participantCount = document.getElementById("participantCount");
const resultList = document.getElementById("resultList");
const statusText = document.getElementById("status");

let participants = [];
let results = [];

// Add Name
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (name === "") return;

  participants.push(name);
  renderParticipants();

  nameInput.value = "";
  nameInput.focus();

  if (participants.length > 0) {
    pickBtn.disabled = false;
    statusText.textContent = "";
  }
});

// Allow Enter key
nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// Random Pick
pickBtn.addEventListener("click", () => {
  if (participants.length === 0) return;

  const randomIndex = Math.floor(Math.random() * participants.length);

  const selectedName = participants.splice(randomIndex, 1)[0];

  results.push(selectedName);

  renderParticipants();
  renderResults();

  if (participants.length === 0) {
    pickBtn.disabled = true;
    statusText.textContent = "🎉 Lottery Over";
    resetBtn.style.display = "inline-block";
  }
});

//Reset Btn
resetBtn.addEventListener("click", () => {
  participants = [];
  results = [];

  renderParticipants();
  renderResults();

  pickBtn.disabled = true;

  statusText.textContent = "";
  resetBtn.style.display = "none";

  nameInput.value = "";
  nameInput.focus();
});

function renderParticipants() {
  participantList.innerHTML = "";

  participants.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    participantList.appendChild(li);
  });

  participantCount.textContent = participants.length;
}

function renderResults() {
  resultList.innerHTML = "";

  results.forEach((name, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${name}`;
    resultList.appendChild(li);
  });
}

// Initially disabled
pickBtn.disabled = true;
