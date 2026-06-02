const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const navBackdrop = document.querySelector("#navBackdrop");
const contactForm = document.querySelector("#contactForm");
const heroLayout = document.querySelector(".hero-layout");
const heroSlides = heroLayout ? heroLayout.querySelectorAll(".hero-slide") : [];
const heroPrev = heroLayout?.querySelector(".hero-arrow-prev");
const heroNext = heroLayout?.querySelector(".hero-arrow-next");
const heroMedia = heroLayout?.querySelector(".hero-media");
const heroTitle = document.querySelector("#heroTitle");
const heroDescription = document.querySelector("#heroDescription");
const heroCopy = document.querySelector(".hero-copy");
const header = document.querySelector(".header");
const whatsappFloat = document.querySelector(".whatsapp-float");

const heroMessages = [
  {
    title: "Celebre o amor em um cenário encantador e memorável.",
    description:
      "Jardins, salão climatizado e atendimento dedicado para transformar seu casamento em uma experiência inesquecível."
  },
  {
    title: "Seu evento com elegância e sofisticação em cada detalhe.",
    description:
      "Uma estrutura completa para celebrar com conforto, beleza e alto padrão. Receba atendimento consultivo e uma proposta personalizada para sua data."
  },
  {
    title: "Festas e eventos com energia, estilo e organização impecável.",
    description:
      "Do aniversário ao corporativo, oferecemos flexibilidade de layout e suporte completo para tudo acontecer com tranquilidade."
  },
  {
    title: "Cada ambiente é preparado para impressionar seus convidados.",
    description:
      "Cenários internos e externos com estética premium, conforto e estrutura para eventos inesquecíveis."
  },
  {
    title: "Seu grande dia merece um espaço pensado nos mínimos detalhes.",
    description:
      "Da cerimônia à recepção, entregamos charme, organização e atendimento próximo em todas as etapas."
  },
  {
    title: "Momentos espontâneos que viram memórias para sempre.",
    description:
      "A Chácara do Cris valoriza cada detalhe da celebração para criar experiências autênticas e emocionantes."
  }
];

const heroImages = heroSlides.length
  ? Array.from(heroSlides).map((slide) => {
      const match = slide.style.backgroundImage.match(/url\(["']?(.+?)["']?\)/);
      return match ? match[1] : "";
    })
  : [];

const getHeroSlideLabel = (slideIndex) =>
  heroSlides[slideIndex]?.dataset.alt || heroMessages[slideIndex]?.title || "Foto ampliada";

if (menuToggle && mainNav) {
  const navDropdowns = mainNav.querySelectorAll(".nav-dropdown");
  const navDropdownLinks = mainNav.querySelectorAll(".nav-dropdown-link");
  const navCollapsibleGroups = mainNav.querySelectorAll(".nav-submenu-group.is-collapsible");
  const mobileNavQuery = window.matchMedia("(max-width: 980px)");

  const isMobileNav = () => mobileNavQuery.matches;

  const updateSubmenuOpenState = () => {
    const hasOpenDropdown = [...navDropdowns].some((dropdown) =>
      dropdown.classList.contains("open")
    );
    document.body.classList.toggle("nav-submenu-open", hasOpenDropdown);
  };

  const closeCollapsibleGroups = (scope = mainNav) => {
    scope.querySelectorAll(".nav-submenu-group.is-collapsible.open").forEach((group) => {
      group.classList.remove("open");
      group.querySelector(".nav-submenu-heading")?.setAttribute("aria-expanded", "false");
    });
  };

  const closeAllDropdowns = () => {
    navDropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
    closeCollapsibleGroups();
    updateSubmenuOpenState();
  };

  const setMenuOpen = (open) => {
    mainNav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    navBackdrop?.classList.toggle("open", open);
    navBackdrop?.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("nav-open", open);

    if (!open) {
      closeAllDropdowns();
    }
  };

  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenuOpen(!mainNav.classList.contains("open"));
  });

  navBackdrop?.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenuOpen(false);
  });

  navDropdownLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const dropdown = link.closest(".nav-dropdown");
      if (!dropdown) {
        return;
      }

      if (!isMobileNav()) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const shouldOpen = !dropdown.classList.contains("open");
      closeAllDropdowns();
      if (shouldOpen) {
        dropdown.classList.add("open");
      }
      updateSubmenuOpenState();
    });
  });

  navCollapsibleGroups.forEach((group) => {
    const toggle = group.querySelector(".nav-submenu-heading");

    toggle?.addEventListener("click", (event) => {
      if (!isMobileNav()) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const parentSubmenu = group.closest(".nav-submenu");
      const shouldOpen = !group.classList.contains("open");

      parentSubmenu
        ?.querySelectorAll(".nav-submenu-group.is-collapsible.open")
        .forEach((openGroup) => {
          if (openGroup !== group) {
            openGroup.classList.remove("open");
            openGroup.querySelector(".nav-submenu-heading")?.setAttribute("aria-expanded", "false");
          }
        });

      group.classList.toggle("open", shouldOpen);
      toggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    });
  });

  mainNav.querySelectorAll(".nav-submenu a").forEach((submenuLink) => {
    submenuLink.addEventListener("click", (event) => {
      event.stopPropagation();
      setMenuOpen(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (mainNav.contains(event.target) || menuToggle.contains(event.target)) {
      return;
    }

    closeAllDropdowns();

    if (mainNav.classList.contains("open")) {
      setMenuOpen(false);
    }
  });

  mainNav.querySelectorAll('a[href^="#"]:not(.nav-dropdown-link)').forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNav.classList.contains("open")) {
      setMenuOpen(false);
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nome = formData.get("nome") || "";
    const email = formData.get("email") || "";
    const telefone = formData.get("telefone") || "";
    const tipo = formData.get("tipo") || "";
    const mensagem = formData.get("mensagem") || "";
    const numeroWhatsapp = contactForm.dataset.whatsapp || "5549998009688";

    const texto = [
      "Vim pelo Site...",
      "Olá! Quero solicitar um orçamento para evento na Chácara do Cris.",
      "",
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      `Telefone: ${telefone}`,
      `Tipo de evento: ${tipo}`,
      `Mensagem: ${mensagem}`
    ].join("\n");

    const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(texto)}`;

    localStorage.setItem("lead:origem", "site-chacara-do-cris");
    window.open(linkWhatsapp, "_blank", "noopener,noreferrer");
  });
}

if (heroSlides.length > 1) {
  let currentSlide = 0;
  let heroTimer;

  const updateHeroMessage = (slideIndex) => {
    if (!heroTitle || !heroDescription || !heroMessages[slideIndex]) {
      return;
    }

    const applyMessage = () => {
      heroTitle.textContent = heroMessages[slideIndex].title;
      heroDescription.textContent = heroMessages[slideIndex].description;
      heroCopy?.classList.remove("is-changing");
    };

    if (!heroCopy || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyMessage();
      return;
    }

    heroCopy.classList.add("is-changing");
    window.setTimeout(applyMessage, 220);
  };

  updateHeroMessage(currentSlide);

  const showHeroSlide = (slideIndex) => {
    heroSlides[currentSlide].classList.remove("active");

    currentSlide = (slideIndex + heroSlides.length) % heroSlides.length;
    heroSlides[currentSlide].classList.add("active");
    updateHeroMessage(currentSlide);
  };

  const startHeroTimer = () => {
    window.clearInterval(heroTimer);
    heroTimer = window.setInterval(() => {
      showHeroSlide((currentSlide + 1) % heroSlides.length);
    }, 6500);
  };

  if (heroPrev) {
    heroPrev.addEventListener("click", () => {
      showHeroSlide(currentSlide - 1);
      startHeroTimer();
    });
  }

  if (heroNext) {
    heroNext.addEventListener("click", () => {
      showHeroSlide(currentSlide + 1);
      startHeroTimer();
    });
  }

  startHeroTimer();
}

const galleryImages = document.querySelectorAll(".photo img");

if (heroMedia || galleryImages.length > 0) {
  const modal = document.createElement("div");
  modal.className = "photo-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Visualização de fotos");
  modal.innerHTML = `
    <button class="photo-modal-close" type="button" aria-label="Fechar visualização da foto">×</button>
    <button class="photo-modal-arrow photo-modal-prev" type="button" aria-label="Ver foto anterior">‹</button>
    <button class="photo-modal-arrow photo-modal-next" type="button" aria-label="Ver próxima foto">›</button>
    <p class="photo-modal-counter" aria-live="polite"></p>
    <img class="photo-modal-img" alt="">
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector(".photo-modal-img");
  const modalClose = modal.querySelector(".photo-modal-close");
  const modalPrev = modal.querySelector(".photo-modal-prev");
  const modalNext = modal.querySelector(".photo-modal-next");
  const modalCounter = modal.querySelector(".photo-modal-counter");

  let galleryItems = [];
  let currentGalleryIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let lastImageActivation = 0;

  const updateModalControls = () => {
    const hasMultiple = galleryItems.length > 1;

    modalPrev.hidden = !hasMultiple;
    modalNext.hidden = !hasMultiple;

    if (modalCounter) {
      modalCounter.textContent = hasMultiple ? `${currentGalleryIndex + 1} / ${galleryItems.length}` : "";
      modalCounter.hidden = !hasMultiple;
    }
  };

  const updateModalImage = () => {
    const item = galleryItems[currentGalleryIndex];

    if (!modalImage || !item?.src) {
      return;
    }

    modalImage.src = item.src;
    modalImage.alt = item.alt || "Foto ampliada";
    updateModalControls();
  };

  const openPhotoGallery = (items, startIndex = 0) => {
    if (!modalImage || !items.length) {
      return;
    }

    galleryItems = items;
    currentGalleryIndex = (startIndex + items.length) % items.length;
    updateModalImage();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closePhotoModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    galleryItems = [];
    currentGalleryIndex = 0;

    if (modalImage) {
      modalImage.removeAttribute("src");
    }

    updateModalControls();
  };

  const showPreviousPhoto = () => {
    if (galleryItems.length <= 1) {
      return;
    }

    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateModalImage();
  };

  const showNextPhoto = () => {
    if (galleryItems.length <= 1) {
      return;
    }

    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateModalImage();
  };

  const getGalleryItemsFromContainer = (container) =>
    [...container.querySelectorAll(".photo img, figure img")].map((image) => ({
      src: image.currentSrc || image.src,
      alt: image.alt || "Foto ampliada"
    }));

  const galleryContainerSelector =
    ".gallery-grid--deck-expanded, .gallery-grid, .estrutura-gallery-grid";

  const getGalleryContainer = (image) => {
    const panel = image.closest(".cerimonia-gallery-panel, .gallery-view-panel");
    const panelGrid = panel?.querySelector(galleryContainerSelector);

    if (panelGrid) {
      return panelGrid;
    }

    return image.closest(galleryContainerSelector);
  };

  const getGalleryImageFromEvent = (event) => {
    const directImage = event.target.closest(
      `.photo img, .gallery-grid img, .estrutura-gallery-grid img`
    );

    if (directImage) {
      return directImage;
    }

    const photo = event.target.closest(
      ".estrutura-gallery-grid .photo, .gallery-grid .photo:not(.photo-gallery-trigger)"
    );

    return photo?.querySelector("img") ?? null;
  };

  const openPhotoFromImage = (image) => {
    const container = getGalleryContainer(image);

    if (container) {
      const items = getGalleryItemsFromContainer(container);
      const images = [...container.querySelectorAll(".photo img, figure img")];
      const startIndex = Math.max(0, images.indexOf(image));

      openPhotoGallery(items, startIndex);
      return;
    }

    openPhotoGallery(
      [
        {
          src: image.currentSrc || image.src,
          alt: image.alt || "Foto ampliada"
        }
      ],
      0
    );
  };

  const getActiveHeroSlideIndex = () => {
    const activeSlide = document.querySelector(".hero-slide.active");
    const slideIndex = activeSlide ? Array.from(heroSlides).indexOf(activeSlide) : 0;
    return slideIndex >= 0 ? slideIndex : 0;
  };

  if (heroMedia && heroImages.length) {
    const heroGalleryItems = heroImages.map((src, index) => ({
      src,
      alt: getHeroSlideLabel(index)
    }));

    heroMedia.addEventListener("click", (event) => {
      if (event.target.closest(".hero-arrow")) {
        return;
      }

      openPhotoGallery(heroGalleryItems, getActiveHeroSlideIndex());
    });

    heroMedia.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPhotoGallery(heroGalleryItems, getActiveHeroSlideIndex());
      }
    });
  }

  const activateGalleryImage = (event) => {
    const image = getGalleryImageFromEvent(event);

    if (!image || image.closest(".photo-gallery-trigger")) {
      return;
    }

    const now = Date.now();
    if (now - lastImageActivation < 450) {
      return;
    }

    lastImageActivation = now;
    event.preventDefault();
    event.stopPropagation();
    openPhotoFromImage(image);
  };

  document.addEventListener("click", activateGalleryImage, true);

  modalClose?.addEventListener("click", (event) => {
    event.stopPropagation();
    closePhotoModal();
  });

  modalPrev?.addEventListener("click", (event) => {
    event.stopPropagation();
    showPreviousPhoto();
  });

  modalNext?.addEventListener("click", (event) => {
    event.stopPropagation();
    showNextPhoto();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closePhotoModal();
    }
  });

  modal.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchStartY = event.touches[0]?.clientY ?? 0;
    },
    { passive: true }
  );

  modal.addEventListener(
    "touchend",
    (event) => {
      if (!modal.classList.contains("open") || galleryItems.length <= 1) {
        return;
      }

      const touchEndX = event.changedTouches[0]?.clientX ?? 0;
      const touchEndY = event.changedTouches[0]?.clientY ?? 0;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      event.preventDefault();

      if (deltaX > 0) {
        showPreviousPhoto();
      } else {
        showNextPhoto();
      }
    },
    { passive: false }
  );

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("open")) {
      return;
    }

    if (event.key === "Escape") {
      closePhotoModal();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousPhoto();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextPhoto();
    }
  });

  updateModalControls();
}

const revealItems = document.querySelectorAll(".reveal");

if (header) {
  const updateHeaderOnScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
    if (whatsappFloat) {
      whatsappFloat.classList.toggle("is-pulsing", window.scrollY > 120);
    }
  };

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
}

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const rideApp99 = document.querySelector("#rideApp99");
const RIDE_DEST = {
  lat: -26.9998751,
  lng: -52.6516185,
  name: "Chácara do Cris",
  clientId: "MAP_CHACARADOCRIS",
  productId: "316"
};
const CHAPECO_CENTRO = { lat: -27.0955, lng: -52.618 };

function build99TaxiUrl(pickupLat, pickupLng) {
  const params = new URLSearchParams({
    pickup_latitude: String(pickupLat),
    pickup_longitude: String(pickupLng),
    pickup_title: "Origem",
    dropoff_latitude: String(RIDE_DEST.lat),
    dropoff_longitude: String(RIDE_DEST.lng),
    dropoff_title: RIDE_DEST.name,
    deep_link_product_id: RIDE_DEST.productId,
    client_id: RIDE_DEST.clientId
  });
  return `taxis99://call?${params.toString()}`;
}

if (rideApp99) {
  rideApp99.addEventListener("click", () => {
    const open99 = (plat, plng) => {
      window.location.href = build99TaxiUrl(plat, plng);
    };

    if (!navigator.geolocation) {
      open99(CHAPECO_CENTRO.lat, CHAPECO_CENTRO.lng);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => open99(pos.coords.latitude, pos.coords.longitude),
      () => open99(CHAPECO_CENTRO.lat, CHAPECO_CENTRO.lng),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 }
    );
  });
}
