document.addEventListener("DOMContentLoaded", () => {

  const profile = getData("mymoney_profile");

  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/pages/setup.html"
  ) {

    if (profile) {
      window.location.href = "pages/dashboard.html";
    } else {
      window.location.href = "pages/setup.html";
    }

  }

});
