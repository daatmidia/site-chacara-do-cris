const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const contactForm = document.querySelector("#contactForm");
const heroSlides = document.querySelectorAll(".hero-slide");
const heroIndicators = document.querySelectorAll(".hero-indicator");
const heroTitle = document.querySelector("#heroTitle");
const heroDescription = document.querySelector("#heroDescription");
const header = document.querySelector(".header");

const heroMessages = [
  {
    title: "Seu evento com elegância e sofisticação em cada detalhe.",
    description:
      "Uma estrutura completa para celebrar com conforto, beleza e alto padrão. Receba atendimento consultivo e uma proposta personalizada para sua data."
  },
  {
    title: "Celebre o amor em um cenário encantador e memorável.",
    description:
      "Jardins, salão climatizado e atendimento dedicado para transformar seu casamento em uma experiência inesquecível."
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

if (menuToggle && mainNav) {
  const navDropdowns = mainNav.querySelectorAll(".nav-dropdown");
  const navDropdownLinks = mainNav.querySelectorAll(".nav-dropdown-link");

  const closeAllDropdowns = () => {
    navDropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
  };

  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  navDropdownLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const dropdown = link.closest(".nav-dropdown");
      if (!dropdown) {
        return;
      }

      event.preventDefault();
      const shouldOpen = !dropdown.classList.contains("open");
      closeAllDropdowns();
      if (shouldOpen) {
        dropdown.classList.add("open");
      }
    });
  });

  mainNav.querySelectorAll(".nav-submenu a").forEach((submenuLink) => {
    submenuLink.addEventListener("click", () => {
      closeAllDropdowns();
      mainNav.classList.remove("open");
    });
  });

  document.addEventListener("click", (event) => {
    if (!mainNav.contains(event.target)) {
      closeAllDropdowns();
    }
  });

  mainNav.querySelectorAll('a[href^="#"]:not(.nav-dropdown-link)').forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      closeAllDropdowns();
    });
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

  const updateHeroMessage = (slideIndex) => {
    if (!heroTitle || !heroDescription || !heroMessages[slideIndex]) {
      return;
    }

    heroTitle.textContent = heroMessages[slideIndex].title;
    heroDescription.textContent = heroMessages[slideIndex].description;
  };

  updateHeroMessage(currentSlide);

  setInterval(() => {
    heroSlides[currentSlide].classList.remove("active");
    if (heroIndicators[currentSlide]) {
      heroIndicators[currentSlide].classList.remove("active");
    }
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add("active");
    if (heroIndicators[currentSlide]) {
      heroIndicators[currentSlide].classList.add("active");
    }
    updateHeroMessage(currentSlide);
  }, 4500);
}

const revealItems = document.querySelectorAll(".reveal");

if (header) {
  const updateHeaderOnScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
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
