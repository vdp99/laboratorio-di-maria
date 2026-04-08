/* ============================================================
   IL LABORATORIO DI MARIA — Main JS (GSAP Animations)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky header ────────────────────────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── Mobile menu ──────────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const closeBtn  = document.querySelector('.nav-mobile-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeMobile = () => {
    if (mobileNav) {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeMobile);
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));
  }

  // ── GSAP + ScrollTrigger ──────────────────────────────────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    const heroEyebrow = document.querySelector('.hero-eyebrow');
    const heroH1      = document.querySelector('.hero h1');
    const heroLead    = document.querySelector('.hero .lead');
    const heroActions = document.querySelector('.hero-actions');

    if (heroH1) {
      gsap.timeline({ delay: 0.3 })
        .to(heroEyebrow, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .to(heroH1,      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to(heroLead,    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to(heroActions, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    }

    // Fade up on scroll
    gsap.utils.toArray('.fade-up').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Fade in on scroll
    gsap.utils.toArray('.fade-in').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Slide animations
    gsap.utils.toArray('.slide-left').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    gsap.utils.toArray('.slide-right').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Staggered grid items
    gsap.utils.toArray('.stagger-group').forEach(group => {
      const items = group.querySelectorAll('.stagger-item');
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Parallax hero bg
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Number counter animation
    gsap.utils.toArray('.stat-number').forEach(el => {
      const target = parseInt(el.dataset.target || el.innerText, 10);
      gsap.from(el, {
        textContent: 0,
        duration: 1.5,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

  } else {
    // Fallback: make everything visible immediately
    document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right, .stagger-item').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    const heroEls = document.querySelectorAll('.hero-eyebrow, .hero h1, .hero .lead, .hero-actions');
    heroEls.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  }

  // ── Active nav link ───────────────────────────────────────
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

});
