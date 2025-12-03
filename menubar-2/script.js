document.addEventListener("DOMContentLoaded", function () {
  // Initialize elements
  const menuToggle = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector(".close-btn");
  const menuContainer = document.querySelector(".menu-container");
  const menuItems = document.querySelectorAll(".menu-item");
  const cursor = document.querySelector(".cursor");
  const cursorCircle = document.querySelector(".cursor-circle");
  const progressFill = document.querySelector(".progress-fill");
  const soundToggle = document.querySelector(".sound-toggle");

  // Menu state
  let isMenuOpen = false;

  // Custom cursor
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, .menu-toggle, .close-btn, .sound-toggle, .menu-content p, .menu-item"
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      gsap.to(cursorCircle, {
        scale: 1.8,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      gsap.to(cursorCircle, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Menu toggle animation
  menuToggle.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", closeMenu);

  function toggleMenu() {
    if (!isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  function openMenu() {
    isMenuOpen = true;

    // Animate menu toggle button
    menuToggle.classList.add("active");

    // Show menu with overlay
    menuContainer.classList.add("active");

    // Animate progress bar
    gsap.to(progressFill, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut",
      delay: 0.3,
    });

    // Animate menu items with stagger
    gsap.to(".menu-item", {
      x: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
    });

    // Animate link characters
    gsap.to(".link-char", {
      y: 0,
      opacity: 1,
      stagger: 0.03,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 0.5,
    });

    // Add particle effects
    createParticles();
  }

  function closeMenu() {
    isMenuOpen = false;

    // Animate menu toggle button
    menuToggle.classList.remove("active");

    // Hide menu
    menuContainer.classList.remove("active");

    // Reset progress bar
    gsap.to(progressFill, {
      width: "0%",
      duration: 0.5,
      ease: "power2.inOut",
    });

    // Animate menu items out
    gsap.to(".menu-item", {
      x: -50,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "power2.in",
    });

    // Reset link characters
    gsap.to(".link-char", {
      y: 100,
      opacity: 0,
      stagger: 0.02,
      duration: 0.4,
      ease: "power2.in",
    });
  }

  // Menu item hover animations
  menuItems.forEach((item) => {
    const linkChars = item.querySelectorAll(".link-char");
    const pageNumber = item.querySelector(".page-number");
    const pageNumberChars = pageNumber ? pageNumber.textContent.split("") : [];
    const bgHover = item.querySelector(".bg-hover");
    const hoverGradient = item.querySelector(".hover-gradient");
    const underline = item.querySelector(".link-underline");

    // Store original page number text
    const originalPageNumber = pageNumber ? pageNumber.textContent : "";

    item.addEventListener("mouseenter", () => {
      // Animate link characters
      gsap.to(linkChars, {
        y: -5,
        stagger: 0.03,
        duration: 0.3,
        ease: "back.out(1.7)",
      });

      // Animate page number
      if (pageNumber) {
        gsap.to(pageNumber, {
          x: 10,
          color: "#00ffea",
          duration: 0.4,
          ease: "power2.out",
        });
      }

      // Animate underline
      if (underline) {
        gsap.to(underline, {
          width: "100%",
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Animate gradient
      if (hoverGradient) {
        gsap.to(hoverGradient, {
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // Add shuffle effect to page number
      if (pageNumber && !item.classList.contains("active")) {
        shuffleText(pageNumber);
      }
    });

    item.addEventListener("mouseleave", () => {
      // Reset link characters
      gsap.to(linkChars, {
        y: 0,
        stagger: 0.02,
        duration: 0.3,
        ease: "power2.out",
      });

      // Reset page number
      if (pageNumber && !item.classList.contains("active")) {
        gsap.to(pageNumber, {
          x: 0,
          color: "rgba(255, 255, 255, 0.4)",
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            if (pageNumber && pageNumber.textContent !== originalPageNumber) {
              pageNumber.textContent = originalPageNumber;
            }
          },
        });
      }

      // Reset underline
      if (underline) {
        gsap.to(underline, {
          width: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }

      // Reset gradient if not active
      if (hoverGradient && !item.classList.contains("active")) {
        gsap.to(hoverGradient, {
          x: "-100%",
          duration: 0.4,
          ease: "power2.in",
        });
      }
    });
  });

  // Text shuffle animation
  function shuffleText(element) {
    const originalText = element.textContent;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iterations = 0;
    const maxIterations = 10;
    const interval = 50;

    const shuffleInterval = setInterval(() => {
      element.textContent = originalText
        .split("")
        .map((char, index) => {
          if (index < iterations) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iterations >= originalText.length) {
        clearInterval(shuffleInterval);
        element.textContent = originalText;
      }

      iterations += 1 / 3;
    }, interval);
  }

  // Particle effects
  function createParticles() {
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Random position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      // Random size
      const size = Math.random() * 3 + 1;

      // Random color
      const hue = Math.random() * 60 + 160; // Cyan to green range
      const alpha = Math.random() * 0.3 + 0.1;

      // Apply styles
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = `hsla(${hue}, 100%, 50%, ${alpha})`;

      // Add to document
      document.body.appendChild(particle);

      // Animate particle
      gsap.to(particle, {
        x: `+=${(Math.random() - 0.5) * 100}`,
        y: `+=${(Math.random() - 0.5) * 100}`,
        opacity: 0,
        duration: Math.random() * 2 + 1,
        ease: "power2.out",
        delay: Math.random() * 0.5,
        onComplete: () => {
          particle.remove();
        },
      });
    }
  }

  // Sound toggle
  soundToggle.addEventListener("click", function () {
    const icon = this.querySelector("i");

    if (icon.classList.contains("fa-volume-up")) {
      icon.classList.remove("fa-volume-up");
      icon.classList.add("fa-volume-mute");

      // Add animation
      gsap.to(this, {
        scale: 0.9,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    } else {
      icon.classList.remove("fa-volume-mute");
      icon.classList.add("fa-volume-up");

      // Add animation
      gsap.to(this, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }

    if (e.key === "m" || e.key === "M") {
      toggleMenu();
    }
  });

  // Initialize with particles on load
  setTimeout(() => {
    createParticles();
  }, 1000);

  // Add continuous subtle particles
  setInterval(() => {
    if (isMenuOpen) {
      createParticles();
    }
  }, 3000);

  // Page load animation
  gsap.from("nav", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    delay: 0.5,
  });

  gsap.from(".menu-toggle", {
    scale: 0,
    rotation: -180,
    duration: 0.8,
    ease: "back.out(1.7)",
    delay: 0.8,
  });

  gsap.from(".nav-title", {
    x: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    delay: 1,
  });

  // Initialize active state animations
  const activeItem = document.querySelector(".menu-item.active");
  if (activeItem) {
    const activeLinkChars = activeItem.querySelectorAll(".link-char");
    const activeUnderline = activeItem.querySelector(".link-underline");

    // Animate active item on load
    setTimeout(() => {
      gsap.to(activeLinkChars, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      if (activeUnderline) {
        gsap.to(activeUnderline, {
          width: "100%",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.3,
        });
      }
    }, 1500);
  }
});
