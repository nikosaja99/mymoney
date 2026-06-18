function formatRupiah(angka) {

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR"
    }
  ).format(angka);

}

function setActiveMenu() {
  const path = window.location.pathname;

  document.querySelectorAll("nav a, .fixed a").forEach(a => {
    a.classList.remove("text-blue-600");
    a.classList.add("text-gray-500");

    if (a.getAttribute("href") && path.includes(a.getAttribute("href"))) {
      a.classList.add("text-blue-600");
      a.classList.remove("text-gray-500");
    }
  });
}

document.addEventListener("DOMContentLoaded", setActiveMenu);