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

const formatGitHubDate = (date) => new Intl.DateTimeFormat("zh-TW", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date(date));

const syncGitHubProjects = async () => {
  const projectCards = document.querySelectorAll("[data-github-repo]");
  if (!projectCards.length) return;

  try {
    const response = await fetch("https://api.github.com/users/leezxt/repos?per_page=100&sort=updated", {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) throw new Error(`GitHub API ${response.status}`);

    const repositories = await response.json();
    const repositoriesByName = new Map(
      repositories.map((repository) => [repository.name.toLowerCase(), repository]),
    );

    projectCards.forEach((card) => {
      const repository = repositoriesByName.get(card.dataset.githubRepo.toLowerCase());
      const meta = card.querySelector(".github-meta");
      if (!repository || !meta) return;

      const details = [
        repository.private ? "私有專案" : "公開專案",
        repository.language && `主要語言 ${repository.language}`,
        `★ ${repository.stargazers_count}`,
        repository.archived && "已封存",
        `最新推送 ${formatGitHubDate(repository.pushed_at || repository.updated_at)}`,
      ].filter(Boolean);

      meta.textContent = details.join(" · ");
      if (repository.description) meta.title = repository.description;

      const repositoryLink = card.querySelector('a[href*="github.com"]');
      if (repositoryLink) {
        repositoryLink.href = repository.html_url;
        repositoryLink.textContent = repository.private
          ? "GitHub Repository / 私有專案"
          : "GitHub Repository / 公開原始碼";
      }
    });
  } catch {
    document.querySelectorAll(".github-meta").forEach((meta) => {
      meta.textContent = "GitHub 專案資訊暫時無法載入";
    });
  }
};

syncGitHubProjects();
