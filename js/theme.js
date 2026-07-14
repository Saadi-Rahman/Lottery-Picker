const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.documentElement.classList.remove("dark");

  if (themeIcon) {
    themeIcon.className = "fa-regular fa-sun";
  }
} else {
  document.documentElement.classList.add("dark");

  if (themeIcon) {
    themeIcon.className = "fa-solid fa-moon";
  }
}

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");

      if (themeIcon) {
        themeIcon.className = "fa-solid fa-moon";
      }
    } else {
      localStorage.setItem("theme", "light");

      if (themeIcon) {
        themeIcon.className = "fa-regular fa-sun";
      }
    }

    if (typeof initBackground === "function") {
      initBackground(); // for toggle Vanta effect
    }
  });
}
