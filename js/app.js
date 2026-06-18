document.addEventListener("DOMContentLoaded", () => {

  console.log("APP JALAN");

  const profile = getData("mymoney_profile");

  console.log("PROFILE:", profile);

  console.log("PATH:", window.location.pathname);

  const path = window.location.pathname;

  const isHomePage =
    path.endsWith("/") ||
    path.endsWith("index.html");

  console.log("IS HOMEPAGE:", isHomePage);

  if (isHomePage) {

    if (profile) {
      console.log("KE DASHBOARD");
      window.location.href = "pages/dashboard.html";
    } else {
      console.log("KE SETUP");
      window.location.href = "pages/setup.html";
    }

  }

});
