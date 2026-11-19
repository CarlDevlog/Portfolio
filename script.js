// ---------- Mobile nav ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function setNav(open) {
  navLinks.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}
navToggle.addEventListener("click", () =>
  setNav(!navLinks.classList.contains("open")),
);
navLinks
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => setNav(false)));

// ---------- Navbar background on scroll ----------
const navbar = document.getElementById("navbar");
function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Active link highlight ----------
const links = [...navLinks.querySelectorAll("a")];
const sections = links.map((a) =>
  document.querySelector(a.getAttribute("href")),
);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) =>
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + entry.target.id,
          ),
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
sections.forEach((s) => s && spy.observe(s));

// ---------- Scroll reveal ----------
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  reveals.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 70 + "ms";
    io.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

// ---------- Certificate lightbox ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}
document.querySelectorAll(".cert-thumb").forEach((btn) => {
  btn.addEventListener("click", () => {
    lightboxImg.src = btn.dataset.full;
    lightboxImg.alt = btn.dataset.title;
    lightboxTitle.textContent = btn.dataset.title;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
document
  .getElementById("lightboxClose")
  .addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Skill level legend + tap support ----------
const LEVELS = [
  "Beginner",
  "Amateur",
  "Intermediate",
  "Advanced",
  "Professional",
];

// Add the legend to the bottom of every skill card
document.querySelectorAll(".skills-grid .card").forEach((card) => {
  const legend = document.createElement("ul");
  legend.className = "legend";
  legend.setAttribute("aria-label", "Skill level legend");
  legend.innerHTML = LEVELS.map(
    (l) => `<li data-level="${l.toLowerCase()}">${l}</li>`,
  ).join("");
  card.appendChild(legend);
});

// Skill chips: keyboard focus + tap to show level on touch screens
const chips = document.querySelectorAll(".tags li[data-level]");
chips.forEach((chip) => {
  chip.tabIndex = 0;
  chip.setAttribute(
    "aria-label",
    `${chip.textContent}, ${chip.dataset.level} level`,
  );
  chip.addEventListener("click", (e) => {
    const wasActive = chip.classList.contains("active");
    chips.forEach((c) => c.classList.remove("active"));
    if (!wasActive) chip.classList.add("active");
    e.stopPropagation();
  });
});
document.addEventListener("click", () =>
  chips.forEach((c) => c.classList.remove("active")),
);
