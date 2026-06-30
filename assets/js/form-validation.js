/* Frontend-only enquiry form validation with a future integration boundary. */
const enquiryForms = document.querySelectorAll("[data-enquiry-form]");

function validateField(field) {
  const wrapper = field.closest(".field");
  const error = wrapper?.querySelector(".field-error");
  let message = "";

  if (field.hasAttribute("required") && !field.value.trim()) {
    message = "This field is required.";
  } else if (field.type === "email" && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    message = "Enter a valid email address.";
  } else if (field.name === "phone" && field.value && field.value.replace(/\D/g, "").length < 7) {
    message = "Enter a valid phone number.";
  }

  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (error) error.textContent = message;
  return !message;
}

enquiryForms.forEach((form) => {
  const status = form.querySelector("[data-form-status]");
  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const validationResults = Array.from(fields).map(validateField);
    const valid = validationResults.every(Boolean);
    if (!valid) {
      status.textContent = "Please correct the highlighted fields.";
      status.className = "form-status is-error";
      return;
    }

    status.textContent = "Thank you. This is a Version 1.0 placeholder; backend enquiry delivery can be connected later.";
    status.className = "form-status is-success";
    form.reset();
  });
});
