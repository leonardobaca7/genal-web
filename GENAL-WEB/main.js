/**
 * GENAL — main.js
 * Interactions, animations & UI logic
 */

/* ─── NAVBAR ─────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Scroll effect — glassmorphism
  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // Hamburger toggle
  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Active nav link on scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], div[id="problema"]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.includes(current)) {
        link.classList.add('active');
      }
    });
  }
})();

/* ─── SMOOTH SCROLL ──────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ─── SCROLL REVEAL ──────────────────────────────────────────── */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ─── FAQ ACCORDION ──────────────────────────────────────────── */
(function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          const otherQ = other.querySelector('.faq-question');
          if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', (!isOpen).toString());
    });

    // Keyboard support
    question.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
})();

/* ─── HERO STAGGER ANIMATION ─────────────────────────────────── */
(function initHeroAnimation() {
  // Elements already have .reveal classes — trigger them quickly
  const heroReveals = document.querySelectorAll('.hero .reveal');
  let delay = 0;

  heroReveals.forEach(function (el) {
    setTimeout(function () {
      el.classList.add('revealed');
    }, delay);
    delay += 120;
  });
})();

/* ─── TRUST BAR ANIMATION ────────────────────────────────────── */
(function initTrustBar() {
  const trustItems = document.querySelectorAll('.trust-item');
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          trustItems.forEach(function (item, i) {
            setTimeout(function () {
              item.classList.add('revealed');
            }, i * 80);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const trustBar = document.querySelector('.trust-bar');
  if (trustBar) observer.observe(trustBar);
})();

/* ─── WHATSAPP FLOAT ─────────────────────────────────────────── */
(function initWhatsAppFloat() {
  const floatEl = document.querySelector('.whatsapp-float');
  if (!floatEl) return;

  // Show after slight scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      floatEl.style.opacity = '1';
      floatEl.style.transform = 'translateY(0)';
    } else {
      floatEl.style.opacity = '0';
      floatEl.style.transform = 'translateY(20px)';
    }
  }, { passive: true });

  // Initial state
  floatEl.style.opacity = '0';
  floatEl.style.transform = 'translateY(20px)';
  floatEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
})();

/* ─── FORM SUBMISSION ────────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre  = document.getElementById('form-nombre').value.trim();
    const negocio = document.getElementById('form-negocio').value.trim();
    const correo  = document.getElementById('form-correo').value.trim();
    const wa      = document.getElementById('form-whatsapp').value.trim();
    const tipo    = document.getElementById('form-tipo').value;
    const mensaje = document.getElementById('form-mensaje').value.trim();

    if (!nombre || !negocio || !correo) {
      showFormFeedback('Por favor completa los campos obligatorios.', 'error');
      return;
    }

    if (!isValidEmail(correo)) {
      showFormFeedback('Por favor ingresa un correo válido.', 'error');
      return;
    }

    // Build WhatsApp message
    const lines = [
      'Hola GENAL, me llegó a través de su web.',
      '',
      '*Nombre:* ' + nombre,
      '*Negocio:* ' + negocio,
      '*Correo:* ' + correo,
    ];
    if (wa)      lines.push('*WhatsApp:* ' + wa);
    if (tipo)    lines.push('*Tipo de negocio:* ' + tipo);
    if (mensaje) lines.push('*Mensaje:* ' + mensaje);

    const waMessage = encodeURIComponent(lines.join('\n'));
    const waUrl = 'https://wa.me/51999999999?text=' + waMessage;

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    showFormFeedback('¡Perfecto! Abriendo WhatsApp para continuar...', 'success');
    form.reset();
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormFeedback(message, type) {
    let feedback = form.querySelector('.form-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'form-feedback';
      feedback.style.cssText = [
        'margin-top: 0.75rem',
        'padding: 0.75rem 1rem',
        'border-radius: 0.5rem',
        'font-size: 0.875rem',
        'font-weight: 500',
        'transition: all 0.3s ease',
      ].join(';');
      form.appendChild(feedback);
    }

    feedback.textContent = message;
    if (type === 'success') {
      feedback.style.background = 'rgba(39, 201, 63, 0.12)';
      feedback.style.border = '1px solid rgba(39, 201, 63, 0.3)';
      feedback.style.color = '#27C93F';
    } else {
      feedback.style.background = 'rgba(255, 59, 48, 0.1)';
      feedback.style.border = '1px solid rgba(255, 59, 48, 0.3)';
      feedback.style.color = '#FF6B6B';
    }

    setTimeout(function () {
      feedback.remove();
    }, 5000);
  }
})();

/* ─── BUTTON RIPPLE EFFECT ───────────────────────────────────── */
(function initButtonRipple() {
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'background:rgba(255,255,255,0.15)',
        'transform:scale(0)',
        'animation:ripple-anim 0.5s linear',
        'pointer-events:none',
        'width:100px',
        'height:100px',
        'left:' + (x - 50) + 'px',
        'top:' + (y - 50) + 'px',
      ].join(';');

      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);

      setTimeout(function () { ripple.remove(); }, 600);
    });
  });

  // Add keyframes once
  const style = document.createElement('style');
  style.textContent = '@keyframes ripple-anim { to { transform:scale(4); opacity:0; } }';
  document.head.appendChild(style);
})();

/* ─── PARALLAX (Subtle hero BG) ─────────────────────────────── */
(function initParallax() {
  const glow1 = document.querySelector('.hero-glow-1');
  const glow2 = document.querySelector('.hero-glow-2');
  if (!glow1 || !glow2) return;

  // Only if no reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    glow1.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
    glow2.style.transform = 'translateY(' + (-scrollY * 0.1) + 'px)';
  }, { passive: true });
})();

/* ─── PROJECT CARD FOCUS TRAP (accessibility) ────────────────── */
(function initProjectCards() {
  document.querySelectorAll('.project-visual a').forEach(function (link) {
    link.addEventListener('focus', function () {
      const overlay = this.querySelector('.project-overlay');
      if (overlay) overlay.style.opacity = '1';
    });
    link.addEventListener('blur', function () {
      const overlay = this.querySelector('.project-overlay');
      if (overlay) overlay.style.opacity = '';
    });
  });
})();

/* ─── PRICING CARD HOVER EFFECT ──────────────────────────────── */
(function initPricingHover() {
  document.querySelectorAll('.pricing-card:not(.featured)').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.style.borderColor = 'rgba(0, 212, 255, 0.25)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.borderColor = '';
    });
  });
})();

/* ─── NAV LINK UNDERLINE ANIMATION ──────────────────────────── */
(function initNavLinkEffect() {
  document.querySelectorAll('.nav-link').forEach(function(link) {
    link.style.position = 'relative';
    link.style.overflow = 'hidden';
  });
})();

/* ─── INIT DONE ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  console.log('%c GENAL Studio ', 'background:#00D4FF;color:#08080E;font-weight:900;font-size:14px;padding:4px 8px;border-radius:4px;');
  console.log('%c Tu próxima web empieza aquí. ', 'color:#9898B8;font-size:12px;');
});
