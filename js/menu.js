// Hamburger Menu

const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle("hidden");
});

document.addEventListener("click", () => {
  dropdownMenu.classList.add("hidden");
});
