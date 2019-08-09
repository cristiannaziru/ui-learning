var pages = document.getElementsByClassName("tableEntry");

function changePage(page) {
  for (let i = 0; i < pages.length; i++) {
    pages[i].className = "tableEntry";
  }

  pages[page].className = "tableEntry onPage";
}
