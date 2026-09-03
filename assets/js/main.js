/**
 * DriveMaster - Main JavaScript
 * Handles theme, mobile nav, form validation, and common interactions
 */

(function () {
  'use strict';

  // ============================================
  // Theme Management
  // ============================================
  const ThemeManager = {
    init() {
      const saved = localStorage.getItem('drivemaster-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = saved || (prefersDark ? 'dark' : 'light');
      this.setTheme(theme);
      this.bindToggle();
    },

    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('drivemaster-theme', theme);
    },

    toggle() {
      const current = document.documentElement.getAttribute('data-theme');
      this.setTheme(current === 'dark' ? 'light' : 'dark');
    },

    bindToggle() {
      document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
        btn.addEventListener('click', () => this.toggle());
      });
    },
  };

  // ============================================
  // Mobile Navigation
  // ============================================
  const MobileNav = {
    init() {
      const openBtn = document.querySelector('[data-mobile-menu-open]');
      const closeBtn = document.querySelector('[data-mobile-menu-close]');
      const nav = document.querySelector('[data-mobile-nav]');
      const overlay = document.querySelector('[data-mobile-overlay]');

      if (!nav) return;

      const open = () => {
        nav.classList.add('open');
        document.body.style.overflow = 'hidden';
      };

      const close = () => {
        nav.classList.remove('open');
        document.body.style.overflow = '';
      };

      openBtn?.addEventListener('click', open);
      closeBtn?.addEventListener('click', close);
      overlay?.addEventListener('click', close);

      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
      });

      // Close when clicking a link
      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', close);
      });
    },
  };

  // ============================================
  // Header Scroll Effect
  // ============================================
  const HeaderScroll = {
    init() {
      const header = document.querySelector('.header');
      if (!header) return;

      const onScroll = () => {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    },
  };

  // ============================================
  // Form Validation
  // ============================================
  const FormValidator = {
    init() {
      document.querySelectorAll('[data-validate]').forEach((form) => {
        form.addEventListener('submit', (e) => this.handleSubmit(e, form));
        form.querySelectorAll('input, select, textarea').forEach((field) => {
          field.addEventListener('blur', () => this.validateField(field));
          field.addEventListener('input', () => {
            if (field.closest('.form-group')?.classList.contains('has-error')) {
              this.validateField(field);
            }
          });
        });
      });
    },

    validateField(field) {
      const group = field.closest('.form-group');
      if (!group) return true;

      let valid = true;
      let message = '';

      if (field.hasAttribute('required') && !field.value.trim()) {
        valid = false;
        message = field.dataset.errorRequired || 'This field is required.';
      } else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          valid = false;
          message = field.dataset.errorEmail || 'Please enter a valid email address.';
        }
      } else if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\d\s\-+()]{7,}$/;
        if (!phoneRegex.test(field.value)) {
          valid = false;
          message = field.dataset.errorPhone || 'Please enter a valid phone number.';
        }
      } else if (field.minLength && field.value.length < field.minLength) {
        valid = false;
        message = `Minimum ${field.minLength} characters required.`;
      }

      if (valid) {
        group.classList.remove('has-error');
      } else {
        group.classList.add('has-error');
        const errorEl = group.querySelector('.form-error');
        if (errorEl) errorEl.textContent = message;
      }

      return valid;
    },

    handleSubmit(e, form) {
      let isValid = true;
      form.querySelectorAll('input, select, textarea').forEach((field) => {
        if (!this.validateField(field)) isValid = false;
      });

      if (!isValid) {
        e.preventDefault();
        const firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
        firstError?.focus();
      } else {
        // For demo: prevent actual submit and show success
        if (form.dataset.demo === 'true') {
          e.preventDefault();
          const successMsg = form.querySelector('[data-form-success]');
          if (successMsg) {
            successMsg.style.display = 'block';
            form.reset();
            setTimeout(() => {
              successMsg.style.display = 'none';
            }, 5000);
          } else {
            alert('Form submitted successfully! (Demo mode)');
          }
        }
      }
    },
  };

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const id = anchor.getAttribute('href');
          if (id === '#') return;
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    },
  };

  // ============================================
  // Counter Animation (for stats)
  // ============================================
  const CounterAnimation = {
    init() {
      const counters = document.querySelectorAll('[data-counter]');
      if (!counters.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animate(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      counters.forEach((el) => observer.observe(el));
    },

    animate(el) {
      const target = parseInt(el.dataset.counter, 10);
      const duration = 1500;
      const start = performance.now();
      const suffix = el.dataset.suffix || '';

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    },
  };

  // ============================================
  // Initialize Everything
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    MobileNav.init();
    HeaderScroll.init();
    FormValidator.init();
    SmoothScroll.init();
    CounterAnimation.init();
  });

  // Expose for external use if needed
  window.DriveMaster = {
    ThemeManager,
    FormValidator,
  };
})();

  // Scroll reveal animations
  document.addEventListener('DOMContentLoaded', function () {
    var els = document.querySelectorAll('.anim-fade-up, .anim-fade-in, .anim-scale');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });

    // Mobile: toggle Home dropdown
    document.querySelectorAll('[data-dropdown-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var parent = btn.closest('.nav-item-dropdown') || btn.parentElement;
        parent.classList.toggle('open');
      });
    });
  });
