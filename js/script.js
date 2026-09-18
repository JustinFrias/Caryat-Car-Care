// Caryat Car Care - Client Interactions & Customer Utilities
document.addEventListener('DOMContentLoaded', function () {
  // ---------- 1. MOBILE NAV TOGGLE ----------
  const navlinks = document.getElementById('navlinks');
  const menuToggle = document.getElementById('menuToggle');

  if (menuToggle && navlinks) {
    menuToggle.addEventListener('click', function () {
      navlinks.classList.toggle('mobile-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navlinks.contains(e.target) && !menuToggle.contains(e.target) && navlinks.classList.contains('mobile-open')) {
        navlinks.classList.remove('mobile-open');
      }
    });
  }

  // ---------- 2. SERVICES PAGE: INSTANT SEARCH & CATEGORY FILTER ----------
  const serviceCards = document.querySelectorAll('.service-card');
  const searchInput = document.getElementById('serviceSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const emptyState = document.getElementById('servicesEmpty');
  const emptyQuerySpan = document.getElementById('emptyQueryText');

  if (serviceCards.length > 0 && searchInput) {
    let currentCategory = 'all';
    let currentSearchTerm = '';

    function filterServices() {
      let visibleCount = 0;
      const term = currentSearchTerm.trim().toLowerCase();

      serviceCards.forEach(function (card) {
        const cardCategory = card.getAttribute('data-category') || '';
        const cardText = card.textContent.toLowerCase();

        const matchesCategory = (currentCategory === 'all') || (cardCategory.includes(currentCategory));
        const matchesSearch = !term || cardText.includes(term);

        if (matchesCategory && matchesSearch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.classList.add('active');
          if (emptyQuerySpan) emptyQuerySpan.textContent = term ? `"${currentSearchTerm}"` : 'the selected filter';
        } else {
          emptyState.classList.remove('active');
        }
      }
    }

    searchInput.addEventListener('input', function () {
      currentSearchTerm = searchInput.value;
      if (searchClearBtn) {
        if (currentSearchTerm.length > 0) {
          searchClearBtn.classList.add('active');
        } else {
          searchClearBtn.classList.remove('active');
        }
      }
      filterServices();
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', function () {
        searchInput.value = '';
        currentSearchTerm = '';
        searchClearBtn.classList.remove('active');
        searchInput.focus();
        filterServices();
      });
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-filter') || 'all';
        filterServices();
      });
    });
  }

  // ---------- 3. CONTACT PAGE: AUTO-SELECT SERVICE FROM URL ----------
  const contactForm = document.getElementById('contactForm');
  const serviceSelect = document.getElementById('fservice');
  const formSuccess = document.getElementById('formSuccess');

  if (serviceSelect) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const requestedService = urlParams.get('service');

      if (requestedService) {
        const targetClean = requestedService.trim().toLowerCase();
        for (let i = 0; i < serviceSelect.options.length; i++) {
          const opt = serviceSelect.options[i];
          if (opt.text.toLowerCase().includes(targetClean) || targetClean.includes(opt.text.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            serviceSelect.classList.add('highlight-field');
            setTimeout(function () {
              serviceSelect.classList.remove('highlight-field');
            }, 3000);
            break;
          }
        }

        // Scroll to form smoothly
        const formCard = document.querySelector('.form-card');
        if (formCard) {
          setTimeout(function () {
            formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        }
      }
    } catch (err) {
      console.warn('Could not parse URL query:', err);
    }
  }

  // ---------- 4. CONTACT PAGE: DYNAMIC WHATSAPP INQUIRY GENERATOR ----------
  const waDirectBtn = document.getElementById('waDirectBtn');
  const fnameInput = document.getElementById('fname');
  const fphoneInput = document.getElementById('fphone');
  const fmakeInput = document.getElementById('fmake');
  const fmodelInput = document.getElementById('fmodel');
  const fmsgInput = document.getElementById('fmsg');

  if (waDirectBtn) {
    function updateWhatsAppLink() {
      const name = fnameInput ? fnameInput.value.trim() : '';
      const phone = fphoneInput ? fphoneInput.value.trim() : '';
      const make = fmakeInput ? fmakeInput.value.trim() : '';
      const model = fmodelInput ? fmodelInput.value.trim() : '';
      const service = serviceSelect ? serviceSelect.value : '';
      const msg = fmsgInput ? fmsgInput.value.trim() : '';

      let text = 'Hello Caryat Car Care, I would like to inquire about auto service:';
      if (name) text += `\nName: ${name}`;
      if (phone) text += `\nContact: ${phone}`;
      if (make || model) text += `\nVehicle: ${make} ${model}`.trim();
      if (service) text += `\nService: ${service}`;
      if (msg) text += `\nDetails: ${msg}`;

      const baseUrl = 'https://wa.me/971500000000';
      waDirectBtn.href = `${baseUrl}?text=${encodeURIComponent(text)}`;
    }

    // Attach listeners so WhatsApp button updates as customer types
    [fnameInput, fphoneInput, fmakeInput, fmodelInput, serviceSelect, fmsgInput].forEach(function (el) {
      if (el) {
        el.addEventListener('input', updateWhatsAppLink);
        el.addEventListener('change', updateWhatsAppLink);
      }
    });

    waDirectBtn.addEventListener('click', updateWhatsAppLink);
  }

  // ---------- 5. FORM SUBMISSION HANDLER ----------
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (formSuccess) {
        formSuccess.classList.add('show');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      contactForm.reset();
    });
  }

  // ---------- 6. SMOOTH SCROLL REVEAL OBSERVER ----------
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealTargets = document.querySelectorAll(
      '.service-card, .info-card, .form-card, .strip-item, .cta-banner, .services-toolbar'
    );

    revealTargets.forEach(function (el) {
      el.classList.add('reveal-init');
    });

    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }
});

