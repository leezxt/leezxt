document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");

menuButton?.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const themeButton = document.querySelector(".theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
let savedTheme = null;

try {
  savedTheme = localStorage.getItem("resume-theme");
} catch {
  // The page still follows the system theme when storage is unavailable.
}

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  themeButton.textContent = isDark ? "淺色模式" : "深色模式";
  themeButton.setAttribute("aria-pressed", String(isDark));
};

setTheme(savedTheme || (prefersDark.matches ? "dark" : "light"));

themeButton?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  try {
    localStorage.setItem("resume-theme", nextTheme);
  } catch {
    // Theme switching still works for the current page view.
  }
});

const skillGroups = [...document.querySelectorAll(".skill-group")];
const skillToggle = document.querySelector(".skill-toggle");

const syncSkillToggle = () => {
  const allOpen = skillGroups.every((group) => group.open);
  skillToggle.textContent = allOpen ? "收合全部" : "展開全部";
  skillToggle.setAttribute("aria-expanded", String(allOpen));
};

skillToggle?.addEventListener("click", () => {
  const shouldOpen = !skillGroups.every((group) => group.open);
  skillGroups.forEach((group) => {
    group.open = shouldOpen;
  });
  syncSkillToggle();
});

skillGroups.forEach((group) => group.addEventListener("toggle", syncSkillToggle));

const revealItems = document.querySelectorAll(".hero, .section");
revealItems.forEach((item) => item.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sections = document.querySelectorAll("main [id]");
const navAnchors = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-30% 0px -60%", threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));
}

const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("is-visible", window.scrollY > 520);
}, { passive: true });

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
