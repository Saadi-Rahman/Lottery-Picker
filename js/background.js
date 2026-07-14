let vantaEffect;

function initBackground() {
  const isDark = document.documentElement.classList.contains("dark");

  if (vantaEffect) {
    vantaEffect.destroy();
  }

  vantaEffect = VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 1,
    scaleMobile: 1,

    color: 0xb88021,

    backgroundColor: isDark
      ? 0x0f172a // slate-900
      : 0xfff7ed, // orange-50
  });
}

initBackground();
