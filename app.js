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
const resetBtn = document.getElementById("resetBtn");

// Lists
const participantList = document.getElementById("participantList");
const resultList = document.getElementById("resultList");

// Status and counters
const participantCount = document.getElementById("participantCount");
const statusText = document.getElementById("status");

// Hamburger menu
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

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

  // Refresh participant list
  renderParticipants();

  // Enable random picker
  pickBtn.disabled = false;

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
    pickBtn.disabled = true;

    statusText.textContent = "🎉 Lottery Over";

    resetBtn.style.display = "inline-block";
  }
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
  statusText.textContent = "";

  // Disable random picker
  pickBtn.disabled = true;

  // Hide reset button
  resetBtn.style.display = "none";

  // Clear input
  nameInput.value = "";

  // Focus input
  nameInput.focus();
});

// --------------------------------------
// Hamburger Menu Toggle
// --------------------------------------
menuBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
});

// --------------------------------------
// Close Menu When Clicking Outside
// --------------------------------------
document.addEventListener("click", (e) => {
  if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove("show");
  }
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

// Hide reset button initially
resetBtn.style.display = "none";

// Set participant count to zero
updateParticipantCount();
