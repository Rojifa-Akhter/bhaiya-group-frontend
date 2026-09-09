import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
window.lenis = lenis; // Export to window for other scripts to use
document.addEventListener('DOMContentLoaded', () => {
  // 1. Swiper Slider Initialization
  const swiperElement = document.querySelector('.heroSwiper');
  if (swiperElement) {
    const swiper = new Swiper('.heroSwiper', {
      loop: true,
      effect: 'fade', 
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 1000
    });
  }

  // 2. Dropdown Logic with Animated Expand & Indicator
  const closeAllMenus = (exceptDropdownId) => {
    document.querySelectorAll('[id$="-dropdown"]').forEach(drop => {
      if (drop.id !== exceptDropdownId) {
        drop.classList.remove('open');
        setTimeout(() => {
          if (!drop.classList.contains('open')) {
            drop.classList.add('hidden');
          }
        }, 200);
      }
    });
    document.querySelectorAll('[id$="-indicator"]').forEach(ind => {
      const prefix = ind.id.replace('-indicator', '');
      if (!exceptDropdownId || !exceptDropdownId.startsWith(prefix)) {
        ind.classList.remove('open');
        setTimeout(() => {
          if (!ind.classList.contains('open')) {
            ind.classList.add('hidden');
          }
        }, 200);
      }
    });
  };

  const setupToggle = (toggleId, dropdownId, wrapperId, indicatorId) => {
    const toggle = document.getElementById(toggleId);
    const dropdown = document.getElementById(dropdownId);
    const wrapper = document.getElementById(wrapperId);
    const indicator = document.getElementById(indicatorId);

    if (!toggle || !dropdown) return;

    const openMenu = () => {
      closeAllMenus(dropdownId);

      if (indicator) {
        indicator.classList.remove('hidden');
        void indicator.offsetWidth;
        indicator.classList.add('open');
      }

      dropdown.classList.remove('hidden');
      void dropdown.offsetWidth;
      dropdown.classList.add('open');
    };

    const closeMenu = () => {
      if (indicator) {
        indicator.classList.remove('open');
        setTimeout(() => {
          if (!indicator.classList.contains('open')) {
            indicator.classList.add('hidden');
          }
        }, 200);
      }

      dropdown.classList.remove('open');
      setTimeout(() => {
        if (!dropdown.classList.contains('open')) {
          dropdown.classList.add('hidden');
        }
      }, 200);
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open') && !dropdown.classList.contains('hidden');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener('click', (e) => {
      if (wrapper && !wrapper.contains(e.target)) {
        closeMenu();
      }
    });
  };

  setupToggle('about-toggle', 'about-dropdown', 'about-menu-wrapper', 'about-indicator');
  setupToggle('concern-toggle', 'concern-dropdown', 'concern-menu-wrapper', 'concern-indicator');
  setupToggle('media-toggle', 'media-dropdown', 'media-menu-wrapper', 'media-indicator');

  // 3. Mobile Navigation Drawer Logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-drawer-overlay');
  const mobileCloseBtn = document.getElementById('mobile-drawer-close');

  const openMobileMenu = () => {
    if (!mobileDrawer || !mobileOverlay) return;
    mobileOverlay.classList.remove('pointer-events-none', 'opacity-0');
    mobileOverlay.classList.add('opacity-100');
    mobileDrawer.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (!mobileDrawer || !mobileOverlay) return;
    mobileOverlay.classList.remove('opacity-100');
    mobileOverlay.classList.add('opacity-0', 'pointer-events-none');
    mobileDrawer.classList.add('translate-x-full');
    document.body.style.overflow = '';
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Mobile Accordion toggles for submenus
  document.querySelectorAll('.mobile-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      const chevron = btn.querySelector('.fa-chevron-down');
      if (!targetContent) return;

      const isClosed = targetContent.classList.contains('hidden');

      // Close other accordions
      document.querySelectorAll('[id^="mobile-"][id$="-menu"]').forEach(menu => {
        if (menu.id !== targetId) {
          menu.classList.add('hidden');
          const otherBtn = document.querySelector(`[data-target="${menu.id}"]`);
          if (otherBtn) {
            const otherChev = otherBtn.querySelector('.fa-chevron-down');
            if (otherChev) otherChev.classList.remove('rotate-180');
          }
        }
      });

      if (isClosed) {
        targetContent.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
      } else {
        targetContent.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
      }
    });
  });

  // 4. Timeline Animation
  const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find all timeline contents inside the container
        const contents = entry.target.querySelectorAll('.timeline-content');
        contents.forEach(content => {
          content.classList.remove('translate-y-full', 'translate-y-12', 'opacity-0');
          content.classList.add('translate-y-0', 'opacity-100');
        });
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const timelineContainer = document.getElementById('timeline-container');
  if (timelineContainer) {
    timelineObserver.observe(timelineContainer);
  }

  // 5. Founder Section Animation
  const founderObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = document.getElementById('founder-img');
        const text = document.getElementById('founder-text');
        
        if (img) {
          img.classList.remove('opacity-0', '-translate-y-full');
          img.classList.add('opacity-100', 'translate-y-0');
        }
        if (text) {
          text.classList.remove('opacity-0', 'translate-y-full');
          text.classList.add('opacity-100', 'translate-y-0');
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const founderSection = document.getElementById('founder-section');
  if (founderSection) {
    founderObserver.observe(founderSection);
  }

  // 6. Awards Legacy Animation
  const awardsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.award-card, .reveal-left-wipe').forEach(card => {
    awardsObserver.observe(card);
  });

  // 7. CSR Swiper
  if (document.querySelector('.csr-swiper')) {
    new Swiper('.csr-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 4000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
    });
  }

  // 8. Purpose Cards Animation
  const purposeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.purpose-text-animate').forEach(card => {
    purposeObserver.observe(card);
  });
});

// ====== SCROLL PARALLAX EFFECT ======
(function () {
    const els = document.querySelectorAll('.scroll-move');
    if (!els.length) return;

    els.forEach(el => {
        const speed = parseFloat(el.dataset.speed ?? 0.15);

        const rawAxis = (el.dataset.axis ?? 'Y').toUpperCase().trim();
        const isNegative = rawAxis.startsWith('-');
        const baseAxis = rawAxis.replace('-', '');
        const dirMultiplier = isNegative ? -1 : 1;

        const lerp  = parseFloat(el.dataset.lerp ?? 0.08);

        let initialOffset = 0;
        let target  = 0;
        let current = 0;
        let rafId   = null;

        function calculateOffset() {
            el.style.translate = 'none';

            const rect = el.getBoundingClientRect();

            const windowCenterY = window.innerHeight / 2;
            const elementCenterY = rect.height / 2;
            const absolutePosY = rect.top + window.scrollY;

            initialOffset = absolutePosY - windowCenterY + elementCenterY;
        }

        function applyTranslate(value) {
            const finalValue = value * dirMultiplier;

            if (baseAxis === 'X') {
                el.style.translate = `${finalValue}px 0px`;
            } else {
                el.style.translate = `0px ${finalValue}px`;
            }
        }

        function tick() {
            current += (target - current) * lerp;

            if (Math.abs(target - current) < 0.01) {
                current = target;
                rafId   = null;
            } else {
                rafId = requestAnimationFrame(tick);
            }

            applyTranslate(current);
        }

        function onScroll(scrollPos) {
            target = -(scrollPos - initialOffset) * speed;
            if (!rafId) rafId = requestAnimationFrame(tick);
        }

        calculateOffset();

        const startScroll = window.scrollY;
        target = -(startScroll - initialOffset) * speed;
        current = target;

        applyTranslate(current);

        if (typeof lenis !== 'undefined') {
            lenis.on('scroll', ({ scroll }) => onScroll(scroll));
        } else {
            window.addEventListener('scroll', () => onScroll(window.scrollY));
        }

        window.addEventListener('resize', () => {
            calculateOffset();
            onScroll(window.scrollY);
        });
    });
})();


