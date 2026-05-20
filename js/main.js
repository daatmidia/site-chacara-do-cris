const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const navBackdrop = document.querySelector("#navBackdrop");
const contactForm = document.querySelector("#contactForm");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroPrev = document.querySelector(".hero-arrow-prev");
const heroNext = document.querySelector(".hero-arrow-next");
const heroMedia = document.querySelector(".hero-media");
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

  const updateSubmenuOpenState = () => {
    const hasOpenDropdown = [...navDropdowns].some((dropdown) =>
      dropdown.classList.contains("open")
    );
    document.body.classList.toggle("nav-submenu-open", hasOpenDropdown);
  };

  const closeAllDropdowns = () => {
    navDropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
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

      const isMobileNav = window.matchMedia("(max-width: 760px)").matches;

      if (!isMobileNav) {
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
  modal.innerHTML = `
    <button class="photo-modal-close" type="button" aria-label="Fechar visualização da foto">×</button>
    <img class="photo-modal-img" alt="">
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector(".photo-modal-img");
  const modalClose = modal.querySelector(".photo-modal-close");

  const openPhotoModal = (src, alt = "Foto ampliada") => {
    if (!modalImage || !src) {
      return;
    }

    modalImage.src = src;
    modalImage.alt = alt;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closePhotoModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (modalImage) {
      modalImage.removeAttribute("src");
    }
  };

  if (heroMedia) {
    heroMedia.addEventListener("click", (event) => {
      if (event.target.closest(".hero-arrow")) {
        return;
      }

      openPhotoModal(heroImages[currentSlide], getHeroSlideLabel(currentSlide));
    });

    heroMedia.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPhotoModal(heroImages[currentSlide], getHeroSlideLabel(currentSlide));
      }
    });
  }

  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      openPhotoModal(image.currentSrc || image.src, image.alt);
    });
  });

  modalClose?.addEventListener("click", closePhotoModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closePhotoModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closePhotoModal();
    }
  });
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
