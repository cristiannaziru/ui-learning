var pages = document.getElementsByClassName("tableEntry");

function changeNavPage(page) {
  for (let i = 0; i < pages.length; i++) {
    pages[i].className = "tableEntry";
  }

  pages[page].className = "tableEntry onPage";
}
