(function updateNavButton() {
  let pageName = this.location.href;
  let navBtns = document
    .getElementById("mainNav")
    .getElementsByClassName("tableEntry");

  if (!pageName.includes("src")) {
    navBtns[0].getElementsByClassName("navButtons")[0].style.cssText =
      "background-color:lightseagreen; color: white";
  } else if (pageName.includes("Feed")) {
    navBtns[1].getElementsByClassName("navButtons")[0].style.cssText =
      "background-color:lightseagreen; color: white";
  } else if (pageName.includes("Table")) {
    navBtns[2].getElementsByClassName("navButtons")[0].style.cssText =
      "background-color:lightseagreen; color: white";
  } else if (pageName.includes("Carousel")) {
    navBtns[3].getElementsByClassName("navButtons")[0].style.cssText =
      "background-color:lightseagreen; color: white";
  } else if (pageName.includes("Contact")) {
    navBtns[4].getElementsByClassName("navButtons")[0].style.cssText =
      "background-color:lightseagreen; color: white";
  } else {
    console.log(pageName);
  }
})();
