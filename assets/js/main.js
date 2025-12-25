document.addEventListener("DOMContentLoaded", () => {
  // ===== MOBILE MENU =====
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("menuBackdrop");
  const closeBtn = document.querySelector(".menu-close");

  if (!toggle || !menu || !backdrop || !closeBtn) return;

  let startX = 0;

  function openMenu() {
    document.body.classList.add("menu-open");
    menu.classList.add("active");
    backdrop.classList.add("active");
    toggle.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  }

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menu.classList.remove("active");
    backdrop.classList.remove("active");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  };

  toggle.addEventListener("click", () => {
    menu.classList.contains("active") ? closeMenu() : openMenu();
  });
  closeBtn.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);

  // ===== MOBILE CONTACT BUTTON =====
  const mobileContactBtn = document.getElementById('mobileContactBtnMobile');
  const mobileContactPopup = document.getElementById('mobileContactPopupMobile');

  if (mobileContactBtn && mobileContactPopup) {
    mobileContactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileContactPopup.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.mobile-contact')) {
        mobileContactPopup.classList.remove('show');
      }
    });
  }
});

// دسکتاپ
const desktopBtn = document.getElementById('desktopContactBtn');
const desktopPopup = document.getElementById('desktopContactPopup');

if(desktopBtn && desktopPopup) {
  desktopBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    desktopPopup.classList.toggle('show');
  });
  document.addEventListener('click', e => {
    if(!e.target.closest('.contact-menu')) {
      desktopPopup.classList.remove('show');
    }
  });
}

// موبایل
const mobileBtn = document.getElementById('mobileContactBtn');
const mobilePopup = document.getElementById('mobileContactPopup');

if(mobileBtn && mobilePopup) {
  mobileBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    mobilePopup.classList.toggle('show');
  });
  document.addEventListener('click', e => {
    if(!e.target.closest('.mobile-contact')) {
      mobilePopup.classList.remove('show');
    }
  });
}
