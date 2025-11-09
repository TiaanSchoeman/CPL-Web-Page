// script.js - Cozy Panda Logic Animations
document.addEventListener("DOMContentLoaded", () => {
  // 1. HERO ANIMATION
  gsap.from(".hero h1", { opacity: 0, y: 50, duration: 1, ease: "power3.out" });
  gsap.from(".hero p", { opacity: 0, y: 40, duration: 1, delay: 0.3, ease: "power3.out" });
  gsap.from(".hero .btn", { opacity: 0, scale: 0.8, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" });

  // 2. SCROLL ANIMATIONS (using Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const delay = target.dataset.delay || 0;

        if (target.classList.contains("card") || target.classList.contains("pricing-card") || target.classList.contains("project-card") || target.classList.contains("value-card")) {
          gsap.to(target, {
            opacity: 1,
            y: 0,
            scale: target.classList.contains("pricing-card") ? 1 : 1,
            duration: 0.8,
            delay: delay,
            ease: "power2.out"
          });
        }
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  // Observe all animatable cards
  document.querySelectorAll(".card, .pricing-card, .project-card, .value-card").forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    el.dataset.delay = i * 0.15; // Stagger
    observer.observe(el);
  });

  // 3. FORM INPUT ANIMATION
  document.querySelectorAll("#contact-form input, #contact-form textarea").forEach(input => {
    input.addEventListener("focus", () => {
      gsap.to(input, { scale: 1.02, duration: 0.3, ease: "power2.out" });
    });
    input.addEventListener("blur", () => {
      gsap.to(input, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // 4. SMOOTH SCROLL FOR NAV LINKS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });

  // 5. ACTIVE NAV LINK ON SCROLL
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll("nav a").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}` || (current === "" && link.getAttribute("href") === "#")) {
        link.classList.add("active");
      }
    });
  });
});