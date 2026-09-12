import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';

const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
window.lenis = lenis; // Export to window for other scripts to use

document.addEventListener('DOMContentLoaded', () => {
  // 1. Swiper Slider Initialization (Hero)
  const swiperElement = document.querySelector('.heroSwiper');
  if (swiperElement) {
    const heroSwiper = new Swiper('.heroSwiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: { delay: 3000, disableOnInteraction: false },
      speed: 1000,
      on: {
        realIndexChange: function () {
          updateHeroDots(this.realIndex);
        }
      }
    });

    function updateHeroDots(activeIndex) {
  document.querySelectorAll('.hero-dot').forEach(function (dot, i) {
    var circle = dot.querySelector('.hero-dot-circle');
    if (i === activeIndex) {
      circle.style.width = '14px';
      circle.style.height = '14px';
      circle.style.background = 'white';
      circle.style.borderColor = 'white';
    } else {
      circle.style.width = '10px';
      circle.style.height = '10px';
      circle.style.background = 'rgba(255,255,255,0.2)';
      circle.style.borderColor = 'rgba(255,255,255,0.4)';
    }
  });
}

    window.heroGoTo = function (index) {
      heroSwiper.slideToLoop(index);
    };

    updateHeroDots(0);
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

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open') && !dropdown.classList.contains('hidden');
      if (isOpen) closeMenu(); else openMenu();
    });

    document.addEventListener('click', e => {
      if (wrapper && !wrapper.contains(e.target)) closeMenu();
    });
  };

  // Initialize dropdown toggles
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
  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // 4. Mobile Accordion Toggles (submenus)
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
            const otherChevron = otherBtn.querySelector('.fa-chevron-down');
            if (otherChevron) otherChevron.classList.remove('rotate-180');
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

  // 5. Timeline Animation - Line + dot + name + year সব একসাথে নিচ থেকে উঠবে
const timelineObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const lines = entry.target.querySelectorAll('.timeline-line');
      lines.forEach((line, i) => {
        setTimeout(() => {
          line.style.transform = 'scaleY(1)';
          line.style.opacity = '1';
          const content = line.querySelector('.timeline-content');
          if (content) {
            content.classList.remove('opacity-0', 'translate-y-full');
            content.classList.add('opacity-100', 'translate-y-0');
          }
          const yearEl = line.querySelector('.year-count');
          if (yearEl) {
            const target = parseInt(yearEl.dataset.target);
            let current = target - 30;
            const step = () => {
              current += 1;
              yearEl.textContent = current;
              if (current < target) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        }, i * 250);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const timelineContainer = document.getElementById('timeline-container');
if (timelineContainer) timelineObserver.observe(timelineContainer);

  // 6. Founder Section Animation
  const founderObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = document.getElementById('founder-img');
        const text = document.getElementById('founder-text');
        if (img) { img.classList.remove('opacity-0', '-translate-y-full'); img.classList.add('opacity-100', 'translate-y-0'); }
        if (text) { text.classList.remove('opacity-0', 'translate-y-full'); text.classList.add('opacity-100', 'translate-y-0'); }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  // 6. Founder Section Animation - image left থেকে, text right থেকে
  const founderSection = document.getElementById('founder-section');
  if (founderSection) {
    const img = document.getElementById('founder-img');
    const text = document.getElementById('founder-text');

    if (img) {
      img.style.opacity = '0';
      img.style.transform = 'translateX(-80px)';
      img.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    }
    if (text) {
      text.style.opacity = '0';
      text.style.transform = 'translateX(80px)';
      text.style.transition = 'opacity 0.9s ease, transform 0.9s ease 0.2s';
    }

    const founderObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (img) { img.style.opacity = '1'; img.style.transform = 'translateX(0)'; }
          if (text) { text.style.opacity = '1'; text.style.transform = 'translateX(0)'; }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    founderObserver.observe(founderSection);
  }

  // 8. Reveal Left Wipe Animation (adds 'active' class)
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.reveal-left-wipe, .reveal-left, .award-card, .scale-in-ver-bottom')
    .forEach(el => revealObserver.observe(el));

  // 8. CSR Swiper (if present)
  if (document.querySelector('.csr-swiper')) {
    new Swiper('.csr-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 4000,
      autoplay: { delay: 0, disableOnInteraction: false },
      breakpoints: { 768: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 2, spaceBetween: 30 } },
    });
  }

  // 9. Purpose Cards Animation
  const purposeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.purpose-text-animate').forEach(card => purposeObserver.observe(card));

  // Counter + circular progress-ring animation
  // Observes .impact-circle wrappers — fires after section becomes visible
  const TOTAL_FRAMES = 120; // ~2 seconds at 60fps
  const CIRCUMFERENCE = 565.48;

  const impactObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const wrapper = entry.target;
      const counterEl = wrapper.querySelector('.counter');
      const ring = wrapper.querySelector('.progress-ring');
      const percent = parseFloat(wrapper.dataset.percent) || 0;
      const target = counterEl ? parseInt(counterEl.dataset.target) : 0;

      // Final stroke offset: how much of the ring to fill
      const finalOffset = CIRCUMFERENCE - (CIRCUMFERENCE * percent / 100);

      let frame = 0;
      const animate = () => {
        frame++;
        const progress = Math.min(frame / TOTAL_FRAMES, 1);
        // ease-out quad
        const eased = 1 - (1 - progress) * (1 - progress);

        // Update number
        if (counterEl) {
          counterEl.textContent = Math.round(eased * target).toLocaleString();
        }

        // Update ring stroke
        if (ring) {
          const currentOffset = CIRCUMFERENCE - (CIRCUMFERENCE - finalOffset) * eased;
          ring.setAttribute('stroke-dashoffset', currentOffset);
        }

        if (frame < TOTAL_FRAMES) {
          requestAnimationFrame(animate);
        } else {
          // Lock final values
          if (counterEl) counterEl.textContent = target.toLocaleString();
          if (ring) ring.setAttribute('stroke-dashoffset', finalOffset);
        }
      };

      animate();
      observer.unobserve(wrapper);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.impact-circle').forEach(el => impactObserver.observe(el));
});

// ====== SCROLL PARALLAX EFFECT ======
(function () {
  const els = document.querySelectorAll('.scroll-move');
  if (!els.length) return;
  els.forEach(el => {
    const speed = parseFloat(el.dataset.speed ?? 0.15);
    const maxMove = el.dataset.maxMove ? parseFloat(el.dataset.maxMove) : Infinity;
    const rawAxis = (el.dataset.axis ?? 'Y').toUpperCase().trim();
    const isNegative = rawAxis.startsWith('-');
    const baseAxis = rawAxis.replace('-', '');
    const dirMultiplier = isNegative ? -1 : 1;
    const lerp = parseFloat(el.dataset.lerp ?? 0.08);
    let initialOffset = 0;
    let target = 0;
    let current = 0;
    let rafId = null;
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
        rafId = null;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      applyTranslate(current);
    }
    function onScroll(scrollPos) {
      let newTarget = -(scrollPos - initialOffset) * speed;
      if (maxMove !== Infinity) newTarget = Math.max(-maxMove, Math.min(maxMove, newTarget));
      target = newTarget;
      if (!rafId) rafId = requestAnimationFrame(tick);
    }
    calculateOffset();
    const startScroll = window.scrollY;
    let initialTarget = -(startScroll - initialOffset) * speed;
    if (maxMove !== Infinity) initialTarget = Math.max(-maxMove, Math.min(maxMove, initialTarget));
    target = initialTarget;
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
