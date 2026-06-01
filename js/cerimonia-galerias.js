const galleryPickerSection = document.querySelector("#galerias-espaco");

if (galleryPickerSection) {
  const pickerCards = galleryPickerSection.querySelectorAll(".gallery-picker-card");
  const panels = galleryPickerSection.querySelectorAll(".gallery-view-panel");
  const pickerGrid = galleryPickerSection.querySelector(".gallery-picker-grid");

  const closeAllPanels = () => {
    panels.forEach((panel) => {
      panel.hidden = true;
    });
    pickerCards.forEach((card) => {
      card.classList.remove("active");
      card.setAttribute("aria-selected", "false");
    });
    pickerGrid?.classList.remove("is-hidden");
  };

  const openGallery = (galleryId) => {
    const panel = galleryPickerSection.querySelector(`#galeria-${galleryId}`);
    const card = galleryPickerSection.querySelector(`[data-gallery="${galleryId}"]`);

    if (!panel || !card) {
      return;
    }

    closeAllPanels();
    card.classList.add("active");
    card.setAttribute("aria-selected", "true");
    panel.hidden = false;
    pickerGrid?.classList.add("is-hidden");

    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  pickerCards.forEach((card) => {
    card.addEventListener("click", () => {
      openGallery(card.dataset.gallery);
    });
  });

  galleryPickerSection.querySelectorAll(".gallery-view-back").forEach((backButton) => {
    backButton.addEventListener("click", () => {
      closeAllPanels();
      pickerGrid?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const hash = window.location.hash.replace("#", "");

  if (hash === "galerias-espaco") {
    galleryPickerSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const validGalleries = ["cerimonia-ar-livre", "deck", "salao", "gourmet"];

  if (validGalleries.includes(hash)) {
    openGallery(hash);
  }
}

const cerimoniaGalleryTriggers = document.querySelectorAll(".photo-gallery-trigger");

if (cerimoniaGalleryTriggers.length > 0) {
  const closeCerimoniaPanels = () => {
    document.querySelectorAll(".cerimonia-gallery-panel").forEach((panel) => {
      panel.hidden = true;
    });
    cerimoniaGalleryTriggers.forEach((trigger) => {
      trigger.classList.remove("is-active");
      trigger.setAttribute("aria-expanded", "false");
    });
  };

  const toggleCerimoniaPanel = (trigger) => {
    const panelId = trigger.dataset.galleryPanel;
    const panel = panelId ? document.getElementById(panelId) : null;

    if (!panel) {
      return;
    }

    const shouldOpen = panel.hidden;

    closeCerimoniaPanels();

    if (shouldOpen) {
      panel.hidden = false;
      trigger.classList.add("is-active");
      trigger.setAttribute("aria-expanded", "true");
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  cerimoniaGalleryTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleCerimoniaPanel(trigger);
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCerimoniaPanel(trigger);
      }
    });
  });

  const hashPanels = {
    "#deck": "deck-gallery-panel",
    "#cerimonia-ar-livre": "cerimonia-ar-livre-gallery-panel"
  };

  const panelId = hashPanels[window.location.hash];

  if (panelId) {
    const trigger = document.querySelector(`[data-gallery-panel="${panelId}"]`);
    if (trigger) {
      toggleCerimoniaPanel(trigger);
    }
  }
}
