document.addEventListener("DOMContentLoaded", () => {

  const profile = getData("mymoney_profile");

  const path = window.location.pathname;

  const isHomePage =
    path.endsWith("/") ||
    path.endsWith("index.html");

  if (isHomePage) {

    if (profile) {
      window.location.href = "pages/dashboard.html";
    } else {
      window.location.href = "pages/setup.html";
    }

  }

});
