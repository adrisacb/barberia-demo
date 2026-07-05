/* ============================================
   BARBERÍA ROYAL — Interactive Scripts v2.0
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navigation: scroll effect ───
  const nav = document.getElementById('nav');
  const handleNavScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ─── Mobile menu toggle ───
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  const toggleMenu = () => {
    const isActive = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navOverlay.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) toggleMenu();
    });
  });

  // ─── Scroll reveal with Intersection Observer ───
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ─── WhatsApp floating button: show after scroll ───
  const waFloat = document.getElementById('waFloat');
  if (waFloat) {
    const showWaButton = () => {
      waFloat.classList.toggle('visible', window.scrollY > 300);
    };
    window.addEventListener('scroll', showWaButton, { passive: true });
    // Show after a brief delay even without scroll (mobile users may not scroll immediately)
    setTimeout(() => {
      if (!waFloat.classList.contains('visible')) {
        waFloat.classList.add('visible');
      }
    }, 4000);
  }

  // ─── Gallery lightbox ───
  const galleryItems = document.querySelectorAll('.gallery__item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg) {
    galleryItems.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

});
