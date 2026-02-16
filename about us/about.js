"use strict";

// ========== DOM ELEMENTS ==========
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuBackdrop = document.getElementById("menuBackdrop");
const menuClose = document.querySelector(".menu-close");
const body = document.body;

// Contact Popups
const desktopContactBtn = document.getElementById("desktopContactBtn");
const desktopPopup = document.getElementById("desktopContactPopup");
const mobileContactBtn = document.getElementById("mobileContactBtnMobile");
const mobilePopup = document.getElementById("mobileContactPopupMobile");

// ========== MOBILE MENU ==========
function toggleMobileMenu(open) {
  if (!mobileMenu || !menuBackdrop || !menuToggle) return;
  
  if (open) {
    mobileMenu.classList.add("active");
    menuBackdrop.classList.add("active");
    menuToggle.classList.add("open");
    body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
  } else {
    mobileMenu.classList.remove("active");
    menuBackdrop.classList.remove("active");
    menuToggle.classList.remove("open");
    body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMobileMenu(true);
  });
}

if (menuClose) {
  menuClose.addEventListener("click", () => toggleMobileMenu(false));
}

if (menuBackdrop) {
  menuBackdrop.addEventListener("click", () => toggleMobileMenu(false));
}

// ========== CONTACT POPUPS ==========
function toggleContactPopup(popup, show) {
  if (!popup) return;
  show ? popup.classList.add("show") : popup.classList.remove("show");
}

if (desktopContactBtn && desktopPopup) {
  desktopContactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleContactPopup(desktopPopup, true);
  });

  document.addEventListener("click", (e) => {
    if (!desktopContactBtn?.contains(e.target) && !desktopPopup?.contains(e.target)) {
      toggleContactPopup(desktopPopup, false);
    }
  });
}

if (mobileContactBtn && mobilePopup) {
  mobileContactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleContactPopup(mobilePopup, true);
  });

  document.addEventListener("click", (e) => {
    if (!mobileContactBtn?.contains(e.target) && !mobilePopup?.contains(e.target)) {
      toggleContactPopup(mobilePopup, false);
    }
  });
}

// ========== ANIMATED COUNTER ==========
function initCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute("data-count") || "0", 10);
        let current = 0;
        const increment = Math.ceil(target / 30);
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
          } else {
            element.textContent = current;
          }
        }, 30);
        
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach((number) => observer.observe(number));
}

// ========== BRANDS INFINITE SCROLL ==========
function initBrandsSlider() {
  const brandsTrack = document.querySelector(".brands__track");
  if (!brandsTrack) return;

  const brandLogos = brandsTrack.innerHTML;
  brandsTrack.innerHTML = brandLogos + brandLogos;

  const slider = document.querySelector(".brands__slider");
  if (slider) {
    slider.addEventListener("mouseenter", () => {
      brandsTrack.style.animationPlayState = "paused";
    });
    slider.addEventListener("mouseleave", () => {
      brandsTrack.style.animationPlayState = "running";
    });
  }
}

// ========== ACTIVE LINK ==========
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav__list a, .mobile-menu a");
  
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "about.html" && href?.includes("about"))) {
      link.classList.add("active");
    }
  });
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  initCounters();
  initBrandsSlider();
  setActiveNavLink();
});

// ========== CLEANUP ==========
window.addEventListener("beforeunload", () => {
  const brandsTrack = document.querySelector(".brands__track");
  if (brandsTrack) {
    brandsTrack.style.animation = "none";
  }
});