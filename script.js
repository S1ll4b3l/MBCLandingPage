document.addEventListener("DOMContentLoaded", function () {
  // Toggle menu responsive
  document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("nav-links").classList.toggle("show");
  });

  // Animasi fade-in saat scroll
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  fadeEls.forEach((el) => observer.observe(el));

  // Form contact submission via Formspree
  const form = document.getElementById("contactForm");
  const responseDiv = document.getElementById("formResponse");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("https://formspree.io/f/mnnvrggg", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          responseDiv.innerHTML =
            "<p style='color:green;'>Pesan berhasil dikirim. Terima kasih!</p>";
          form.reset();
        } else {
          return response.json().then((data) => {
            if (data.errors) {
              responseDiv.innerHTML = `<p style='color:red;'>Gagal: ${data.errors
                .map((e) => e.message)
                .join(", ")}</p>`;
            } else {
              responseDiv.innerHTML =
                "<p style='color:red;'>Terjadi kesalahan. Silakan coba lagi.</p>";
            }
          });
        }
      })
      .catch(() => {
        responseDiv.innerHTML =
          "<p style='color:red;'>Terjadi kesalahan jaringan.</p>";
      });
  });
});
