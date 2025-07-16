document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".story");
  const nav = document.getElementById("dot-nav");

  // Create dot navigation
  sections.forEach((section, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth" });
    });
    nav.appendChild(dot);
  });

  // Show section when in view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));

  // Magnetic scroll on wheel
  let scrollTimeout;
  window.addEventListener("wheel", (e) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const currentSection = [...sections].findIndex(sec => {
        const rect = sec.getBoundingClientRect();
        return rect.top >= -window.innerHeight / 2 && rect.top < window.innerHeight / 2;
      });

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        sections[currentSection + 1].scrollIntoView({ behavior: "smooth" });
      } else if (e.deltaY < 0 && currentSection > 0) {
        sections[currentSection - 1].scrollIntoView({ behavior: "smooth" });
      }
    }, 50); // delay for debounce
  }, { passive: true });

  // Highlight nav dots
  window.addEventListener("scroll", () => {
    let current = 0;
    sections.forEach((section, index) => {
      const offset = section.getBoundingClientRect().top;
      if (offset <= window.innerHeight / 2) current = index;
    });
    document.querySelectorAll("#dot-nav .dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
    });
  });

  // Animate intro on load
  setTimeout(() => {
    document.getElementById("introHeader")?.classList.add("visible");
  }, 300);

  setTimeout(() => {
    document.getElementById("proProfile")?.classList.add("visible");
  }, 1200);
});
window.addEventListener("resize", () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
});
window.dispatchEvent(new Event('resize'));
