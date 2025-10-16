// language.js
function setLanguage(lang) {
  const dict = I18N[lang] || I18N.fr;
  // Update labels
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  // Toggle pressed state on buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const isPressed = btn.getAttribute("data-lang") === lang;
    btn.setAttribute("aria-pressed", String(isPressed));
  });
  try {
    localStorage.setItem("lang", lang);
  } catch {}
}

function initLanguage() {
  const saved = (() => {
    try {
      return localStorage.getItem("lang");
    } catch {
      return null;
    }
  })();
  setLanguage(saved || "fr");
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      setLanguage(btn.getAttribute("data-lang"))
    );
  });
}
