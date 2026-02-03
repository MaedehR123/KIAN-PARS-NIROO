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
document.addEventListener("DOMContentLoaded", () => {
  // داده‌های محصولات (می‌توانید از JSON هم استفاده کنید)
  const productsData = {
    gasoline: {
      title: "موتور برق بنزینی",
      brands: {
        shineray: {
          name: "SHINERAY",
          products: [
            {
              id: 1,
              name: "موتور برق بنزینی SRG E2500",
              image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E2500.webp",
              power: "۲۵۰۰ وات",
              features: ["استارت", "هندل", "ولت متر", "باتری", "۲۲۰ ولت"]
            },
            {
              id: 2,
              name: "موتور برق بنزینی SRG E4000",
              image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E4000.webp",
              power: "۴۰۰۰ وات",
              features: ["استارت", "هندل", "ولت متر", "باتری", "۲۲۰ ولت"]
            },
            {
              id: 3,
              name: "موتور برق بنزینی SRG E6500E",
              image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E6500E.webp",
              power: "۶۵۰۰ وات",
              features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "۲۲۰ ولت"]
            },
            {
              id: 4,
              name: "موتور برق بنزینی SR6500ISE",
              image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SR6500ISE.webp",
              power: "۶۵۰۰ وات - Silent",
              features: ["استارت", "هندل", "ولت متر", "باتری", "SUPER SILENT", "۲۲۰ ولت"]
            },
            {
              id: 5,
              name: "موتور برق بنزینی SRG E7500",
              image: "assets/images/PRODUCTS/motorBargh/برند SHINERAY/SRG E7500.webp",
              power: "۷۵۰۰ وات",
              features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "۲۲۰ ولت"]
            }
          ]
        },
        stream: {
          name: "STREAM",
          products: [
            {
              id: 6,
              name: "موتور برق بنزینی ST 9000 D-H",
              image: "assets/images/PRODUCTS/2.webp",
              power: "۹۰۰۰ وات",
              features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "۲۲۰ ولت"]
            },
            {
              id: 7,
              name: "موتور برق بنزینی ST 10000 D-H",
              image: "assets/images/PRODUCTS/1.webp",
              power: "۱۰۰۰۰ وات",
              features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "۲۲۰ ولت"]
            },
            {
              id: 8,
              name: "موتور برق بنزینی ST 15000 D-H",
              image: "assets/images/PRODUCTS/1.webp",
              power: "۱۵۰۰۰ وات",
              features: ["استارت", "هندل", "ولت متر", "باتری", "چرخ دار", "۲۲۰ ولت", "۳۸۰ ولت"]
            }
          ]
        },
        honda: {
          name: "HONDA",
          products: [
            {
              id: 9,
              name: "موتور برق بنزینی Honda EU10i",
              image: "assets/images/PRODUCTS/honda1.webp",
              power: "۱۰۰۰ وات",
              features: ["اینورتر", "سبک", "کم‌صدا", "اقتصادی"]
            },
            {
              id: 10,
              name: "موتور برق بنزینی Honda EU22i",
              image: "assets/images/PRODUCTS/honda2.webp",
              power: "۲۲۰۰ وات",
              features: ["اینورتر", "قدرت بالا", "کم مصرف"]
            }
          ]
        }
      }
    },
    diesel: {
      title: "دیزل ژنراتور",
      brands: {
        cummins: {
          name: "CUMMINS",
          products: [
            { id: 11, name: "دیزل ژنراتور Cummins 30kVA", power: "۳۰ کیلووات", image: "assets/images/PRODUCTS/diesel1.webp" },
            { id: 12, name: "دیزل ژنراتور Cummins 50kVA", power: "۵۰ کیلووات", image: "assets/images/PRODUCTS/diesel2.webp" }
          ]
        },
        perkins: {
          name: "PERKINS",
          products: [
            { id: 13, name: "دیزل ژنراتور Perkins 75kVA", power: "۷۵ کیلووات", image: "assets/images/PRODUCTS/diesel3.webp" }
          ]
        }
      }
    },
    gas: {
      title: "ژنراتور گازی",
      brands: {
        generac: {
          name: "GENERAC",
          products: [
            { id: 14, name: "ژنراتور گازی ۱۰ کیلووات", power: "۱۰ کیلووات", image: "assets/images/PRODUCTS/gas1.webp" }
          ]
        }
      }
    },
    coupled: {
      title: "ژنراتور کوپله",
      brands: {
        knp: {
          name: "KNP",
          products: [
            { id: 15, name: "ژنراتور کوپل صنعتی ۲۰ کیلووات", power: "۲۰ کیلووات", image: "assets/images/PRODUCTS/coupled1.webp" },
            { id: 16, name: "ژنراتور کوپل صنعتی ۵۰ کیلووات", power: "۵۰ کیلووات", image: "assets/images/PRODUCTS/coupled2.webp" }
          ]
        }
      }
    }
  };

  // المنت‌های اصلی
  const productsContent = document.getElementById('productsContent');
  const categoryBtns = document.querySelectorAll('.category-btn');
  let currentCategory = 'gasoline';

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
              <span class="product-count">(${brandData.products.length} محصول)</span>
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
    Object.keys(productsData[currentCategory].brands).forEach(brandKey => {
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
    const lastCategory = localStorage.getItem('lastProductCategory') || 'gasoline';
    
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

