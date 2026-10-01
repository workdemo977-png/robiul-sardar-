/**
 * Md. Robiul Sardar - Digital Marketing Specialist Portfolio
 * Interactive Script: Mobile Navigation, ScrollSpy, Inquiry Generation, Portfolio Modals
 * Static-safe for GitHub Pages, Netlify, and Vercel.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Elements ---
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenuWrap = document.querySelector('.nav-menu-wrap');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const btnSendWhatsApp = document.getElementById('btn-send-whatsapp');
  const btnSendEmail = document.getElementById('btn-send-email');
  const btnSendInquiry = document.getElementById('btn-send-inquiry');

  // Input fields
  const nameInput = document.getElementById('client-name');
  const emailInput = document.getElementById('client-email');
  const serviceInput = document.getElementById('client-service');
  const detailsInput = document.getElementById('client-details');

  // Portfolio Modal Elements
  const modalBackdrop = document.getElementById('portfolio-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalOverview = document.getElementById('modal-overview');
  const modalStrategy = document.getElementById('modal-strategy');
  const modalDeliverables = document.getElementById('modal-deliverables');
  const modalTools = document.getElementById('modal-tools');
  const modalActionBtn = document.getElementById('modal-action-btn');

  let lastActiveTrigger = null;

  // --- Portfolio Detailed Data ---
  const portfolioData = {
    'keyword-research': {
      badge: 'Sample Project • SEO Research',
      title: 'High-Intent B2B & Long-Tail Keyword Research Architecture',
      image: './assets/portfolio/seo-keyword-showcase.svg',
      imageAlt: 'SEO Keyword Research Blueprint & Data Metrics',
      overview: 'A structured keyword research blueprint designed to identify high-converting, low-competition search queries. The project focuses on buyer-intent keywords that accelerate search visibility without competing against entrenched corporate domains.',
      strategy: 'Utilized competitor gap analysis, search intent clustering (commercial, transactional, and informational), and search volume-to-difficulty ratio filtering. Mapped keywords directly to dedicated landing page content silos for maximum topical authority.',
      deliverables: [
        'Comprehensive Excel / Google Sheet with 250+ targeted queries',
        'Keyword difficulty, search volume, and CPC analysis',
        'Search intent classification (Commercial / Informational)',
        'Content cluster roadmap and recommended URL structures',
        'Competitor SERP analysis and gap opportunities'
      ],
      tools: ['Ahrefs', 'SEMrush', 'Google Keyword Planner', 'Google Search Console', 'Google Sheets'],
      serviceKey: 'SEO Keyword Research'
    },
    'backlink-building': {
      badge: 'Sample Project • Link Authority',
      title: 'High-DA Profile & Foundational Backlink Building System',
      image: './assets/portfolio/backlink-showcase.svg',
      imageAlt: 'Profile Backlink Building Framework and Authority Distribution',
      overview: 'A white-hat profile backlink campaign engineered to establish essential domain trust, brand entity recognition, and natural link juice for new or growing websites.',
      strategy: 'Identified high Domain Authority (DA 70–90+) Web 2.0 and profile platforms. Crafted complete, consistent brand profiles with anchor text diversification (brand name, naked URL, and topical anchors) adhering strictly to search engine safety guidelines.',
      deliverables: [
        '100% manual profile creation on verified high DA platforms',
        'Complete credential sheet with login details & live profile URLs',
        'DoFollow and high-trust entity citations',
        'Anchor text diversification audit',
        'Permanent live placement verification'
      ],
      tools: ['Moz Pro (DA/PA Check)', 'Ahrefs Webmaster Tools', 'Google Search Console', 'Spam Score Audit'],
      serviceKey: 'SEO & Profile Backlink Building'
    },
    'facebook-ads': {
      badge: 'Sample Project • Paid Media',
      title: 'Full-Funnel Meta Advertising & Lead Acquisition Campaign',
      image: './assets/portfolio/facebook-ads-showcase.svg',
      imageAlt: 'Facebook Ads Campaign Structure & Performance Analytics',
      overview: 'A comprehensive paid advertising structure built to reach high-value prospects, lower cost-per-acquisition (CPA), and drive qualified inbound business leads.',
      strategy: 'Segmented audience campaigns into Top of Funnel (Cold interest & Lookalike), Middle of Funnel (Engagement & Video viewers), and Bottom of Funnel (High-intent website retargeting). Implemented dynamic creative testing (DCT) to continuously identify top-performing hooks and ad copies.',
      deliverables: [
        'Complete CBO & ABO campaign architecture blueprint',
        'Custom audience and lookalike (LAL 1%-3%) segmentation',
        'High-converting ad copy angles and hook variations',
        'Meta Pixel and Conversions API (CAPI) event tracking setup',
        'Weekly optimization and budget allocation matrix'
      ],
      tools: ['Meta Ads Manager', 'Meta Business Suite', 'Conversions API', 'Canva Pro', 'Google Analytics 4'],
      serviceKey: 'Facebook Ads'
    },
    'instagram-marketing': {
      badge: 'Sample Project • Organic Social',
      title: 'Strategic Organic Instagram Growth & Content Architecture',
      image: './assets/portfolio/instagram-marketing-showcase.svg',
      imageAlt: 'Instagram Marketing Content Pillars and Engagement Analytics',
      overview: 'An organic brand positioning strategy focused on transforming an Instagram profile into a credible discovery channel and inbound client inquiry funnel.',
      strategy: 'Built a 4-pillar content framework (Educational Carousels, High-Value Reels, Social Proof, and Direct Call-to-Action Stories). Optimized bio keywords, highlight covers, and engaged active industry niche accounts to trigger algorithmic recommendation.',
      deliverables: [
        'Profile Bio & Story Highlights overhaul for conversion',
        '30-day structured content calendar with hooks & captions',
        'Curated hashtag research sets categorized by volume',
        'Engagement strategy blueprint for community reach',
        'Monthly analytics and audience growth tracking'
      ],
      tools: ['Instagram Insights', 'Meta Creator Studio', 'Canva Pro', 'Notion Content Board', 'CapCut'],
      serviceKey: 'Instagram Marketing'
    },
    'lead-generation': {
      badge: 'Sample Project • B2B Prospecting',
      title: 'Targeted B2B Decision-Maker Lead Generation Pipeline',
      image: './assets/portfolio/lead-generation-showcase.svg',
      imageAlt: 'B2B Lead Generation Funnel and Contact Profiles',
      overview: 'A targeted lead prospecting process tailored to source verified C-level executives, founders, and decision-makers within specific niche industries and geographic markets.',
      strategy: 'Defined Ideal Customer Profile (ICP) parameters including industry, headcount, revenue bracket, and job roles. Gathered direct verified contacts and validated email deliverability using multi-stage SMTP verification to eliminate bounces.',
      deliverables: [
        'Structured Google Sheets / Excel database of verified leads',
        'Decision-maker data: Full Name, Job Title, Valid Email, LinkedIn URL',
        'Company data: Company Name, Website, Location, Employee Count',
        'Zero-bounce verification audit (98%+ deliverability guarantee)',
        'Personalized outreach icebreakers / pitch angles'
      ],
      tools: ['LinkedIn Sales Navigator', 'Apollo.io', 'NeverBounce / ZeroBounce', 'Google Sheets'],
      serviceKey: 'Lead Generation'
    }
  };

  // ==========================================================================
  // NAVBAR SCROLL & ACTIVE STATE
  // ==========================================================================
  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Mobile Menu Toggle
  function toggleMobileMenu(forceClose = false) {
    const isOpen = forceClose ? false : !navMenuWrap.classList.contains('open');
    if (isOpen) {
      navMenuWrap.classList.add('open');
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      navMenuWrap.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }

  // Close mobile menu on clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenuWrap.classList.contains('open')) {
      toggleMobileMenu(true);
    }
  });

  // Active section indicator on scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  function updateScrollSpy() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });

  // ==========================================================================
  // SERVICE PRESELECT INQUIRY BUTTONS
  // ==========================================================================
  const serviceInquireButtons = document.querySelectorAll('[data-service-inquire]');
  serviceInquireButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service-inquire');
      if (serviceInput && serviceName) {
        // Select matching option
        for (let i = 0; i < serviceInput.options.length; i++) {
          if (serviceInput.options[i].value === serviceName || serviceInput.options[i].text.includes(serviceName)) {
            serviceInput.selectedIndex = i;
            break;
          }
        }
      }
      // Scroll to contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          nameInput.focus();
        }, 600);
      }
    });
  });

  // ==========================================================================
  // PORTFOLIO MODAL LOGIC
  // ==========================================================================
  const modalTriggers = document.querySelectorAll('[data-portfolio-modal]');

  function openPortfolioModal(projectId, triggerBtn) {
    const data = portfolioData[projectId];
    if (!data) return;

    lastActiveTrigger = triggerBtn;

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;
    modalImage.src = data.image;
    modalImage.alt = data.imageAlt;
    modalOverview.textContent = data.overview;
    modalStrategy.textContent = data.strategy;

    // Deliverables list
    modalDeliverables.innerHTML = '';
    data.deliverables.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        <span>${item}</span>
      `;
      modalDeliverables.appendChild(li);
    });

    // Tools pills
    modalTools.innerHTML = '';
    data.tools.forEach(tool => {
      const span = document.createElement('span');
      span.className = 'modal-tool-pill';
      span.textContent = tool;
      modalTools.appendChild(span);
    });

    // Modal CTA Action button
    modalActionBtn.onclick = () => {
      closePortfolioModal();
      if (serviceInput && data.serviceKey) {
        for (let i = 0; i < serviceInput.options.length; i++) {
          if (serviceInput.options[i].value === data.serviceKey || serviceInput.options[i].text.includes(data.serviceKey)) {
            serviceInput.selectedIndex = i;
            break;
          }
        }
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          nameInput.focus();
        }, 500);
      }
    };

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  function closePortfolioModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveTrigger) {
      lastActiveTrigger.focus();
    }
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-portfolio-modal');
      openPortfolioModal(projectId, btn);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closePortfolioModal);
  }

  // Close modal when clicking backdrop
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closePortfolioModal();
      }
    });
  }

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closePortfolioModal();
    }
  });

  // ==========================================================================
  // CLIENT COMMUNICATION SYSTEM (STATIC COMPATIBLE)
  // ==========================================================================
  const ROBIUL_CONFIG = {
    whatsappNumber: '8801934731139',
    email: 'mdrobiulsardar391@gmail.com'
  };

  function showAlert(msg, isSuccess = false) {
    formAlert.textContent = msg;
    formAlert.className = 'form-alert ' + (isSuccess ? 'alert-success' : 'alert-error');
    formAlert.style.display = 'flex';
    formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideAlert() {
    formAlert.style.display = 'none';
    formAlert.textContent = '';
  }

  function validateClientForm() {
    hideAlert();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const service = serviceInput.value.trim();
    const details = detailsInput.value.trim();

    if (!name || name.length < 2) {
      showAlert('Please enter your full name so I know who I am speaking with.');
      nameInput.focus();
      return null;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      showAlert('Please provide a valid email address so I can get back to you.');
      emailInput.focus();
      return null;
    }

    if (!service) {
      showAlert('Please select the service you are interested in.');
      serviceInput.focus();
      return null;
    }

    if (!details || details.length < 10) {
      showAlert('Please provide brief details about your project or business goals (at least 10 characters).');
      detailsInput.focus();
      return null;
    }

    return { name, email, service, details };
  }

  function buildInquiryMessage(data) {
    return (
      `Hello Robiul,\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Service: ${data.service}\n` +
      `Project Details:\n` +
      `${data.details}\n\n` +
      `I found your portfolio website and would like to discuss my project.\n` +
      `Thank you.`
    );
  }

  // --- WhatsApp Inquiry Handler ---
  function sendViaWhatsApp() {
    const data = validateClientForm();
    if (!data) return;

    const message = buildInquiryMessage(data);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${ROBIUL_CONFIG.whatsappNumber}?text=${encodedMessage}`;

    showAlert('Opening WhatsApp to send your inquiry directly to Robiul...', true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  // --- Email Inquiry Handler ---
  function sendViaEmail() {
    const data = validateClientForm();
    if (!data) return;

    const message = buildInquiryMessage(data);
    const subject = `New Project Inquiry - ${data.service}`;
    const mailtoUrl = `mailto:${ROBIUL_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    showAlert('Opening your email app with your project inquiry ready to send...', true);
    window.location.href = mailtoUrl;
  }

  // Attach button events
  if (btnSendWhatsApp) {
    btnSendWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      sendViaWhatsApp();
    });
  }

  if (btnSendEmail) {
    btnSendEmail.addEventListener('click', (e) => {
      e.preventDefault();
      sendViaEmail();
    });
  }

  if (btnSendInquiry) {
    btnSendInquiry.addEventListener('click', (e) => {
      e.preventDefault();
      // Validate first
      const data = validateClientForm();
      if (!data) return;

      // Offer WhatsApp as default primary fast communication, with email choice
      sendViaWhatsApp();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendViaWhatsApp();
    });
  }

  // Clear alert on user typing
  [nameInput, emailInput, serviceInput, detailsInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        if (formAlert.style.display === 'flex') {
          hideAlert();
        }
      });
    }
  });

  // Smooth scroll links handler for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});
