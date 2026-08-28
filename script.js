// Script de Interatividades - Excellent Global Idiomas Osasco

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de Ícones Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Menu Mobile Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. Animação de Scroll (IntersectionObserver para fade-in)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Contador Animado de Alunos (0 a 200.000+)
  const counterElement = document.getElementById('counter-students');
  let counterStarted = false;

  if (counterElement) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;
          animateCounter(counterElement, 0, 200000, 2400);
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(counterElement);
  }

  function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing out quadratic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * (end - start) + start);
      
      element.innerText = currentVal.toLocaleString('pt-BR') + '+';

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.innerText = end.toLocaleString('pt-BR') + '+';
      }
    };
    window.requestAnimationFrame(step);
  }

  // Função de higienização estrita contra XSS
  function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/[<>'"&]/g, (char) => {
        const entities = {
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;',
          '&': '&amp;'
        };
        return entities[char] || char;
      })
      .trim();
  }

  // 4. Formulário de Contato com Proteção XSS, Honeypot Anti-Spam e Debounce
  const contactForm = document.getElementById('contact-form');
  const formSuccessModal = document.getElementById('form-success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const submitLeadBtn = document.getElementById('submit-lead-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const defaultWhatsAppNumber = "5511968711060"; // WhatsApp oficial da unidade Osasco (+55 11 96871-1060)
  let isSubmitting = false;

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Anti-Flooding / Debounce: bloqueia múltiplos cliques repetidos
      if (isSubmitting) return;

      // 1. Verificação de Honeypot Anti-Bot (se preenchido, é um bot)
      const honeypot = document.getElementById('lead-website')?.value || '';
      if (honeypot.trim().length > 0) {
        console.warn('Bot detectado pelo Honeypot.');
        contactForm.reset();
        return;
      }

      // 2. Extração e Higienização Estrita contra XSS
      const rawName = document.getElementById('lead-name')?.value || '';
      const rawEmail = document.getElementById('lead-email')?.value || '';
      const rawPhone = document.getElementById('lead-phone')?.value || '';
      const rawCity = document.getElementById('lead-city')?.value || 'Osasco e Região';
      const rawObjective = document.getElementById('lead-objective')?.value || 'Aprender Inglês e Espanhol';

      const name = sanitizeInput(rawName).slice(0, 80);
      const email = sanitizeInput(rawEmail).slice(0, 100);
      const phone = sanitizeInput(rawPhone).slice(0, 20);
      const city = sanitizeInput(rawCity).slice(0, 60);
      const objective = sanitizeInput(rawObjective).slice(0, 50);

      // Validação semântica básica
      if (!name || name.length < 2) {
        alert('Por favor, informe seu nome completo.');
        document.getElementById('lead-name')?.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        alert('Por favor, informe um endereço de e-mail válido.');
        document.getElementById('lead-email')?.focus();
        return;
      }

      if (!phone || phone.replace(/\D/g, '').length < 8) {
        alert('Por favor, informe um número de telefone/WhatsApp válido com DDD.');
        document.getElementById('lead-phone')?.focus();
        return;
      }

      // Ativa bloqueio de envio e estado de loading
      isSubmitting = true;
      if (submitLeadBtn) {
        submitLeadBtn.disabled = true;
        if (submitBtnText) submitBtnText.textContent = 'Enviando...';
      }

      // Mensagem personalizada segura para o WhatsApp
      const whatsappMsg = `Olá, Excelente Global Osasco! Gostaria de agendar uma aula experimental e conhecer as condições de matrícula para os cursos de idiomas.\n\n*Nome:* ${name}\n*E-mail:* ${email}\n*Telefone/WhatsApp:* ${phone}\n*Região:* ${city}\n*Opção Escolhida:* ${objective}`;
      const encodedMsg = encodeURIComponent(whatsappMsg);
      const whatsappUrl = `https://wa.me/${defaultWhatsAppNumber}?text=${encodedMsg}`;

      // Exibe Modal de Sucesso
      if (formSuccessModal) {
        formSuccessModal.classList.remove('hidden');
        formSuccessModal.classList.add('flex');
      }

      // Abre WhatsApp após 1 segundo com proteção reverse tabnabbing
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 1200);

      contactForm.reset();

      // Cooldown do botão após 5 segundos
      setTimeout(() => {
        isSubmitting = false;
        if (submitLeadBtn) {
          submitLeadBtn.disabled = false;
          if (submitBtnText) submitBtnText.textContent = 'QUERO FALAR COM A EQUIPE OSASCO';
        }
      }, 5000);
    });
  }

  if (closeModalBtn && formSuccessModal) {
    closeModalBtn.addEventListener('click', () => {
      formSuccessModal.classList.add('hidden');
      formSuccessModal.classList.remove('flex');
    });
  }

  // 4.1. Player de Vídeo Institucional Interativo
  const videoWrapper = document.getElementById('video-wrapper');
  const videoCoverOverlay = document.getElementById('video-cover-overlay');
  const youtubePlayer = document.getElementById('youtube-player');

  if (videoWrapper && videoCoverOverlay && youtubePlayer) {
    videoWrapper.addEventListener('click', () => {
      const dataSrc = youtubePlayer.getAttribute('data-src');
      if (dataSrc && !youtubePlayer.getAttribute('src')) {
        youtubePlayer.setAttribute('src', dataSrc);
      }
      videoCoverOverlay.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        videoCoverOverlay.style.display = 'none';
      }, 400);
    });
  }

  // 5. Navbar Scroll Background Change
  const mainNavbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainNavbar.classList.add('bg-white/95', 'shadow-md', 'backdrop-blur-md');
      mainNavbar.classList.remove('bg-white/80');
    } else {
      mainNavbar.classList.remove('bg-white/95', 'shadow-md');
      mainNavbar.classList.add('bg-white/80');
    }
  });

  // 6. Sistema Orbital 3D Real (Órbita Elíptica Contínua sem Sobreposição)
  const orbitItems = document.querySelectorAll('.orbit-3d-item');
  const orbitContainer = document.getElementById('dynamic-orbit-container');

  if (orbitItems.length > 0 && orbitContainer) {
    let isHovered = false;
    let isVisible = true;
    let angleOffset1 = 0;
    let angleOffset2 = 0;
    let lastTime = performance.now();

    orbitContainer.addEventListener('mouseenter', () => { isHovered = true; });
    orbitContainer.addEventListener('mouseleave', () => { isHovered = false; });

    // Anti-travamento: só executa quando visível na tela
    const orbitObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    orbitObserver.observe(orbitContainer);

    // Pré-cálculo de inclinação dos planos
    const cosT1 = Math.cos(-20 * (Math.PI / 180));
    const sinT1 = Math.sin(-20 * (Math.PI / 180));

    const cosT2 = Math.cos(25 * (Math.PI / 180));
    const sinT2 = Math.sin(25 * (Math.PI / 180));

    function stepOrbit(now) {
      const delta = Math.min(now - lastTime, 64);
      lastTime = now;

      if (isVisible && !isHovered) {
        angleOffset1 += delta * 0.00030; // Órbita 1
        angleOffset2 -= delta * 0.00024; // Órbita 2 (sentido oposto)
      }

      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      
      const rX1 = isMobile ? 140 : (isTablet ? 170 : 195);
      const rY1 = isMobile ? 60 : (isTablet ? 75 : 85);

      const rX2 = isMobile ? 155 : (isTablet ? 185 : 215);
      const rY2 = isMobile ? 68 : (isTablet ? 82 : 95);

      orbitItems.forEach(item => {
        const orbitType = item.getAttribute('data-orbit') || '1';
        const baseAngleDeg = parseFloat(item.getAttribute('data-angle') || '0');
        const baseAngleRad = baseAngleDeg * (Math.PI / 180);

        let theta, rx, ry, cosT, sinT;
        if (orbitType === '1') {
          theta = baseAngleRad + angleOffset1;
          rx = rX1;
          ry = rY1;
          cosT = cosT1;
          sinT = sinT1;
        } else {
          theta = baseAngleRad + angleOffset2;
          rx = rX2;
          ry = rY2;
          cosT = cosT2;
          sinT = sinT2;
        }

        const cosA = Math.cos(theta);
        const sinA = Math.sin(theta);

        // Circunferência elíptica contínua ao redor da lateral do globo
        const rawX = rx * cosA;
        const rawY = ry * sinA;

        // Rotação do plano no espaço 3D
        const x = rawX * cosT - rawY * sinT;
        const y = rawX * sinT + rawY * cosT;

        // Profundidade Z (sinA > 0 está na frente; sinA < 0 está atrás)
        const z = sinA;

        let scale, zIndex, opacity;
        if (z >= 0) {
          scale = 1.0 + (z * 0.22); // Aumenta suavemente na frente
          zIndex = 35; // Fica sobreposto à frente do globo (globo z-index: 20)
          opacity = 1;
        } else {
          const depthRatio = Math.abs(z);
          scale = 1.0 - (depthRatio * 0.32); // Diminui suavemente ao ir para trás
          zIndex = 10; // Passa fisicamente POR TRÁS do globo (globo z-index: 20)
          opacity = 0.65 + (1 - depthRatio) * 0.35;
        }

        item.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        item.style.zIndex = zIndex;
        item.style.opacity = opacity.toFixed(2);
      });

      requestAnimationFrame(stepOrbit);
    }

    requestAnimationFrame(stepOrbit);
  }

  // 7. Controle do Banner de Cookies LGPD (localStorage)
  const lgpdBanner = document.getElementById('lgpd-banner');
  const acceptLgpdBtn = document.getElementById('accept-lgpd-btn');

  if (lgpdBanner && acceptLgpdBtn) {
    const isLgpdAccepted = localStorage.getItem('lgpd_accepted');
    if (!isLgpdAccepted) {
      setTimeout(() => {
        lgpdBanner.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
        lgpdBanner.classList.add('translate-y-0', 'opacity-100');
      }, 1200);
    }

    acceptLgpdBtn.addEventListener('click', () => {
      localStorage.setItem('lgpd_accepted', 'true');
      lgpdBanner.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
      lgpdBanner.classList.remove('translate-y-0', 'opacity-100');
    });
  }

  // 8. Modais Legais (Privacidade e Termos de Uso)
  const privacyModal = document.getElementById('privacy-modal');
  const termsModal = document.getElementById('terms-modal');
  const openPrivacyBtns = [
    document.getElementById('footer-privacy-btn'),
    document.getElementById('banner-privacy-link')
  ];
  const openTermsBtn = document.getElementById('footer-terms-btn');
  const closePrivacyBtns = [
    document.getElementById('close-privacy-btn'),
    document.getElementById('close-privacy-btn-bottom')
  ];
  const closeTermsBtns = [
    document.getElementById('close-terms-btn'),
    document.getElementById('close-terms-btn-bottom')
  ];

  openPrivacyBtns.forEach(btn => {
    if (btn && privacyModal) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        privacyModal.classList.remove('hidden');
        privacyModal.classList.add('flex');
      });
    }
  });

  closePrivacyBtns.forEach(btn => {
    if (btn && privacyModal) {
      btn.addEventListener('click', () => {
        privacyModal.classList.add('hidden');
        privacyModal.classList.remove('flex');
      });
    }
  });

  if (openTermsBtn && termsModal) {
    openTermsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      termsModal.classList.remove('hidden');
      termsModal.classList.add('flex');
    });
  }

  closeTermsBtns.forEach(btn => {
    if (btn && termsModal) {
      btn.addEventListener('click', () => {
        termsModal.classList.add('hidden');
        termsModal.classList.remove('flex');
      });
    }
  });

  // Fechar modais ao clicar no backdrop
  [privacyModal, termsModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
      });
    }
  });

  // Re-run Lucide icons
  setTimeout(() => {
    if (window.lucide) window.lucide.createIcons();
  }, 100);
});
