// Hamburger Menu

const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

if (menuBtn && dropdownMenu) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    dropdownMenu.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    dropdownMenu.classList.remove("show");
  });

  dropdownMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}
