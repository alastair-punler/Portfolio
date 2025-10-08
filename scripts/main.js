import { SITE_DATA } from "./data.js";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea",
  "input",
  "select",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

document.addEventListener("DOMContentLoaded", () => {
  const elements = cacheDom();
  const state = {
    progress: 0,
    autoFrom: 0,
    autoStartTime: 0,
    autoDuration: 5000,
    autoFrame: null,
    isAutoDrilling: false,
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)"),
    heroMetrics: {
      top: 0,
      height: 1,
      strataHeight: 1,
      bitHeight: 1
    },
    layerBadges: Array.from(elements.layerBadges).map((badge) => ({
      el: badge,
      depth: Number.parseFloat(badge.dataset.depth || "0")
    })),
    isReducedSequence: false,
    modalFocusTrap: {
      lastFocused: null,
      focusables: []
    }
  };

  renderContent(elements, SITE_DATA);
  updateLastUpdated(elements);
  initThemeToggle(elements);
  initSmoothScroll(elements);
  initNavHighlight(elements);
  initProjectsModal(elements, state);
  initCopyEmail(elements);
  initDrillInteraction(elements, state);
});

function cacheDom() {
  return {
    root: document.documentElement,
    body: document.body,
    tagline: document.querySelector("[data-tagline]"),
    heroDescription: document.querySelector("[data-hero-description]"),
    drillButton: document.querySelector("[data-drill-button]"),
    resetButton: document.querySelector("[data-reset-button]"),
    hero: document.querySelector("[data-hero]"),
    strata: document.querySelector("[data-strata]"),
    tunnel: document.querySelector("[data-tunnel]"),
    bit: document.querySelector("[data-bit]"),
    layerBadges: document.querySelectorAll("[data-layer-badge]"),
    aboutBio: document.querySelector("[data-bio]"),
    cvLink: document.querySelector("[data-cv-link]"),
    skillsGrid: document.querySelector("[data-skills-grid]"),
    projectsGrid: document.querySelector("[data-projects-grid]"),
    linkedin: document.querySelector("[data-linkedin]"),
    github: document.querySelector("[data-github]"),
    navLinks: document.querySelectorAll("[data-nav-link]"),
    sections: document.querySelectorAll("main > section"),
    themeToggle: document.querySelector("[data-theme-toggle]"),
    updated: document.querySelector("[data-updated]"),
    toast: document.querySelector("[data-toast]"),
    modal: document.querySelector("[data-modal]"),
    modalOverlay: document.querySelector("[data-modal-overlay]"),
    modalDialog: document.querySelector("[data-modal] .modal__dialog"),
    modalClose: document.querySelector("[data-modal-close]"),
    modalTitle: document.querySelector("[data-modal-title]"),
    modalDescription: document.querySelector("[data-modal-description]"),
    modalTech: document.querySelector("[data-modal-tech]"),
    modalImage: document.querySelector("[data-modal-image]"),
    modalGithub: document.querySelector("[data-modal-github]"),
    modalLive: document.querySelector("[data-modal-live]")
  };
}

function renderContent(els, data) {
  if (els.tagline) {
    els.tagline.textContent = data.tagline;
  }
  if (els.heroDescription) {
    els.heroDescription.textContent = data.bio;
  }
  if (els.aboutBio) {
    els.aboutBio.textContent = data.bio;
  }
  if (els.cvLink) {
    els.cvLink.href = data.links.cvUrl || "#";
  }
  if (els.skillsGrid) {
    els.skillsGrid.innerHTML = "";
    data.skills.forEach((skill) => {
      const li = document.createElement("li");
      li.className = "skills-grid__item";
      li.textContent = skill;
      els.skillsGrid.appendChild(li);
    });
  }
  if (els.linkedin) {
    els.linkedin.href = data.links.linkedin || "#";
  }
  if (els.github) {
    els.github.href = data.links.github || "#";
  }
  if (els.projectsGrid) {
    els.projectsGrid.innerHTML = "";
    data.projects.forEach((project, index) => {
      const article = document.createElement("article");
      article.className = "project-card";
      article.innerHTML = `
        <button type="button" class="project-card__inner" data-project-index="${index}">
          <figure class="project-card__media">
            <img src="${project.image}" alt="${project.title} thumbnail" loading="lazy" width="240" height="160">
          </figure>
          <div class="project-card__content">
            <h3>${project.title}</h3>
            <p>${project.short}</p>
            <ul class="project-card__tech">
              ${project.tech.map((tech) => `<li>${tech}</li>`).join("")}
            </ul>
          </div>
        </button>
      `;
      els.projectsGrid.appendChild(article);
    });
  }
}

function updateLastUpdated(els) {
  if (!els.updated) return;
  const formatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  els.updated.textContent = `Last updated ${formatter.format(new Date())}`;
}

function initThemeToggle(els) {
  const { root, themeToggle } = els;
  if (!root || !themeToggle) return;

  const storageKey = "portfolio-theme";
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  let theme = window.localStorage.getItem(storageKey);
  if (!theme) {
    theme = systemPrefersDark.matches ? "dark" : "light";
  }
  applyTheme(theme);

  themeToggle.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    window.localStorage.setItem(storageKey, theme);
  });

  systemPrefersDark.addEventListener("change", (event) => {
    if (!window.localStorage.getItem(storageKey)) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

  function applyTheme(nextTheme) {
    root.dataset.theme = nextTheme;
    const isDark = nextTheme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.textContent = isDark ? "Switch to light theme" : "Switch to dark theme";
  }
}

function initSmoothScroll(els) {
  const { navLinks } = els;
  if (!navLinks) return;

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      const section = document.querySelector(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initNavHighlight(els) {
  const { navLinks, sections } = els;
  if (!navLinks || !sections) return;

  const linkMap = new Map();
  navLinks.forEach((link) => {
    linkMap.set(link.getAttribute("href"), link);
  });

  const trackedSections = Array.from(sections).filter((section) =>
    linkMap.has(`#${section.id}`)
  );

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight * 0.25;
    let activeId = navLinks[0]?.getAttribute("href") || "";

    trackedSections.forEach((section) => {
      const top = section.offsetTop;
      if (scrollPosition >= top) {
        activeId = `#${section.id}`;
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === activeId) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("is-active");
        link.removeAttribute("aria-current");
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

function initProjectsModal(els, state) {
  const {
    modal,
    modalOverlay,
    modalClose,
    projectsGrid,
    modalTitle,
    modalDescription,
    modalImage,
    modalTech,
    modalGithub,
    modalLive,
    body
  } = els;
  if (
    !modal ||
    !modalOverlay ||
    !modalClose ||
    !projectsGrid ||
    !modalTitle ||
    !modalDescription ||
    !modalImage ||
    !modalTech ||
    !modalGithub ||
    !modalLive
  ) {
    return;
  }

  projectsGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project-index]");
    if (!button) return;
    const index = Number.parseInt(button.dataset.projectIndex, 10);
    const project = SITE_DATA.projects[index];
    if (!project) return;
    openModal(project);
  });

  modalOverlay.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  function openModal(project) {
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description || project.short;
    modalImage.src = project.image;
    modalImage.alt = `${project.title} thumbnail`;

    modalTech.innerHTML = "";
    project.tech.forEach((tech) => {
      const li = document.createElement("li");
      li.textContent = tech;
      modalTech.appendChild(li);
    });

    modalGithub.href = project.github || "#";
    modalGithub.classList.toggle("is-disabled", !project.github);
    if (project.github) {
      modalGithub.removeAttribute("aria-hidden");
      modalGithub.removeAttribute("tabindex");
    } else {
      modalGithub.setAttribute("aria-hidden", "true");
      modalGithub.setAttribute("tabindex", "-1");
    }

    if (project.live) {
      modalLive.href = project.live;
      modalLive.classList.remove("is-disabled");
      modalLive.removeAttribute("aria-hidden");
      modalLive.removeAttribute("tabindex");
    } else {
      modalLive.href = "#";
      modalLive.classList.add("is-disabled");
      modalLive.setAttribute("aria-hidden", "true");
      modalLive.setAttribute("tabindex", "-1");
    }

    state.modalFocusTrap.lastFocused = document.activeElement;
    state.modalFocusTrap.focusables = Array.from(modal.querySelectorAll(focusableSelector));

    modal.removeAttribute("aria-hidden");
    modal.classList.add("is-open");
    body.classList.add("has-modal-open");

    const firstFocusable = state.modalFocusTrap.focusables[0];
    if (firstFocusable) {
      firstFocusable.focus();
    }

    modal.addEventListener("keydown", trapFocus);
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("is-open");
    body.classList.remove("has-modal-open");
    modal.removeEventListener("keydown", trapFocus);
    if (state.modalFocusTrap.lastFocused) {
      state.modalFocusTrap.lastFocused.focus();
    }
  }

  function trapFocus(event) {
    if (event.key !== "Tab") return;
    const { focusables } = state.modalFocusTrap;
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

function initCopyEmail(els) {
  const { toast } = els;
  const copyButton = document.querySelector("[data-copy-email]");
  if (!copyButton || !toast) return;

  copyButton.addEventListener("click", async () => {
    const email = SITE_DATA.email;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        fallbackCopy(email);
      }
      showToast(toast, "Email copied to clipboard.");
    } catch (error) {
      showToast(toast, "Unable to copy. Try manually.");
    }
  });
}

function fallbackCopy(text) {
  const input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}

function showToast(toast, message) {
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add("is-visible");
  window.clearTimeout(toast.hideTimeout);
  toast.hideTimeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    toast.hidden = true;
  }, 2400);
}

function initDrillInteraction(els, state) {
  const { hero, strata, bit, tunnel, drillButton, resetButton, layerBadges } = els;
  if (!hero || !strata || !bit || !tunnel) return;

  const measure = () => {
    const rect = hero.getBoundingClientRect();
    state.heroMetrics.top = rect.top + window.scrollY;
    state.heroMetrics.height = hero.offsetHeight;
    state.heroMetrics.strataHeight = strata.offsetHeight;
    state.heroMetrics.bitHeight = bit.offsetHeight;
  };

  const onScroll = () => {
    if (state.reduceMotion.matches || state.isAutoDrilling) return;
    requestAnimationFrame(() => {
      const progress = calculateScrollProgress(state.heroMetrics);
      applyDrillProgress(progress);
    });
  };

  const onResize = () => {
    measure();
    applyDrillProgress(state.progress);
  };

  const onReduceMotionChange = () => {
    if (state.reduceMotion.matches) {
      applyReducedMotionState();
    } else {
      resetBadgeVisibility();
      applyDrillProgress(0);
    }
  };

  const calculateScrollProgress = (metrics) => {
    const viewportProbe = window.scrollY + window.innerHeight * 0.2;
    const raw = (viewportProbe - metrics.top) / metrics.height;
    return clamp(raw, 0, 1);
  };

  const applyDrillProgress = (progress) => {
    state.progress = clamp(progress, 0, 1);
    const maxTravel = state.heroMetrics.strataHeight - state.heroMetrics.bitHeight;
    const translateY = maxTravel * state.progress;
    bit.style.transform = `translateY(${translateY}px)`;
    tunnel.style.height = `${Math.round(state.progress * 100)}%`;
    updateLayerBadges(state);
  };

  const updateLayerBadges = (localState) => {
    if (localState.isReducedSequence) {
      return;
    }
    const bitDepth = localState.heroMetrics.strataHeight * localState.progress;
    localState.layerBadges.forEach(({ el, depth }, index) => {
      if (bitDepth >= depth) {
        el.classList.add("is-revealed");
        el.style.transitionDelay = `${index * 80}ms`;
      } else {
        el.classList.remove("is-revealed");
        el.style.transitionDelay = "0ms";
      }
    });
  };

  const runAutoDrill = () => {
    cancelAnimationFrame(state.autoFrame);
    state.autoFrom = state.progress;
    state.autoStartTime = performance.now();
    state.isAutoDrilling = true;
    const duration = state.autoDuration;

    const step = (now) => {
      const elapsed = now - state.autoStartTime;
      const t = clamp(elapsed / duration, 0, 1);
      const eased = easeInOutCubic(t);
      const progress = state.autoFrom + (1 - state.autoFrom) * eased;
      applyDrillProgress(progress);

      if (t < 1) {
        state.autoFrame = requestAnimationFrame(step);
      } else {
        state.isAutoDrilling = false;
      }
    };

    state.autoFrame = requestAnimationFrame(step);
  };

  const cancelAutoDrill = () => {
    if (state.isAutoDrilling) {
      cancelAnimationFrame(state.autoFrame);
      state.isAutoDrilling = false;
    }
  };

  const resetBadgeVisibility = () => {
    state.layerBadges.forEach(({ el }) => {
      el.classList.remove("is-revealed");
      el.style.transitionDelay = "0ms";
    });
    state.isReducedSequence = false;
  };

  const applyReducedMotionState = () => {
    cancelAutoDrill();
    state.isReducedSequence = true;
    resetBadgeVisibility();
    applyDrillProgress(1);
    state.layerBadges.forEach(({ el }, index) => {
      window.setTimeout(() => {
        el.classList.add("is-revealed");
      }, index * 180);
    });
    window.setTimeout(() => {
      state.isReducedSequence = false;
    }, state.layerBadges.length * 180 + 220);
  };

  drillButton?.addEventListener("click", () => {
    if (state.reduceMotion.matches) {
      applyReducedMotionState();
      return;
    }
    runAutoDrill();
  });

  resetButton?.addEventListener("click", () => {
    cancelAutoDrill();
    resetBadgeVisibility();
    applyDrillProgress(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  state.reduceMotion.addEventListener("change", onReduceMotionChange);

  measure();
  if (bit instanceof HTMLImageElement && !bit.complete) {
    bit.addEventListener("load", measure, { once: true });
  }

  if (state.reduceMotion.matches) {
    applyReducedMotionState();
  } else {
    applyDrillProgress(0);
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
