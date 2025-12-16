document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("_-4pSAPwOWsQntUCq");

  const form = document.getElementById("contact-form");
  const successBox = form.querySelector(".form-success");
  const submitButton = form.querySelector(".cta-button");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const honeypot = form.company.value;

    if (honeypot) return;
    if (!name) return alert("Prosím vyplňte své jméno.");
    if (!email || !email.includes("@"))
      return alert("Zadejte platnou emailovou adresu.");
    if (!message) return alert("Prosím napište zprávu.");

    submitButton.classList.add("is-disabled");
    submitButton.setAttribute("disabled", "true");

    emailjs.sendForm("service_hbfgbyg", "template_kvor0ii", form).then(
      () => {
        form.reset();
        successBox.classList.add("is-visible");
        successBox.classList.remove("fade-out");

        setTimeout(() => successBox.classList.add("fade-out"), 4000);
        setTimeout(() => {
          successBox.classList.remove("is-visible", "fade-out");
          submitButton.classList.remove("is-disabled");
          submitButton.removeAttribute("disabled");
        }, 4600);
      },
      () => {
        submitButton.classList.remove("is-disabled");
        submitButton.removeAttribute("disabled");
        alert("Odeslání se nezdařilo. Zkuste to prosím později.");
      }
    );
  });
});
