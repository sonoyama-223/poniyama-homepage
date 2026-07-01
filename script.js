// cursor spotlight
const root = document.documentElement;
window.addEventListener("pointermove", (e) => {
  root.style.setProperty("--mx", `${e.clientX}px`);
  root.style.setProperty("--my", `${e.clientY}px`);
});

// scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));

// subtle 3D tilt on link cards
const cards = document.querySelectorAll(".link-card");
cards.forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-5px)`;
  });
  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

// footer year
const yearEl = document.querySelector(".footer-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
