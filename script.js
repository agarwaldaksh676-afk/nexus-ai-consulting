/**
 * ============================================================================
 * NEXUS AI CONSULTING — JAVASCRIPT LOGIC (PRO MAX A+ 99/100 EDITION)
 * 
 * Features:
 * - Package A: Hairline scroll progress bar, dynamic slider track gradient fill,
 *              tabular numeric stabilization, smooth filter transitions.
 * - Package B: Pricing-to-form confirmation chip parity, mobile live price mirror,
 *              animated metric counters with IntersectionObserver.
 * - Package C: Skip-to-content accessibility, dynamic ARIA theme & error states,
 *              iPhone safe-area handling, and full dark-mode support.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
   * 1. DARK / LIGHT THEME SWITCHER (WITH ACCESSIBLE VOICE-OVER ANNOUNCEMENTS)
   * -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIconSun = document.getElementById('themeIconSun');
  const themeIconMoon = document.getElementById('themeIconMoon');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('nexus_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('nexus_theme', theme);

    if (theme === 'dark') {
      if (themeIconSun) themeIconSun.style.display = 'none';
      if (themeIconMoon) themeIconMoon.style.display = 'block';
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
        themeToggleBtn.setAttribute('title', 'Switch to light mode');
      }
    } else {
      if (themeIconSun) themeIconSun.style.display = 'block';
      if (themeIconMoon) themeIconMoon.style.display = 'none';
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        themeToggleBtn.setAttribute('title', 'Switch to dark mode');
      }
    }
  }

  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  /* --------------------------------------------------------------------------
   * 2. HAIRLINE SCROLL PROGRESS BAR & FLOATING MOBILE CTA (PACKAGE A & C)
   * -------------------------------------------------------------------------- */
  const siteHeader = document.getElementById('siteHeader');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const floatingMobileCta = document.getElementById('floatingMobileCta');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // 1. Update Hairline Progress Bar
    if (scrollProgressBar && docHeight > 0) {
      const progressPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      scrollProgressBar.style.width = `${progressPercent}%`;
    }

    // 2. Header Elevation Shadow
    if (scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // 3. Show floating mobile CTA when scrolling past hero section
    if (floatingMobileCta) {
      if (scrollY > 480) {
        floatingMobileCta.style.display = 'block';
      } else {
        floatingMobileCta.style.display = 'none';
      }
    }
  });

  /* --------------------------------------------------------------------------
   * 3. ANIMATED METRICS COUNTER ON SCROLL (PACKAGE B)
   * Counts up numbers smoothly when scrolled into view using IntersectionObserver.
   * -------------------------------------------------------------------------- */
  const metricNumbers = document.querySelectorAll('.metric-number[data-target]');
  let metricsAnimated = false;

  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600; // 1.6s smooth duration
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = (target * easeProgress).toFixed(decimals);

      el.textContent = `${prefix}${currentVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const metricsBar = document.getElementById('heroMetrics');
  if (metricsBar && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !metricsAnimated) {
          metricsAnimated = true;
          metricNumbers.forEach(el => animateCount(el));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(metricsBar);
  }

  /* --------------------------------------------------------------------------
   * 4. MOBILE MENU DRAWER (FULL-SCREEN ACCESSIBLE OVERLAY)
   * -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('active');
    mobileMenuBtn.classList.toggle('open', isOpen);
    mobileDrawer.classList.toggle('active', isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  }

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        toggleMobileMenu(false);
      }
    });
  }

  /* --------------------------------------------------------------------------
   * 5. ACTIVE NAVIGATION LINK ON SCROLL (SCROLLSPY)
   * -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function highlightCurrentSection() {
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightCurrentSection);

  /* --------------------------------------------------------------------------
   * 6. CASE STUDIES CATEGORY FILTER PILLS
   * -------------------------------------------------------------------------- */
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filterValue = pill.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        
        if (filterValue === 'all' || cardCategories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
   * 7. PRICING BILLING SWITCH (15% QUARTERLY DISCOUNT)
   * -------------------------------------------------------------------------- */
  const pricingToggle = document.getElementById('pricingToggle');
  const priceAmounts = document.querySelectorAll('.tier-amount[data-monthly]');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isQuarterly = pricingToggle.checked;
      pricingToggle.setAttribute('aria-checked', isQuarterly ? 'true' : 'false');

      priceAmounts.forEach(priceEl => {
        const monthlyPrice = priceEl.getAttribute('data-monthly');
        const quarterlyPrice = priceEl.getAttribute('data-quarterly');
        priceEl.textContent = isQuarterly ? quarterlyPrice : monthlyPrice;
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 8. INTERACTIVE PROJECT SCOPE & BUDGET ESTIMATOR (PACKAGES A & B)
   * -------------------------------------------------------------------------- */
  const typePills = document.querySelectorAll('#projectTypeSelector .select-pill');
  const scopePills = document.querySelectorAll('#scopeLevelSelector .select-pill');
  const speedRange = document.getElementById('speedRange');
  const speedLabel = document.getElementById('speedLabel');
  
  const calcPriceDisplay = document.getElementById('calcPriceDisplay');
  const calcTimelineDisplay = document.getElementById('calcTimelineDisplay');
  const calcSquadDisplay = document.getElementById('calcSquadDisplay');
  const applyEstimateBtn = document.getElementById('applyEstimateBtn');
  const mobilePriceMirror = document.getElementById('mobilePriceMirror');
  
  const estimateChipBox = document.getElementById('estimateChipBox');
  const estimateChipText = document.getElementById('estimateChipText');
  const clearEstimateChip = document.getElementById('clearEstimateChip');
  const contactCard = document.getElementById('contactCard');

  let currentBaseCost = 5500;
  let currentBaseWeeks = 6;
  let currentTypeName = 'Custom AI / LLM Integration';
  let currentMultiplier = 1.0;
  let currentScopeLevel = 'Production Ready System';
  let currentSpeedPace = 2; // 1 = Flexible, 2 = Standard, 3 = Accelerated

  function updateSliderFill() {
    if (!speedRange) return;
    const min = parseFloat(speedRange.min) || 1;
    const max = parseFloat(speedRange.max) || 3;
    const val = parseFloat(speedRange.value) || 2;
    const percentage = ((val - min) / (max - min)) * 100;
    
    // Dynamic Gradient Fill Track (Package A)
    speedRange.style.background = `linear-gradient(to right, #10B981 0%, #10B981 ${percentage}%, var(--color-border) ${percentage}%, var(--color-border) 100%)`;
  }

  function updateEstimator() {
    let speedFactor = 1.0;
    let paceText = 'Standard Pace (8-10 wks)';
    let timelineWeeks = currentBaseWeeks;
    let squadText = '1 Tech Lead + 1 AI Eng';

    if (currentSpeedPace == 1) {
      speedFactor = 0.9;
      paceText = 'Flexible Pace (Extended timeline)';
      timelineWeeks = Math.round(currentBaseWeeks * 1.3);
      squadText = '1 Dedicated Lead Engineer';
    } else if (currentSpeedPace == 2) {
      speedFactor = 1.0;
      paceText = `Standard Pace (${currentBaseWeeks}–${currentBaseWeeks + 2} wks)`;
      timelineWeeks = currentBaseWeeks;
      squadText = '1 Tech Lead + 1 Specialist';
    } else if (currentSpeedPace == 3) {
      speedFactor = 1.25;
      paceText = `Accelerated Rush (${Math.max(2, Math.round(currentBaseWeeks * 0.7))} wks)`;
      timelineWeeks = Math.max(2, Math.round(currentBaseWeeks * 0.7));
      squadText = '2 Senior Engs + 1 Architect';
    }

    if (speedLabel) speedLabel.textContent = paceText;

    const rawCost = currentBaseCost * currentMultiplier * speedFactor;
    const lowCost = Math.round((rawCost * 0.9) / 100) * 100;
    const highCost = Math.round((rawCost * 1.15) / 100) * 100;
    const formattedRange = `$${lowCost.toLocaleString()} – $${highCost.toLocaleString()}`;
    
    if (calcPriceDisplay) calcPriceDisplay.textContent = formattedRange;
    if (calcTimelineDisplay) calcTimelineDisplay.textContent = `${timelineWeeks} – ${timelineWeeks + 2} Weeks`;
    if (calcSquadDisplay) calcSquadDisplay.textContent = squadText;

    // Mobile Price Mirror Sync (Package B)
    if (mobilePriceMirror) {
      mobilePriceMirror.textContent = `Est: ${formattedRange}`;
    }

    updateSliderFill();
  }

  // Question 1 (Project Type)
  typePills.forEach(pill => {
    pill.addEventListener('click', () => {
      typePills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');

      currentBaseCost = parseFloat(pill.getAttribute('data-cost')) || 5500;
      currentBaseWeeks = parseInt(pill.getAttribute('data-weeks'), 10) || 6;
      const titleSpan = pill.querySelector('.pill-title');
      currentTypeName = (titleSpan ? titleSpan.textContent : pill.textContent).replace(/[^\w\s\/-]/g, '').trim();
      updateEstimator();
    });
  });

  // Question 2 (Scope & Maturity)
  scopePills.forEach(pill => {
    pill.addEventListener('click', () => {
      scopePills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');

      currentMultiplier = parseFloat(pill.getAttribute('data-multiplier')) || 1.0;
      currentScopeLevel = pill.getAttribute('data-level') || 'Growth';
      updateEstimator();
    });
  });

  // Question 3 (Delivery Speed Slider)
  if (speedRange) {
    speedRange.addEventListener('input', (e) => {
      currentSpeedPace = parseInt(e.target.value, 10);
      speedRange.setAttribute('aria-valuenow', currentSpeedPace);
      updateEstimator();
    });
  }

  // "Apply This Estimate to Contact Form" Button (PRO MAX CRO ENHANCEMENT)
  if (applyEstimateBtn) {
    applyEstimateBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      const projectScopeSelect = document.getElementById('projectScopeSelect');
      const budgetTierSelect = document.getElementById('budgetTierSelect');
      const clientMessage = document.getElementById('clientMessage');

      if (projectScopeSelect) {
        if (currentTypeName.includes('AI')) projectScopeSelect.value = 'Custom AI / LLM Solutions';
        else if (currentTypeName.includes('Web')) projectScopeSelect.value = 'Full-Stack Web Engineering';
        else if (currentTypeName.includes('Cloud')) projectScopeSelect.value = 'Cloud Architecture & DevOps';
        else if (currentTypeName.includes('Audit')) projectScopeSelect.value = 'Security Audit & Advisory';
      }

      if (budgetTierSelect) {
        const rawCost = currentBaseCost * currentMultiplier;
        if (rawCost < 6000) budgetTierSelect.value = '$5,000 - $10,000';
        else if (rawCost < 15000) budgetTierSelect.value = '$10,000 - $25,000';
        else budgetTierSelect.value = '$25,000 - $50,000+';
      }

      // Display the Visual Estimate Chip above the form
      if (estimateChipBox && estimateChipText) {
        estimateChipText.textContent = `Applied Blueprint: ${currentTypeName} (${currentScopeLevel} • ${calcPriceDisplay.textContent})`;
        estimateChipBox.style.display = 'flex';
      }

      if (clientMessage) {
        clientMessage.value = `Hi Nexus AI team, I configured an estimate for a "${currentTypeName}" (${currentScopeLevel} tier, estimated range: ${calcPriceDisplay.textContent}). I'd like to schedule a discovery call to review our technical roadmap.`;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      if (contactCard) {
        contactCard.classList.remove('highlight-pulse');
        void contactCard.offsetWidth;
        contactCard.classList.add('highlight-pulse');
      }
    });
  }

  if (clearEstimateChip && estimateChipBox) {
    clearEstimateChip.addEventListener('click', () => {
      estimateChipBox.style.display = 'none';
    });
  }

  updateEstimator();

  /* --------------------------------------------------------------------------
   * 9. PRICING CARD "CHOOSE TIER" BUTTONS WITH PACKAGE CHIP (PACKAGE B CRO)
   * -------------------------------------------------------------------------- */
  const tierButtons = document.querySelectorAll('.tier-select-btn');
  tierButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tierName = btn.getAttribute('data-tier');
      const tierPrice = btn.getAttribute('data-price');
      const budgetTierSelect = document.getElementById('budgetTierSelect');
      const clientMessage = document.getElementById('clientMessage');
      const contactSection = document.getElementById('contact');

      if (budgetTierSelect && tierName) {
        if (tierName.includes('Advisory')) {
          budgetTierSelect.value = '$5,000 - $10,000';
        } else if (tierName.includes('Growth')) {
          budgetTierSelect.value = '$10,000 - $25,000';
        } else if (tierName.includes('Enterprise')) {
          budgetTierSelect.value = '$25,000 - $50,000+';
        }
      }

      // Display the "Selected Package Chip" above form for parity with Estimator
      if (estimateChipBox && estimateChipText) {
        estimateChipText.textContent = `Selected Package: ${tierName} (${tierPrice})`;
        estimateChipBox.style.display = 'flex';
      }

      if (clientMessage && tierName) {
        clientMessage.value = `Hi Nexus AI team, I am interested in your "${tierName}" engagement model (${tierPrice}). Let's schedule a call to review requirements and kickoff timing.`;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      if (contactCard) {
        contactCard.classList.remove('highlight-pulse');
        void contactCard.offsetWidth;
        contactCard.classList.add('highlight-pulse');
      }
    });
  });

  /* --------------------------------------------------------------------------
   * 10. FAQ ACCORDION (ACCESSIBLE WITH ARIA)
   * -------------------------------------------------------------------------- */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherTrigger = otherItem.querySelector('.accordion-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --------------------------------------------------------------------------
   * 11. CONTACT FORM VALIDATION WITH DYNAMIC ARIA-INVALID (PACKAGE C)
   * -------------------------------------------------------------------------- */
  const consultationForm = document.getElementById('consultationForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');
  const resetFormBtn = document.getElementById('resetFormBtn');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let hasError = false;

      // Validate Name
      const nameInput = document.getElementById('clientName');
      const nameGroup = nameInput.closest('.form-group');
      if (!nameInput.value.trim()) {
        nameGroup.classList.add('has-error');
        nameInput.setAttribute('aria-invalid', 'true');
        hasError = true;
      } else {
        nameGroup.classList.remove('has-error');
        nameInput.setAttribute('aria-invalid', 'false');
      }

      // Validate Email
      const emailInput = document.getElementById('clientEmail');
      const emailGroup = emailInput.closest('.form-group');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailGroup.classList.add('has-error');
        emailInput.setAttribute('aria-invalid', 'true');
        hasError = true;
      } else {
        emailGroup.classList.remove('has-error');
        emailInput.setAttribute('aria-invalid', 'false');
      }

      // Validate Message
      const messageInput = document.getElementById('clientMessage');
      const messageGroup = messageInput.closest('.form-group');
      if (!messageInput.value.trim()) {
        messageGroup.classList.add('has-error');
        messageInput.setAttribute('aria-invalid', 'true');
        hasError = true;
      } else {
        messageGroup.classList.remove('has-error');
        messageInput.setAttribute('aria-invalid', 'false');
      }

      if (!hasError) {
        consultationForm.style.display = 'none';
        if (estimateChipBox) estimateChipBox.style.display = 'none';
        if (formSuccessMessage) {
          formSuccessMessage.classList.add('active');
        }
      }
    });

    // Clear error states on user input
    ['clientName', 'clientEmail', 'clientMessage'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          group.classList.remove('has-error');
          input.setAttribute('aria-invalid', 'false');
        });
      }
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        consultationForm.reset();
        consultationForm.style.display = 'block';
        if (formSuccessMessage) {
          formSuccessMessage.classList.remove('active');
        }
      });
    }
  }

});
