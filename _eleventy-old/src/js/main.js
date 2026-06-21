document.addEventListener("DOMContentLoaded", () => {
  // --- Sticky Header ---
  const header = document.getElementById("site-header");
  const scrollThreshold = 80;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  // Passive scroll listener for better performance
  window.addEventListener("scroll", handleScroll, { passive: true });
  // Initial check on load
  handleScroll();

  // --- Burger Menu ---
  const burgerMenu = document.getElementById("burger-menu");
  const siteNav = document.getElementById("site-navigation");

  if (burgerMenu && siteNav) {
    burgerMenu.addEventListener("click", () => {
      const isExpanded = burgerMenu.getAttribute("aria-expanded") === "true";
      burgerMenu.setAttribute("aria-expanded", !isExpanded);
      siteNav.classList.toggle("open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target) && siteNav.classList.contains("open")) {
        burgerMenu.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("open");
      }
    });
  }

  // --- Scroll Animations (Intersection Observer) ---
  const animatedElements = document.querySelectorAll(".animate");

  if ("IntersectionObserver" in window) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optionally stop observing once animated
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px" // triggers slightly before element enters viewport
    });

    animatedElements.forEach((el) => {
      animationObserver.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    animatedElements.forEach((el) => {
      el.classList.add("active");
    });
  }



  // --- Accordion Logic ---
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panelId = trigger.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Close all other panels
      accordionTriggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute("aria-expanded", "false");
          const otherPanelId = otherTrigger.getAttribute("aria-controls");
          const otherPanel = document.getElementById(otherPanelId);
          if (otherPanel) {
            otherPanel.classList.remove("active");
          }
        }
      });

      // Toggle current panel
      if (isExpanded) {
        trigger.setAttribute("aria-expanded", "false");
        panel.classList.remove("active");
      } else {
        trigger.setAttribute("aria-expanded", "true");
        panel.classList.add("active");
      }
    });
  });

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-q");
    if (trigger) {
      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        
        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("open");
          }
        });
        
        // Toggle current item
        if (isOpen) {
          item.classList.remove("open");
        } else {
          item.classList.add("open");
        }
      });
    }
  });
});
