document.addEventListener("DOMContentLoaded", () => {

  const profile = getData("mymoney_profile");

  const path = window.location.pathname;

  if (
    path === "/mymoney/" ||
    path.endsWith("index.html")
  ) {

    if (profile) {
      window.location.href = "./pages/dashboard.html";
    } else {
      window.location.href = "./pages/setup.html";
    }

  }

});
