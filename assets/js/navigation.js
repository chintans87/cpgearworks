/* Sticky navigation, mobile menu, active links and configured contact CTAs. */
const siteConfig = window.CPGW_CONFIG || {};
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function getWhatsAppHref() {
  const number = siteConfig.whatsappNumber || "";
  const cleanNumber = number.replace(/\D/g, "");
  if (!cleanNumber) return "#contact";
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage || "")}`;
}

function hydrateConfigText() {
  document.querySelectorAll("[data-config]").forEach((node) => {
    const key = node.getAttribute("data-config");
    if (key && siteConfig[key]) node.textContent = siteConfig[key];
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.setAttribute("href", getWhatsAppHref());
  });

  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.setAttribute("href", siteConfig.email && !siteConfig.email.startsWith("[") ? `mailto:${siteConfig.email}` : "#contact");
  });

  document.querySelectorAll("[data-phone-link]").forEach((link) => {
    link.setAttribute("href", siteConfig.phone && !siteConfig.phone.startsWith("[") ? `tel:${siteConfig.phone.replace(/\s/g, "")}` : "#contact");
  });
}

updateHeader();
hydrateConfigText();
window.addEventListener("scroll", updateHeader, { passive: true });

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}
