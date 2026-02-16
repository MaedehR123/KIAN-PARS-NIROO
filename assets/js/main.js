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


// ===== BESTSELLERS SLIDER =====
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".bestsellers-track");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  if (!track || !prevBtn || !nextBtn) return;

  // مقدار اسکرول = عرض یک کارت + فاصله gap
  const scrollAmount = 320;

  nextBtn.addEventListener("click", () => {
    track.scrollBy({
      left: -scrollAmount, // RTL → بعدی
      behavior: "smooth"
    });
  });

  prevBtn.addEventListener("click", () => {
    track.scrollBy({
      left: scrollAmount, // RTL → قبلی
      behavior: "smooth"
    });
  });
});



// ===== PRODUCTS SLIDER FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
  // المنت‌های اصلی
  const productsTrack = document.getElementById("productsTrack");
  const prevBtn = document.querySelector(".products-wrapper .slider-btn.prev");
  const nextBtn = document.querySelector(".products-wrapper .slider-btn.next");
  const categoryBtns = document.querySelectorAll(".category-btn");
  const allProducts = document.querySelectorAll(".product-slide");
  
  // حالت اولیه
  let currentCategory = "all";
  let currentScrollPosition = 0;
  let autoScrollInterval;
  
  // ===== 1. فیلتر دسته‌بندی =====
  function filterProducts(category) {
    currentCategory = category;
    
    // حذف کلاس active از همه دکمه‌ها
    categoryBtns.forEach(btn => {
      btn.classList.remove("active");
    });
    
    // اضافه کردن کلاس active به دکمه انتخاب شده
    document.querySelector(`.category-btn[data-category="${category}"]`)?.classList.add("active");
    
    // شمارش محصولات هر دسته
    let visibleCount = 0;
    
    // فیلتر محصولات
    allProducts.forEach(product => {
      if (category === "all" || product.dataset.category === category) {
        product.classList.remove("hidden");
        visibleCount++;
        
        // انیمیشن fade in
        product.style.animation = "fadeInUp 0.4s ease forwards";
      } else {
        product.classList.add("hidden");
      }
    });
    
    // نمایش پیام اگر محصولی وجود ندارد
    showEmptyState(visibleCount === 0);
    
    // اسکرول به ابتدای اسلایدر
    if (productsTrack) {
      productsTrack.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    }
    
    // به‌روزرسانی وضعیت دکمه‌های ناوبری
    updateNavButtons();
  }
  
  // ===== 2. نمایش پیام خالی =====
  function showEmptyState(isEmpty) {
    let emptyState = document.querySelector(".products-empty");
    
    if (!emptyState && isEmpty) {
      emptyState = document.createElement("div");
      emptyState.className = "products-empty";
      emptyState.innerHTML = `
        <p>در حال حاضر محصولی در این دسته‌بندی موجود نیست.</p>
        <a href="#products-title" class="btn info" style="margin-top: 1rem;">مشاهده همه محصولات</a>
      `;
      productsTrack.parentNode.insertBefore(emptyState, productsTrack);
    } else if (emptyState) {
      emptyState.classList.toggle("hidden", !isEmpty);
    }
  }
  
  // ===== 3. به‌روزرسانی دکمه‌های ناوبری =====
  function updateNavButtons() {
    if (!productsTrack) return;
    
    const maxScroll = productsTrack.scrollWidth - productsTrack.clientWidth;
    const atStart = productsTrack.scrollLeft === 0;
    const atEnd = Math.abs(productsTrack.scrollLeft) >= maxScroll - 10;
    
    if (prevBtn) {
      prevBtn.disabled = atStart;
      prevBtn.style.opacity = atStart ? "0.4" : "0.9";
    }
    
    if (nextBtn) {
      nextBtn.disabled = atEnd;
      nextBtn.style.opacity = atEnd ? "0.4" : "0.9";
    }
  }
  
  // ===== 4. مدیریت اسکرول =====
  function setupSliderNavigation() {
    if (!productsTrack || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 320; // عرض کارت + گپ
    
    // دکمه بعدی (برای RTL)
    nextBtn.addEventListener("click", () => {
      productsTrack.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    });
    
    // دکمه قبلی (برای RTL)
    prevBtn.addEventListener("click", () => {
      productsTrack.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    });
    
    // ردیابی اسکرول برای به‌روزرسانی دکمه‌ها
    productsTrack.addEventListener("scroll", updateNavButtons);
    
    // ریست اسکرول هنگام تغییر سایز
    window.addEventListener("resize", () => {
      productsTrack.scrollLeft = 0;
      updateNavButtons();
    });
  }
  
  // ===== 5. اسکرول خودکار (اختیاری) =====
  function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    
    // فقط در دسکتاپ فعال باشد
    if (window.innerWidth > 768) {
      autoScrollInterval = setInterval(() => {
        if (!productsTrack) return;
        
        const maxScroll = productsTrack.scrollWidth - productsTrack.clientWidth;
        
        // اگر به انتها رسیده‌ایم، به ابتدا برگرد
        if (Math.abs(productsTrack.scrollLeft) >= maxScroll - 10) {
          productsTrack.scrollTo({
            left: 0,
            behavior: "smooth"
          });
        } else {
          // ادامه اسکرول
          productsTrack.scrollBy({
            left: -320,
            behavior: "smooth"
          });
        }
      }, 5000); // هر 5 ثانیه
    }
  }
  
  // توقف اسکرول خودکار هنگام هاور
  function stopAutoScrollOnHover() {
    if (!productsTrack) return;
    
    productsTrack.addEventListener("mouseenter", () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    });
    
    productsTrack.addEventListener("mouseleave", () => {
      startAutoScroll();
    });
  }
  
  // ===== 6. دکمه‌های دسته‌بندی =====
  function setupCategoryButtons() {
    categoryBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        filterProducts(category);
        
        // ذخیره دسته‌بندی انتخاب شده
        sessionStorage.setItem("selectedCategory", category);
      });
    });
  }
  
  // ===== 7. تورچ و سوایپ برای موبایل =====
  function setupTouchSwipe() {
    if (!productsTrack || window.innerWidth > 768) return;
    
    let startX = 0;
    let scrollLeft = 0;
    
    productsTrack.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = productsTrack.scrollLeft;
    });
    
    productsTrack.addEventListener("touchmove", (e) => {
      if (!startX) return;
      
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 1.5; // سرعت سوایپ
      
      productsTrack.scrollLeft = scrollLeft - walk;
      e.preventDefault();
    });
    
    productsTrack.addEventListener("touchend", () => {
      startX = 0;
    });
  }
  
  // ===== 8. مقداردهی اولیه =====
  function initProductsSlider() {
    // بارگذاری دسته‌بندی ذخیره شده
    const savedCategory = sessionStorage.getItem("selectedCategory");
    
    if (savedCategory) {
      filterProducts(savedCategory);
    } else {
      filterProducts("all");
    }
    
    // راه‌اندازی ناوبری اسلایدر
    setupSliderNavigation();
    
    // راه‌اندازی دکمه‌های دسته‌بندی
    setupCategoryButtons();
    
    // راه‌اندازی سوایپ برای موبایل
    setupTouchSwipe();
    
    // به‌روزرسانی اولیه دکمه‌های ناوبری
    updateNavButtons();
    
    // اسکرول خودکار (اختیاری - می‌توانید غیرفعال کنید)
    // startAutoScroll();
    // stopAutoScrollOnHover();
    
    // به‌روزرسانی هنگام تغییر سایز
    window.addEventListener("resize", updateNavButtons);
  }
  
  // ===== 9. راه‌اندازی =====
  if (allProducts.length > 0) {
    initProductsSlider();
  }
  
  // ===== 10. دکمه‌های مشاهده همه =====
  document.querySelectorAll('.btn[href="#products-title"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      filterProducts("all");
      
      // اسکرول به بخش محصولات
      document.getElementById("products-title").scrollIntoView({
        behavior: "smooth"
      });
    });
  });
});


/**
 * Product Slider JavaScript
 * مدیریت اسلایدر محصولات با 9 دسته‌بندی
 * ریسپانسیو کامل برای موبایل و دسکتاپ
 */

// ===== PRODUCTS SLIDER FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", () => {
  // المنت‌های اصلی
  const productsTrack = document.getElementById("productsTrack");
  const prevBtn = document.querySelector(".products-wrapper .slider-btn.prev");
  const nextBtn = document.querySelector(".products-wrapper .slider-btn.next");
  const categoryBtns = document.querySelectorAll(".category-btn");
  const allProducts = document.querySelectorAll(".product-slide");
  
  // حالت اولیه - اولین دسته فعال باشد
  let currentCategory = "gasoline";
  let currentScrollPosition = 0;
  let isAnimating = false;
  
  // ===== 1. فیلتر محصولات بر اساس دسته‌بندی =====
  function filterProducts(category) {
    // جلوگیری از فیلتر مجدد اگر در حال انیمیشن هستیم
    if (isAnimating || category === currentCategory) return;
    
    // شروع انیمیشن
    isAnimating = true;
    currentCategory = category;
    
    // به‌روزرسانی دکمه‌های دسته‌بندی
    updateCategoryButtons(category);
    
    // فیلتر محصولات
    let visibleCount = 0;
    
    allProducts.forEach(product => {
      if (product.dataset.category === category) {
        // نمایش محصول با انیمیشن
        product.classList.remove("hidden");
        product.style.animation = "fadeInUp 0.4s ease forwards";
        visibleCount++;
      } else {
        // مخفی کردن محصول
        product.classList.add("hidden");
      }
    });
    
    // نمایش پیام اگر محصولی وجود ندارد
    showEmptyState(visibleCount === 0);
    
    // اسکرول به ابتدای اسلایدر
    resetScrollPosition();
    
    // ذخیره دسته انتخاب شده
    sessionStorage.setItem("selectedCategory", category);
    
    // پایان انیمیشن
    setTimeout(() => {
      isAnimating = false;
    }, 400);
  }
  
  // ===== 2. به‌روزرسانی دکمه‌های دسته‌بندی =====
  function updateCategoryButtons(activeCategory) {
    categoryBtns.forEach(btn => {
      btn.classList.remove("active");
      if (btn.dataset.category === activeCategory) {
        btn.classList.add("active");
      }
    });
  }
  
  // ===== 3. نمایش پیام خالی =====
  function showEmptyState(isEmpty) {
    let emptyState = document.querySelector(".products-empty");
    
    if (!emptyState && isEmpty) {
      emptyState = document.createElement("div");
      emptyState.className = "products-empty";
      emptyState.innerHTML = `
        <p>در حال حاضر محصولی در این دسته‌بندی موجود نیست.</p>
      `;
      productsTrack.parentNode.insertBefore(emptyState, productsTrack);
    } else if (emptyState) {
      emptyState.classList.toggle("hidden", !isEmpty);
    }
  }
  
  // ===== 4. ریست موقعیت اسکرول =====
  function resetScrollPosition() {
    if (productsTrack) {
      productsTrack.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    }
  }
  
  // ===== 5. به‌روزرسانی دکمه‌های ناوبری =====
  function updateNavButtons() {
    if (!productsTrack || !prevBtn || !nextBtn) return;
    
    const maxScroll = productsTrack.scrollWidth - productsTrack.clientWidth;
    const atStart = productsTrack.scrollLeft === 0;
    const atEnd = Math.abs(productsTrack.scrollLeft) >= maxScroll - 10;
    
    // به‌روزرسانی دکمه قبلی
    prevBtn.disabled = atStart;
    prevBtn.style.opacity = atStart ? "0.4" : "0.9";
    prevBtn.style.cursor = atStart ? "not-allowed" : "pointer";
    
    // به‌روزرسانی دکمه بعدی
    nextBtn.disabled = atEnd;
    nextBtn.style.opacity = atEnd ? "0.4" : "0.9";
    nextBtn.style.cursor = atEnd ? "not-allowed" : "pointer";
  }
  
  // ===== 6. راه‌اندازی ناوبری اسلایدر =====
  function setupSliderNavigation() {
    if (!productsTrack || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 320; // عرض کارت + گپ
    
    // دکمه بعدی (RTL)
    nextBtn.addEventListener("click", () => {
      if (nextBtn.disabled || isAnimating) return;
      
      productsTrack.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    });
    
    // دکمه قبلی (RTL)
    prevBtn.addEventListener("click", () => {
      if (prevBtn.disabled || isAnimating) return;
      
      productsTrack.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    });
    
    // ردیابی اسکرول برای به‌روزرسانی دکمه‌ها
    productsTrack.addEventListener("scroll", () => {
      updateNavButtons();
    });
    
    // ریست هنگام تغییر سایز
    window.addEventListener("resize", () => {
      updateNavButtons();
    });
  }
  
  // ===== 7. راه‌اندازی دکمه‌های دسته‌بندی =====
  function setupCategoryButtons() {
    categoryBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        filterProducts(category);
      });
      
      // پشتیبانی از کیبورد
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }
  
  // ===== 8. سوایپ لمسی برای موبایل =====
  function setupTouchSwipe() {
    if (!productsTrack || window.innerWidth > 768) return;
    
    let startX = 0;
    let isSwiping = false;
    
    productsTrack.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      isSwiping = true;
    }, { passive: true });
    
    productsTrack.addEventListener("touchmove", (e) => {
      if (!isSwiping || isAnimating) return;
      
      const currentX = e.touches[0].pageX;
      const diffX = startX - currentX;
      
      // فقط اگر حرکت افقی قابل توجه بود
      if (Math.abs(diffX) > 30) {
        e.preventDefault();
        
        productsTrack.scrollLeft -= diffX * 1.5;
        startX = currentX;
      }
    }, { passive: false });
    
    productsTrack.addEventListener("touchend", () => {
      isSwiping = false;
    });
  }
  
  // ===== 9. مقداردهی اولیه =====
  function initProductsSlider() {
    // بارگذاری دسته ذخیره شده یا استفاده از دسته پیش‌فرض
    const savedCategory = sessionStorage.getItem("selectedCategory");
    const initialCategory = savedCategory || "gasoline";
    
    // راه‌اندازی اولیه فیلتر
    filterProducts(initialCategory);
    
    // راه‌اندازی ناوبری
    setupSliderNavigation();
    
    // راه‌اندازی دکمه‌های دسته‌بندی
    setupCategoryButtons();
    
    // راه‌اندازی سوایپ موبایل
    setupTouchSwipe();
    
    // به‌روزرسانی اولیه دکمه‌های ناوبری
    updateNavButtons();
    
    // رویداد تغییر سایز
    window.addEventListener("resize", updateNavButtons);
  }
  
  // ===== 10. راه‌اندازی =====
  if (allProducts.length > 0) {
    initProductsSlider();
    
    // ردیابی کلیک روی دکمه‌های استعلام قیمت
    document.querySelectorAll('.product-actions .contact').forEach(link => {
      link.addEventListener("click", function() {
        const productName = this.closest(".product-slide").querySelector(".product-head").textContent;
        console.log(`Product Inquiry: ${productName}`);
        // اینجا می‌توانید کد Google Analytics یا دیگر سرویس‌ها را اضافه کنید
      });
    });
  }
});




// ===== MULTI-LEVEL PRODUCTS SLIDER =====

/**
 * Product Slider JavaScript
 * مدیریت اسلایدر محصولات با دسته‌بندی‌های جدید
 */

document.addEventListener("DOMContentLoaded", () => {
  // داده‌های محصولات کامل
  const productsData = {
    // ===== دسته اول: دیزل ژنراتور =====
    diesel: {
      title: "دیزل ژنراتور",
      brands: {
        BAUDOUIN: {
          name: "BAUDOUIN",
          products: [
            { id: 1, name: "دیزل ژنراتور BAUDOUIN DSG20A/B", power: "20 کاوا", image: "assets/images/PRODUCTS/diesel/BAUDOUIN/dwp20.webp", features: ["صنعتی", "کم صدا", "استارت اتوماتیک"] },
            { id: 2, name: "دیزل ژنراتور BAUDOUIN DSG25A/B", power: "25 کاوا", image: "assets/images/PRODUCTS/diesel/BAUDOUIN/dwp25.webp", features: ["صنعتی", "کم مصرف", "سیستم خنک‌کننده"] },
            { id: 3, name: "دیزل ژنراتور BAUDOUIN DSG35A/B", power: "35 کاوا", image: "assets/images/PRODUCTS/diesel/BAUDOUIN/dwp35.webp", features: ["صنعتی", "کم صدا", "بازدهی بالا"] },
            { id: 4, name: "دیزل ژنراتور BAUDOUIN DSG50A/B", power: "50 کاوا", image: "assets/images/PRODUCTS/diesel/BAUDOUIN/dwp50.webp", features: ["صنعتی", "فشار قوی", "مقاوم در شرایط سخت"] },
            { id: 5, name: "دیزل ژنراتور BAUDOUIN DSG72A/B", power: "72 کاوا", image: "assets/images/PRODUCTS/diesel/BAUDOUIN/dwp72.webp", features: ["صنعتی", "استارت سریع", "کنترل دیجیتال"] },
            { id: 6, name: "دیزل ژنراتور BAUDOUIN DSG88A/B", power: "88 کاوا", image: "assets/images/PRODUCTS/diesel/BAUDOUIN/dwp88.webp", features: ["صنعتی", "پرقدرت", "گارانتی 1 ساله"] },
            { id: 7, name: "دیزل ژنراتور BAUDOUIN DSG110A/B", power: "110 کاوا", image: "assets/images/PRODUCTS/diesel/BAUDOUIN/dwp110.webp", features: ["صنعتی", "پرقدرت", "سیستم هشدار هوشمند"] },
            { id: 8, name: "دیزل ژنراتور BAUDOUIN DSG150A/B", power: "150 کاوا", image: "assets/images/PRODUCTS/diesel/BAUDOUIN/dwp150.webp", features: ["صنعتی", "پرقدرت", "سیستم کنترل از راه دور"] },
            { id: 9, name: "دیزل ژنراتور BAUDOUIN DSG165A/B", power: "165 کاوا", image: "assets/images/PRODUCTS/diesel/BAUDOUIN/dwp165.webp", features: ["صنعتی", "فشار قوی", "سیستم خنک‌کننده پیشرفته"] },
            { id: 10, name: "دیزل ژنراتور BAUDOUIN DSG220A/B", power: "220 کاوا", image: "assets/images/PRODUCTS/diesel/BAUDOUIN/dwp220.webp", features: ["صنعتی", "پرقدرت", "گارانتی 1 ساله"] }
          ]
        },
        cummins: {
          name: "CUMMINS",
          products: [
            { id: 11, name: "دیزل ژنراتور Cummins <br> 6BTAA5.9G6", power: "150 کاوا", image: "assets/images/PRODUCTS/diesel/cummins/c150.webp", features: ["توربو شارژ", "الکترونیکی", "انگلیس"] },
            { id: 12, name: "دیزل ژنراتور Cummins <br> 6LTAA9.5G2", power: "312 کاوا", image: "assets/images/PRODUCTS/diesel/cummins/c312.webp", features: ["توربو شارژ", "الکترونیکی", "انگلیس"]  },
            { id: 13, name: "دیزل ژنراتور Cummins <br>  NTA855G4", power: "400 کاوا", image: "assets/images/PRODUCTS/diesel/cummins/c400.webp", features: ["توربو شارژ", "الکترونیکی", "انگلیس"] },
            { id: 14, name: "دیزل ژنراتور Cummins <br>  KTA19-G4", power: "550 کاوا", image: "assets/images/PRODUCTS/diesel/cummins/c550.webp", features: ["توربو شارژ", "الکترونیکی", "انگلیس"]  },
            { id: 15, name: "دیزل ژنراتور Cummins <br> KTAA19-G6", power: "650 کاوا", image: "assets/images/PRODUCTS/diesel/cummins/c650.webp", features: ["توربو شارژ", "الکترونیکی", "انگلیس"] },
            // { id: 16, name: "دیزل ژنراتور Cummins C150D6", power: "150 کاوا", image: "assets/images/PRODUCTS/diesel/cummins/c150d6.webp", features: ["توربو شارژ", "الکترونیکی", "انگلیس"] },
            // { id: 17, name: "دیزل ژنراتور Cummins C175D6", power: "175 کاوا", image: "assets/images/PRODUCTS/diesel/cummins/c175d6.webp", features: ["توربو شارژ", "الکترونیکی", "انگلیس"]  },
            // { id: 18, name: "دیزل ژنراتور Cummins C200D6", power: "200 کاوا", image: "assets/images/PRODUCTS/diesel/cummins/c200d6.webp", features: ["توربو شارژ", "الکترونیکی", "انگلیس"] },
            // { id: 19, name: "دیزل ژنراتور Cummins C250D6", power: "250 کاوا", image: "assets/images/PRODUCTS/diesel/cummins/c250d6.webp", features: ["توربو شارژ", "الکترونیکی", "انگلیس"] },
            // { id: 20, name: "دیزل ژنراتور Cummins C300D6", power: "300 کاوا", image: "assets/images/PRODUCTS/diesel/cummins/c300d6.webp", features: ["توربو شارژ", "الکترونیکی", "انگلیس"] }
          ]
        },
        // volvo: {
        //   name: "VOLVO",
        //   products: [
        //     { id: 21, name: "دیزل ژنراتور Volvo Penta D30", power: "30 کاوا ", image: "assets/images/PRODUCTS/diesel/volvo/penta-d30.webp", features: ["صنعتی", "کیفیت سوئدی", "کم صدا"] },
        //     { id: 22, name: "دیزل ژنراتور Volvo Penta D50", power: "50 کاوا ", image: "assets/images/PRODUCTS/diesel/volvo/penta-d50.webp", features: ["صنعتی", "کم مصرف", "سیستم هشدار"] },
        //     { id: 23, name: "دیزل ژنراتور Volvo Penta D75", power: "75 کاوا ", image: "assets/images/PRODUCTS/diesel/volvo/penta-d75.webp", features: ["صنعتی", "کیفیت سوئدی", "بازدهی بالا"] },
        //     { id: 24, name: "دیزل ژنراتور Volvo Penta D100", power: "100 کاوا ", image: "assets/images/PRODUCTS/diesel/volvo/penta-d100.webp", features: ["صنعتی", "فشار قوی", "مقاوم در شرایط سخت"] },
        //     { id: 25, name: "دیزل ژنراتور Volvo Penta D125", power: "125 کاوا ", image: "assets/images/PRODUCTS/diesel/volvo/penta-d125.webp", features: ["صنعتی", "استارت سریع", "کنترل دیجیتال"] },
        //     { id: 26, name: "دیزل ژنراتور Volvo Penta D150", power: "150 کاوا ", image: "assets/images/PRODUCTS/diesel/volvo/penta-d150.webp", features: ["صنعتی", "پرقدرت", "گارانتی 2 ساله"] },
        //     { id: 27, name: "دیزل ژنراتور Volvo Penta D175", power: "175 کاوا ", image: "assets/images/PRODUCTS/diesel/volvo/penta-d175.webp", features: ["صنعتی", "پرقدرت", "سیستم هشدار هوشمند"] },
        //     { id: 28, name: "دیزل ژنراتور Volvo Penta D200", power: "200 کاوا ", image: "assets/images/PRODUCTS/diesel/volvo/penta-d200.webp", features: ["صنعتی", "پرقدرت", "سیستم کنترل از راه دور"] },
        //     { id: 29, name: "دیزل ژنراتور Volvo Penta D250", power: "250 کاوا ", image: "assets/images/PRODUCTS/diesel/volvo/penta-d250.webp", features: ["صنعتی", "فشار قوی", "سیستم خنک‌کننده پیشرفته"] },
        //     { id: 30, name: "دیزل ژنراتور Volvo Penta D300", power: "300 کاوا ", image: "assets/images/PRODUCTS/diesel/volvo/penta-d300.webp", features: ["صنعتی", "پرقدرت", "گارانتی 3 ساله"] }
        //   ]
        // },
        perkins: {
          name: "PERKINS(موتور سازان )",
          products: [
            { id: 31, name: "دیزل ژنراتور Perkins 3/152", power: "25 کاوا ", image: "assets/images/PRODUCTS/diesel/perkins/3152-25.webp", features: ["صنعتی", "کم صدا", "استارت اتوماتیک"] },
            { id: 32, name: "دیزل ژنراتور Perkins 4/236", power: "42 کاوا ", image: "assets/images/PRODUCTS/diesel/perkins/4236-42.webp", features: ["صنعتی", "کم مصرف", "سیستم هشدار"] },
            { id: 33, name: "دیزل ژنراتور Perkins 4/244MN", power: "50 کاوا ", image: "assets/images/PRODUCTS/diesel/perkins/4244MN-50.webp", features: ["صنعتی", "کم صدا", "بازدهی بالا"] },
            { id: 34, name: "دیزل ژنراتور Perkins 4/244TG1", power: "60 کاوا ", image: "assets/images/PRODUCTS/diesel/perkins/4244TG1-60.webp", features: ["صنعتی", "فشار قوی", "مقاوم در شرایط سخت"] },
            { id: 35, name: "دیزل ژنراتور Perkins 4040", power: "72 کاوا ", image: "assets/images/PRODUCTS/diesel/perkins/4040-72.webp", features: ["صنعتی", "استارت سریع", "کنترل دیجیتال"] },
            { id: 36, name: "دیزل ژنراتور Perkins 4/40A", power: "100 کاوا ", image: "assets/images/PRODUCTS/diesel/perkins/440A-100.webp", features: ["صنعتی", "پرقدرت", "گارانتی 2 ساله"] },
            { id: 37, name: "دیزل ژنراتور Perkins 6/60TGE", power: "120 کاوا ", image: "assets/images/PRODUCTS/diesel/perkins/440A-120.webp", features: ["صنعتی", "پرقدرت", "سیستم هشدار هوشمند"] },
            { id: 38, name: "دیزل ژنراتور Perkins 6/60TAGE", power: "140 کاوا ", image: "assets/images/PRODUCTS/diesel/perkins/660TAGE-140.webp", features: ["صنعتی", "پرقدرت", "سیستم کنترل از راه دور"] },
            { id: 39, name: "دیزل ژنراتور Perkins 6/60TAGE", power: "150 کاوا ", image: "assets/images/PRODUCTS/diesel/perkins/660TAGE-150.webp", features: ["صنعتی", "فشار قوی", "سیستم خنک‌کننده پیشرفته"] },
            // { id: 40, name: "دیزل ژنراتور Perkins 403A-250", power: "250 کاوا ", image: "assets/images/PRODUCTS/diesel/perkins/403a-250.webp", features: ["صنعتی", "پرقدرت", "گارانتی 3 ساله"] }
          ]
        }
      }
    },
    
    // ===== دسته دوم: ژنراتور گازی =====
    gas: {
      title: "ژنراتور گازی",
      brands: {
        perkins: {
          name: "PERKINS",
          products: [
            { id: 41, name: "ژنراتور گازی Perkins 40244MN.GAS", power: "40 کاوا ", image: "assets/images/PRODUCTS/gas/perkins/gp-40.webp", features: ["گازسوز", "اقتصادی", "کم آلاینده"] },
            { id: 42, name: "ژنراتور گازی Perkins 40244TG.GAS", power: "60 کاوا ", image: "assets/images/PRODUCTS/gas/perkins/gp-60.webp", features: ["گازسوز", "کم صدا", "استارت اتوماتیک"] },
            { id: 43, name: "ژنراتور گازی Perkins 6060T.GAS", power: "100 کاوا ", image: "assets/images/PRODUCTS/gas/perkins/gp-100.webp", features: ["گازسوز", "کم مصرف", "سیستم هشدار"] },
            { id: 44, name: "ژنراتور گازی Perkins 6060TA.GAS", power: "125 کاوا ", image: "assets/images/PRODUCTS/gas/perkins/gp-125.webp", features: ["گازسوز", "کم صدا", "بازدهی بالا"] },
            // { id: 45, name: "ژنراتور گازی Perkins GP-30", power: "30 کاوا ", image: "assets/images/PRODUCTS/gas/perkins/gp-30.webp", features: ["گازسوز", "فشار قوی", "مقاوم در شرایط سخت"] },
            // { id: 46, name: "ژنراتور گازی Perkins GP-40", power: "40 کاوا ", image: "assets/images/PRODUCTS/gas/perkins/gp-40.webp", features: ["گازسوز", "استارت سریع", "کنترل دیجیتال"] },
            // { id: 47, name: "ژنراتور گازی Perkins GP-50", power: "50 کاوا ", image: "assets/images/PRODUCTS/gas/perkins/gp-50.webp", features: ["گازسوز", "پرقدرت", "گارانتی 2 ساله"] },
            // { id: 48, name: "ژنراتور گازی Perkins GP-60", power: "60 کاوا ", image: "assets/images/PRODUCTS/gas/perkins/gp-60.webp", features: ["گازسوز", "پرقدرت", "سیستم هشدار هوشمند"] },
            // { id: 49, name: "ژنراتور گازی Perkins GP-75", power: "75 کاوا ", image: "assets/images/PRODUCTS/gas/perkins/gp-75.webp", features: ["گازسوز", "پرقدرت", "سیستم کنترل از راه دور"] },
            // { id: 50, name: "ژنراتور گازی Perkins GP-100", power: "100 کیلووات", image: "assets/images/PRODUCTS/gas/perkins/gp-100.webp", features: ["گازسوز", "فشار قوی", "سیستم خنک‌کننده پیشرفته"] }
          ]
        }
      }
    },
    
    // ===== دسته سوم: آلترناتور =====
    alternator: {
      title: "آلترناتور",
      brands: {
        stamford: {
          name: "STAMFORD",
          products: [
            { id: 51, name: "آلترناتور Stamford DS 164 B", power: "12.5 کاوا", image: "assets/images/PRODUCTS/alternator/stamford/uci224.webp", features: ["کیفیت بالا", "بازدهی 95%", "عایق کلاس H"] },
            { id: 52, name: "آلترناتور Stamford DS 164 C", power: "13.5 کاوا", image: "assets/images/PRODUCTS/alternator/stamford/uci274.webp", features: ["کیفیت بالا", "کم صدا", "استارت سریع"] },
            { id: 53, name: "آلترناتور Stamford DS 164 D", power: "16 کاوا", image: "assets/images/PRODUCTS/alternator/stamford/uci324.webp", features: ["کیفیت بالا", "کم مصرف", "سیستم خنک‌کننده"] },
            { id: 54, name: "آلترناتور Stamford DS 184 ES", power: "20 کاوا", image: "assets/images/PRODUCTS/alternator/stamford/uci374.webp", features: ["کیفیت بالا", "کم صدا", "بازدهی بالا"] },
            { id: 55, name: "آلترناتور Stamford DS 184 F", power: "22.5 کاوا", image: "assets/images/PRODUCTS/alternator/stamford/uci424.webp", features: ["کیفیت بالا", "فشار قوی", "مقاوم در شرایط سخت"] },
            { id: 56, name: "آلترناتور Stamford DS 184 G", power: "27.5 کاوا", image: "assets/images/PRODUCTS/alternator/stamford/uci474.webp", features: ["کیفیت بالا", "استارت سریع", "کنترل دیجیتال"] },
            { id: 57, name: "آلترناتور Stamford DS 184 H", power: "31.5 کاوا", image: "assets/images/PRODUCTS/alternator/stamford/uci524.webp", features: ["کیفیت بالا", "پرقدرت", "گارانتی 2 ساله"] },
            { id: 58, name: "آلترناتور Stamford DS 184 J", power: "37.5 کاوا", image: "assets/images/PRODUCTS/alternator/stamford/uci574.webp", features: ["کیفیت بالا", "پرقدرت", "سیستم هشدار هوشمند"] },
            { id: 59, name: "آلترناتور Stamford DS 224 C", power: "40 کاوا", image: "assets/images/PRODUCTS/alternator/stamford/uci624.webp", features: ["کیفیت بالا", "پرقدرت", "سیستم کنترل از راه دور"] },
            { id: 60, name: "آلترناتور Stamford DS 224 D", power: "42.5 کاوا", image: "assets/images/PRODUCTS/alternator/stamford/uci674.webp", features: ["کیفیت بالا", "فشار قوی", "سیستم خنک‌کننده پیشرفته"] }
          ]
        },
        stamfordCoal: {
          name: "STREAN ذغالی",
          products: [
            { id: 61, name: "آلترناتور STREAN ذغالی ST-3", power: "3 کاوا ", image: "assets/images/PRODUCTS/alternator/STREAN-coal/sc-10.webp", features: ["ذغالی", "اقتصادی", "کم آلاینده"] },
            { id: 62, name: "آلترناتور STREAN ذغالی ST-5", power: "5 کاوا ", image: "assets/images/PRODUCTS/alternator/STREAN-coal/sc-15.webp", features: ["ذغالی", "کم صدا", "استارت اتوماتیک"] },
            { id: 63, name: "آلترناتور STREAN ذغالی ST-7.5", power: "7.5 کاوا ", image: "assets/images/PRODUCTS/alternator/STREAN-coal/sc-20.webp", features: ["ذغالی", "کم مصرف", "سیستم هشدار"] },
            { id: 64, name: "آلترناتور STREAN ذغالی ST-10", power: "10 کاوا ", image: "assets/images/PRODUCTS/alternator/STREAN-coal/sc-25.webp", features: ["ذغالی", "کم صدا", "بازدهی بالا"] },
            { id: 65, name: "آلترناتور STREAN ذغالی ST-12", power: "12 کاوا ", image: "assets/images/PRODUCTS/alternator/STREAN-coal/sc-30.webp", features: ["ذغالی", "فشار قوی", "مقاوم در شرایط سخت"] },
            { id: 66, name: "آلترناتور STREAN ذغالی ST-15", power: "15 کاوا ", image: "assets/images/PRODUCTS/alternator/STREAN-coal/sc-40.webp", features: ["ذغالی", "استارت سریع", "کنترل دیجیتال"] },
            { id: 67, name: "آلترناتور STREAN ذغالی ST-20", power: "20 کاوا ", image: "assets/images/PRODUCTS/alternator/STREAN-coal/sc-50.webp", features: ["ذغالی", "پرقدرت", "گارانتی 2 ساله"] },
            { id: 68, name: "آلترناتور STREAN ذغالی ST-24", power: "24 کاوا ", image: "assets/images/PRODUCTS/alternator/STREAN-coal/sc-60.webp", features: ["ذغالی", "پرقدرت", "سیستم هشدار هوشمند"] },
            { id: 69, name: "آلترناتور STREAN ذغالی STC-3", power: "3 کاوا ", image: "assets/images/PRODUCTS/alternator/STREAN-coal/sc-75.webp", features: ["ذغالی", "پرقدرت", "سیستم کنترل از راه دور"] },
            { id: 70, name: "آلترناتور STREAN ذغالی STC-5", power: "5 کاوا ", image: "assets/images/PRODUCTS/alternator/STREAN-coal/sc-100.webp", features: ["ذغالی", "فشار قوی", "سیستم خنک‌کننده پیشرفته"] }
          ]
        },
        meccalte: {
          name: "MECCALTE",
          products: [
            { id: 71, name: "آلترناتور Meccalte S16F", power: "6.5 کاوا", image: "assets/images/PRODUCTS/alternator/meccalte/m10.webp", features: ["ایتالیایی", "کیفیت بالا", "بازدهی 96%"] },
            { id: 72, name: "آلترناتور Meccalte S20F", power: "12 کاوا", image: "assets/images/PRODUCTS/alternator/meccalte/m15.webp", features: ["ایتالیایی", "کم صدا", "استارت سریع"] },
            { id: 73, name: "آلترناتور Meccalte ECP28-2S/4C", power: "15 کاوا", image: "assets/images/PRODUCTS/alternator/meccalte/m20.webp", features: ["ایتالیایی", "کم مصرف", "سیستم خنک‌کننده"] },
            { id: 74, name: "آلترناتور Meccalte ECP28-M/4C", power: "20 کاوا", image: "assets/images/PRODUCTS/alternator/meccalte/m25.webp", features: ["ایتالیایی", "کم صدا", "بازدهی بالا"] },
            { id: 75, name: "آلترناتور Meccalte ECP28-L/4C", power: "25 کاوا", image: "assets/images/PRODUCTS/alternator/meccalte/m30.webp", features: ["ایتالیایی", "فشار قوی", "مقاوم در شرایط سخت"] },
            { id: 76, name: "آلترناتور Meccalte ECP28-VL/4C", power: "30 کاوا", image: "assets/images/PRODUCTS/alternator/meccalte/m40.webp", features: ["ایتالیایی", "استارت سریع", "کنترل دیجیتال"] },
            { id: 77, name: "آلترناتور Meccalte ECP32-2S/4C", power: "45 کاوا", image: "assets/images/PRODUCTS/alternator/meccalte/m50.webp", features: ["ایتالیایی", "پرقدرت", "گارانتی 2 ساله"] },
            { id: 78, name: "آلترناتور Meccalte ECP32-1M/4C", power: "50 کاوا", image: "assets/images/PRODUCTS/alternator/meccalte/m60.webp", features: ["ایتالیایی", "پرقدرت", "سیستم هشدار هوشمند"] },
            { id: 79, name: "آلترناتور Meccalte ECP32-2M/4C", power: "62.5 کاوا", image: "assets/images/PRODUCTS/alternator/meccalte/m75.webp", features: ["ایتالیایی", "پرقدرت", "سیستم کنترل از راه دور"] },
            { id: 80, name: "آلترناتور Meccalte ECP32-1L/4C", power: "75 کاوا", image: "assets/images/PRODUCTS/alternator/meccalte/m100.webp", features: ["ایتالیایی", "فشار قوی", "سیستم خنک‌کننده پیشرفته"] }
          ]
        }
      }
    },
    
    // ===== دسته چهارم: موتور برق بنزینی =====
    gasoline: {
      title: "موتور برق بنزینی",
      brands: {
        shineray: {
          name: "SHINERAY",
          products: [
            { id: 81, name: "موتور برق بنزینی SRG E2500", power: "2500 وات", image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E2500.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "220 ولت"] },
            { id: 82, name: "موتور برق بنزینی SRG E4000", power: "4000 وات", image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E4000.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "220 ولت"] },
            { id: 83, name: "موتور برق بنزینی SRG E6500E", power: "6500 وات", image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E6500E.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت"] },
            { id: 84, name: "موتور برق بنزینی SR6500ISE", power: "6500 وات", image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SR6500ISE.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "SUPER SILENT", "220 ولت"] },
            { id: 85, name: "موتور برق بنزینی SRG E7500", power: "7500 وات", image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E7500.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت"] },
            { id: 86, name: "موتور برق بنزینی SRG E8000", power: "8000 وات", image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E8000.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت"] },
            { id: 87, name: "موتور برق بنزینی SRG E9000", power: "9000 وات", image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E9000.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت"] },
            { id: 88, name: "موتور برق بنزینی SRG E10000", power: "10000 وات", image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E10000.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت"] },
            { id: 89, name: "موتور برق بنزینی SRG E12000", power: "12000 وات", image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E12000.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت"] },
            { id: 90, name: "موتور برق بنزینی SRG E15000", power: "15000 وات", image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E15000.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت", "380 ولت"] }
          ]
        },
        stream: {
          name: "STREAM",
          products: [
            { id: 91, name: "موتور برق بنزینی ST 9000 D-H", power: "9000 وات", image: "assets/images/PRODUCTS/motorBargh/برند STREAM/ST9000-D-H.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت"] },
            { id: 92, name: "موتور برق بنزینی ST 10000 D-H", power: "10000 وات", image: "assets/images/PRODUCTS/motorBargh/برند STREAM/ST10000-D-H.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت"] },
            { id: 93, name: "موتور برق بنزینی ST 15000 D-H", power: "15000 وات", image: "assets/images/PRODUCTS/motorBargh/برند STREAM/ST15000-D-H.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت", "380 ولت"] },
            { id: 94, name: "موتور برق بنزینی ST 20000 D-H", power: "20000 وات", image: "assets/images/PRODUCTS/motorBargh/برند STREAM/ST20000-D-H.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت", "380 ولت"] },
            { id: 95, name: "موتور برق بنزینی ST 25000 D-H", power: "25000 وات", image: "assets/images/PRODUCTS/motorBargh/برند STREAM/ST25000-D-H.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت", "380 ولت"] },
            { id: 96, name: "موتور برق بنزینی ST 30000 D-H", power: "30000 وات", image: "assets/images/PRODUCTS/motorBargh/برند STREAM/ST30000-D-H.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت", "380 ولت"] },
            { id: 97, name: "موتور برق بنزینی ST 35000 D-H", power: "35000 وات", image: "assets/images/PRODUCTS/motorBargh/برند STREAM/ST35000-D-H.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت", "380 ولت"] },
            { id: 98, name: "موتور برق بنزینی ST 40000 D-H", power: "40000 وات", image: "assets/images/PRODUCTS/motorBargh/برند STREAM/ST40000-D-H.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت", "380 ولت"] },
            { id: 99, name: "موتور برق بنزینی ST 45000 D-H", power: "45000 وات", image: "assets/images/PRODUCTS/motorBargh/برند STREAM/ST45000-D-H.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت", "380 ولت"] },
            { id: 100, name: "موتور برق بنزینی ST 50000 D-H", power: "50000 وات", image: "assets/images/PRODUCTS/motorBargh/برند STREAM/ST50000-D-H.webp", features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "220 ولت", "380 ولت"] }
          ]
        }
      }
    }
  };

  // المنت‌های اصلی
  const productsContent = document.getElementById('productsContent');
  const categoryBtns = document.querySelectorAll('.category-btn');
  let currentCategory = 'diesel'; // دیزل ژنراتور به عنوان دسته اول

  // ===== 1. رندر کردن محصولات =====
  function renderProducts(category) {
    const categoryData = productsData[category];
    if (!categoryData) return;

    // حالت لودینگ
    productsContent.innerHTML = '<div class="brand-loading">در حال بارگذاری محصولات...</div>';

    setTimeout(() => {
      let html = '';

      // برای هر برند در این دسته
      Object.entries(categoryData.brands).forEach(([brandKey, brandData]) => {
        const brandSlug = `${category}-${brandKey}`;
        
        html += `
          <div class="brand-section" id="${brandSlug}">
            <h3 class="brand-title">
              ${brandData.name}
            </h3>
            
            <div class="brand-slider-container">
              <button class="brand-nav-btn prev" data-brand="${brandSlug}" aria-label="محصولات قبلی ${brandData.name}">&#10094;</button>
              <button class="brand-nav-btn next" data-brand="${brandSlug}" aria-label="محصولات بعدی ${brandData.name}">&#10095;</button>
              
              <div class="brand-products-slider" id="slider-${brandSlug}">
                ${brandData.products.map(product => `
                  <article class="brand-product-slide">
                    <div class="product-head">${product.name}</div>
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-body">
                      <p><strong>مدل:</strong> ${product.name}</p>
                      <p><strong>برند:</strong> ${brandData.name}</p>
                      <p><strong>قدرت:</strong> ${product.power}</p>
                      ${product.features ? `
                        <p><strong>ویژگی‌ها:</strong> ${product.features.join(' • ')}</p>
                      ` : ''}
                      <div class="brand-product-actions">
                        <a href="#" class="btn info">اطلاعات بیشتر</a>
                        <a href="https://wa.me/989394323524?text=سلام، برای استعلام قیمت ${encodeURIComponent(product.name)} راهنمایی می‌خواستم"
                           class="btn contact" target="_blank" rel="noopener">
                          استعلام قیمت
                        </a>
                      </div>
                    </div>
                  </article>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      });

      productsContent.innerHTML = html;
      
      // راه‌اندازی اسلایدرهای برند
      setupBrandSliders();
      
      // به‌روزرسانی دکمه‌های ناوبری
      updateBrandNavButtons();
      
    }, 300);
  }

  // ===== 2. راه‌اندازی اسلایدرهای برند =====
  function setupBrandSliders() {
    // دکمه‌های ناوبری برند
    document.querySelectorAll('.brand-nav-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const brandId = this.dataset.brand;
        const slider = document.getElementById(`slider-${brandId}`);
        const isNext = this.classList.contains('next');
        const scrollAmount = 320; // عرض کارت + گپ
        
        if (slider) {
          slider.scrollBy({
            left: isNext ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
          });
          
          // به‌روزرسانی دکمه‌ها پس از اسکرول
          setTimeout(() => updateNavButtonsForBrand(brandId), 300);
        }
      });
    });
    
    // اسکرول اسلایدرها
    document.querySelectorAll('.brand-products-slider').forEach(slider => {
      slider.addEventListener('scroll', function() {
        const brandId = this.id.replace('slider-', '');
        updateNavButtonsForBrand(brandId);
      });
    });
  }

  // ===== 3. به‌روزرسانی دکمه‌های ناوبری هر برند =====
  function updateNavButtonsForBrand(brandId) {
    const slider = document.getElementById(`slider-${brandId}`);
    if (!slider) return;
    
    const prevBtn = document.querySelector(`.brand-nav-btn.prev[data-brand="${brandId}"]`);
    const nextBtn = document.querySelector(`.brand-nav-btn.next[data-brand="${brandId}"]`);
    
    if (!prevBtn || !nextBtn) return;
    
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const atStart = slider.scrollLeft === 0;
    const atEnd = Math.abs(slider.scrollLeft) >= maxScroll - 10;
    
    prevBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
    
    prevBtn.style.opacity = atStart ? '0.3' : '0.9';
    nextBtn.style.opacity = atEnd ? '0.3' : '0.9';
  }

  // ===== 4. به‌روزرسانی کلی دکمه‌های ناوبری =====
  function updateBrandNavButtons() {
    const categoryData = productsData[currentCategory];
    if (!categoryData) return;
    
    Object.keys(categoryData.brands).forEach(brandKey => {
      updateNavButtonsForBrand(`${currentCategory}-${brandKey}`);
    });
  }

  // ===== 5. راه‌اندازی دکمه‌های دسته‌بندی =====
  function setupCategoryButtons() {
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        
        // جلوگیری از کلیک مجدد روی دسته فعال
        if (category === currentCategory) return;
        
        // به‌روزرسانی دکمه‌های فعال
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // تغییر دسته
        currentCategory = category;
        
        // رندر محصولات جدید
        renderProducts(category);
        
        // اسکرول به ابتدای بخش محصولات
        document.getElementById('products-title').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // ذخیره در localStorage
        localStorage.setItem('lastProductCategory', category);
      });
    });
  }

  // ===== 6. مقداردهی اولیه =====
  function initProductsSlider() {
    // بارگذاری دسته آخر از localStorage
    const lastCategory = localStorage.getItem('lastProductCategory') || 'diesel';
    
    // تنظیم دکمه فعال
    categoryBtns.forEach(btn => {
      if (btn.dataset.category === lastCategory) {
        btn.classList.add('active');
        currentCategory = lastCategory;
      }
    });
    
    // رندر اولیه
    renderProducts(currentCategory);
    
    // راه‌اندازی دکمه‌های دسته‌بندی
    setupCategoryButtons();
    
    // به‌روزرسانی هنگام تغییر سایز
    window.addEventListener('resize', updateBrandNavButtons);
  }

  // ===== 7. راه‌اندازی =====
  if (productsContent) {
    initProductsSlider();
  }

  // ===== 8. سوایپ لمسی برای موبایل =====
  function setupTouchSwipe() {
    document.querySelectorAll('.brand-products-slider').forEach(slider => {
      let startX = 0;
      let isDragging = false;
      
      slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      }, { passive: true });
      
      slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        
        if (Math.abs(diffX) > 20) {
          slider.scrollLeft += diffX * 1.5;
          startX = currentX;
        }
      }, { passive: true });
      
      slider.addEventListener('touchend', () => {
        isDragging = false;
        const brandId = slider.id.replace('slider-', '');
        updateNavButtonsForBrand(brandId);
      });
    });
  }

  // راه‌اندازی سوایپ برای موبایل
  if ('ontouchstart' in window) {
    setTimeout(setupTouchSwipe, 1000);
  }
});

// بقیه کدهای JavaScript شما (برای منو، اسلایدر پرفروش‌ها و ...) بدون تغییر باقی می‌مانند



// افزودن این کد به فایل main.js
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const isActive = faqItem.classList.contains('active');
      
      // بستن تمام FAQهای دیگر
      document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          item.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });
      
      // فعال‌سازی یا غیرفعال‌سازی این FAQ
      if (!isActive) {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0';
      }
    });
  });
  
  // باز کردن FAQها با کیبورد
  faqQuestions.forEach(question => {
    question.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
});

