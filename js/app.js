// ======================================
// LOTTERY PICKER
// ======================================

// ======================================
// 1. ELEMENT SELECTORS
// ======================================

// Input and buttons
const nameInput = document.getElementById("nameInput");
const addBtn = document.getElementById("addBtn");
const pickBtn = document.getElementById("pickBtn");
const drawAllBtn = document.getElementById("drawAllBtn");
const resetBtn = document.getElementById("resetBtn");
const status = document.getElementById("status");

// Initial state
pickBtn.disabled = true;
drawAllBtn.disabled = true;

// Lists
const participantList = document.getElementById("participantList");
const resultList = document.getElementById("resultList");

// Status and counters
const participantCount = document.getElementById("participantCount");
const statusText = document.getElementById("status");

// ======================================
// 2. APPLICATION DATA
// ======================================

// Stores all active participants
let participants = [];

// Stores selected participants in order
let results = [];

// ======================================
// 3. EVENT LISTENERS
// ======================================

// --------------------------------------
// Add Participant
// --------------------------------------
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();

  // Prevent empty entries
  if (name === "") {
    return;
  }

  // Add participant
  participants.push(name);

  // Enable random picker & draw all buttons
  pickBtn.disabled = false;
  drawAllBtn.disabled = false;

  // Refresh participant list
  renderParticipants();

  // Clear input field
  nameInput.value = "";

  // Focus input for quick entry
  nameInput.focus();

  // Clear lottery status if restarting
  statusText.textContent = "";
});

// --------------------------------------
// Add Participant with Enter Key
// --------------------------------------
nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

// --------------------------------------
// Random Pick
// --------------------------------------
pickBtn.addEventListener("click", () => {
  // Stop if no participants
  if (participants.length === 0) {
    return;
  }

  // Generate random index
  const randomIndex = Math.floor(Math.random() * participants.length);

  // Remove selected participant
  const selectedName = participants.splice(randomIndex, 1)[0];

  // Add to results
  results.push(selectedName);

  // Refresh UI
  renderParticipants();
  renderResults();

  // Check if lottery is complete
  if (participants.length === 0) {
    status.textContent = "🎉 Lottery is Over";

    pickBtn.disabled = true;
    drawAllBtn.disabled = true;

    console.log("Pick:", pickBtn.disabled);
    console.log("Draw All:", drawAllBtn.disabled);

    resetBtn.classList.remove("hidden");
  }
});

// ===================================
// DRAW ALL BUTTON
// ===================================

drawAllBtn.addEventListener("click", () => {
  // Stop if there are no participants
  if (participants.length === 0) return;

  // Shuffle all remaining participants
  for (let i = participants.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [participants[i], participants[j]] = [participants[j], participants[i]];
  }

  // Move all shuffled participants to results
  results.push(...participants);

  // Clear participant list
  participants = [];

  // Refresh both lists
  renderParticipants();
  renderResults();

  // Lottery finished
  status.textContent = "🎉 Lottery is Over";

  // Disable both lottery buttons
  pickBtn.disabled = true;
  drawAllBtn.disabled = true;

  // Show reset button
  resetBtn.classList.remove("hidden");
});

// --------------------------------------
// Reset Lottery
// --------------------------------------
resetBtn.addEventListener("click", () => {
  // Clear arrays
  participants = [];
  results = [];

  // Refresh UI
  renderParticipants();
  renderResults();

  // Reset status
  status.textContent = "";

  // Disable buttons because list is empty
  pickBtn.disabled = true;
  drawAllBtn.disabled = true;

  // Hide reset button
  resetBtn.classList.add("hidden");

  // Clear input
  nameInput.value = "";

  // Focus input
  nameInput.focus();
});

// ======================================
// 4. FUNCTIONS
// ======================================

// --------------------------------------
// Render Participant List
// --------------------------------------
function renderParticipants() {
  participantList.innerHTML = "";

  participants.forEach((name) => {
    const li = document.createElement("li");

    li.textContent = name;

    participantList.appendChild(li);
  });

  updateParticipantCount();
}

// --------------------------------------
// Render Result List
// --------------------------------------
function renderResults() {
  resultList.innerHTML = "";

  results.forEach((name, index) => {
    const li = document.createElement("li");

    li.textContent = `${index + 1}. ${name}`;

    resultList.appendChild(li);
  });
}

// --------------------------------------
// Update Participant Counter
// --------------------------------------
function updateParticipantCount() {
  participantCount.textContent = participants.length;
}

// ======================================
// 5. INITIAL PAGE SETUP
// ======================================

// Random Pick disabled initially
pickBtn.disabled = true;

// Set participant count to zero
updateParticipantCount();
