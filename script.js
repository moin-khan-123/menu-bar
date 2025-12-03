document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector(".close-btn");
  const menuContainer = document.querySelector(".menu-container");
  const menuItems = document.querySelectorAll(".menu-item");

  menuToggle.addEventListener("click", () => {
    menuContainer.style.left = "0%";
    animateMenuItems(menuItems, "in");
  });

  closeBtn.addEventListener("click", () => {
    menuContainer.style.left = "-50%";
    animateMenuItems(menuItems, "out");
  });

  function animateMenuItems(items, direction) {
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.left = direction === "in" ? "0px" : "-100px";
      }, index * 50);
    });
  }

  // Check if SplitType is available before using it
  if (typeof SplitType !== 'undefined') {
    const link = new SplitType(".menu-item a", { types: "words, chars" });
    const span = new SplitType(".menu-item span", { types: "words, chars" });
    const menuTitle = new SplitType(".menu-title p", { types: "words, chars" });
    const menuContent = new SplitType(".menu-content p", {
      types: "words, chars",
    });
  }

  // Set hover effects for menu items
  document.querySelectorAll(".menu-item").forEach((item) => {
    const linkElement = item.querySelector(".menu-item-link a");
    if (linkElement) {
      const width = linkElement.offsetWidth;
      const bgHover = item.querySelector(".menu-item-link .bg-hover");
      if (bgHover) {
        bgHover.style.width = width + 30 + "px";
      }

      const spanElement = item.querySelector("span");
      if (spanElement) {
        spanElement.style.left = width + 40 + "px";
      }
    }

    const chars = item.querySelectorAll("span .char");

    function colorChars(chars) {
      chars.forEach((char, index) => {
        setTimeout(() => {
          char.classList.add("char-active");
        }, index * 50);
      });
    }

    function clearColorChars(chars) {
      chars.forEach((char) => {
        char.classList.remove("char-active");
      });
    }

    if (linkElement) {
      linkElement.addEventListener("mouseenter", () => {
        if (chars) colorChars(chars);
      });

      linkElement.addEventListener("mouseleave", () => {
        if (chars) clearColorChars(chars);
      });
    }
  });

  // Add shuffle effect if SplitType is available
  function addShuffleEffect(element) {
    if (!element || typeof SplitType === 'undefined') return;
    
    const chars = element.querySelectorAll(".char");
    if (!chars.length) return;
    
    const originalText = Array.from(chars).map(char => char.textContent);
    const shuffleInterval = 10;
    const resetDelay = 75;
    const additionalDelay = 150;
    
    chars.forEach((char, index) => {
      setTimeout(() => {
        const interval = setInterval(() => {
          char.textContent = String.fromCharCode(
            97 + Math.floor(Math.random() * 26)
          );
        }, shuffleInterval);
        
        setTimeout(() => {
          clearInterval(interval);
          char.textContent = originalText[index];
        }, resetDelay + index * additionalDelay);
      }, index * shuffleInterval);
    });
  }

  // Add event listeners for links
  document.querySelectorAll(".menu-item-link a, .menu-title p, .menu-content p").forEach(link => {
    link.addEventListener("mouseenter", (event) => {
      addShuffleEffect(event.currentTarget);
    });
  });
});
// https://xhamster2.com/videos/invited-her-sisters-friend-to-her-room-and-fucked-her-xhSllBZ
