import "./style.scss";
import HomeElement from "./home/home.js";
import MenuElement from "./menu/menu.js";
import ContactElement from "./contact/contact.js";



const DisplayManager = (function () {
  const contentElement = document.querySelector("#content");
  const tabs = {
    home: {
      button: document.querySelector("#home-btn"),
      tabElement: HomeElement
    },
    menu: {
      button: document.querySelector("#menu-btn"),
      tabElement: MenuElement
    },
    contact: {
      button: document.querySelector("#contact-btn"),
      tabElement: ContactElement
    },
  }

  function init() {
    for (const [tabName, tabData] of Object.entries(tabs)) {
      tabData.button.addEventListener("click", (e) => {
        updateTab(tabName);
      });
    }

    updateTab("home");
  }

  function updateTab(tabName) {
    document.querySelector(".navbar__btn--active").classList.remove("navbar__btn--active");
    tabs[tabName].button.classList.add("navbar__btn--active");

    contentElement.innerHTML = "";
    contentElement.appendChild(tabs[tabName].tabElement());
  }

  return {
    init,
  };
})();

DisplayManager.init();