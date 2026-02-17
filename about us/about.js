/**
 * about.js - اسکریپت اختصاصی صفحه درباره ما
 * کاملاً هماهنگ با صفحه اصلی و ریسپانسیو
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ===== 1. انیمیشن شمارنده اعداد (Counter Animation) =====
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    // فقط اگر صفحه درباره ما باشد اجرا کن
    if (!counters.length) return;
    
    const options = {
      threshold: 0.5,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count') || counter.textContent.replace(/[^0-9]/g, ''), 10);
          let current = 0;
          const increment = target / 50; // سرعت شمارش
          
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.ceil(current).toLocaleString('fa-IR');
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString('fa-IR');
            }
          };
          
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, options);
    
    counters.forEach(counter => observer.observe(counter));
  }

  // ===== 2. اسلایدر برندها با حرکت اتوماتیک =====
  function initBrandsSlider() {
    const track = document.querySelector('.brands-track');
    if (!track) return;
    
    // توقف حرکت با هاور
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
    
    // برای موبایل: کاهش سرعت انیمیشن
    if (window.innerWidth <= 768) {
      track.style.animation = 'scrollBrands 35s linear infinite';
    }
  }

  // ===== 3. گالری با قابلیت کلیک و بزرگ‌نمایی (Lightbox ساده) =====
  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // ایجاد المنت لایت‌باکس
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="" alt="" class="lightbox-image">
        <button class="lightbox-close">&times;</button>
        <button class="lightbox-prev">&#10094;</button>
        <button class="lightbox-next">&#10095;</button>
      </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);
    
    // باز کردن لایت‌باکس
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    function showImage(index) {
      lightboxImg.src = images[index];
      lightboxImg.alt = `تصویر گالری ${index + 1}`;
    }
    
    // بستن لایت‌باکس
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // ناوبری
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });
    
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });
    
    // کیبورد
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      }
    });
  }

  // ===== 4. افکت اسکرول برای تایم‌لاین =====
  function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('timeline-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
  }

  // ===== 5. تنظیم هدر (فعال کردن لینک درباره ما) =====
  function setActiveNav() {
    const navLinks = document.querySelectorAll('.nav__list a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === 'about.html' || 
          link.getAttribute('href') === 'about-us/about.html') {
        link.classList.add('active');
      }
    });
  }

  // ===== 6. ریسپانسیو و تنظیمات ویژه =====
  function handleResponsive() {
    // تنظیم ارتفاع گالری در موبایل
    const galleryLarge = document.querySelector('.gallery-item--large');
    if (window.innerWidth <= 768 && galleryLarge) {
      galleryLarge.style.height = '250px';
    }
  }

  // ===== 7. استایل لایت‌باکس (اضافه کردن CSS) =====
  function addLightboxStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .gallery-lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      
      .gallery-lightbox.active {
        opacity: 1;
        pointer-events: all;
      }
      
      .lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
      }
      
      .lightbox-image {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
      }
      
      .lightbox-close {
        position: absolute;
        top: -40px;
        left: 0;
        background: none;
        border: none;
        color: #fff;
        font-size: 3rem;
        cursor: pointer;
        transition: transform 0.3s ease;
      }
      
      .lightbox-close:hover {
        transform: scale(1.1);
        color: #f5b000;
      }
      
      .lightbox-prev,
      .lightbox-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: #fff;
        font-size: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .lightbox-prev {
        right: 20px;
      }
      
      .lightbox-next {
        left: 20px;
      }
      
      .lightbox-prev:hover,
      .lightbox-next:hover {
        background: #f5b000;
        color: #1f2a3a;
      }
      
      @media (max-width: 768px) {
        .lightbox-close {
          top: 10px;
          left: 10px;
        }
        
        .lightbox-prev,
        .lightbox-next {
          width: 40px;
          height: 40px;
          font-size: 1.5rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== اجرای توابع =====
  initCounters();
  initBrandsSlider();
  initGallery();
  initTimelineAnimation();
  setActiveNav();
  handleResponsive();
  addLightboxStyles();
  
  // گوش دادن به تغییر سایز
  window.addEventListener('resize', () => {
    handleResponsive();
    initBrandsSlider(); // آپدیت اسلایدر برندها
  });
  
  // ===== اضافه کردن کلاس برای انیمیشن تایم‌لاین =====
  const timelineStyle = document.createElement('style');
  timelineStyle.textContent = `
    .timeline-item {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .timeline-item.timeline-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(timelineStyle);
  
  console.log('✅ صفحه درباره ما با موفقیت لود شد - کیان پارس نیرو');
});

// ===== اضافه کردن Schema Markup برای کارمندان =====
const teamSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Person",
        "name": "حسین سبانی",
        "jobTitle": "مدیر عامل",
        "telephone": "+989153147712",
        "email": "h.sabani@kianpars.com",
        "worksFor": {
          "@type": "Organization",
          "name": "کیان پارس نیرو"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Person",
        "name": "مهدی سفرکرده",
        "jobTitle": "مدیر فنی",
        "telephone": "+989151053067",
        "email": "m.safarkordeh@kianpars.com",
        "worksFor": {
          "@type": "Organization",
          "name": "کیان پارس نیرو"
        }
      }
    }
  ]
};

// اضافه کردن به head
const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(teamSchema);
document.head.appendChild(script);