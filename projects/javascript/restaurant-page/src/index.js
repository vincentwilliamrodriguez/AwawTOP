import "./style.scss";
import HomeElement from "./home/home.js";
import MenuElement from "./menu/menu.js";
import ContactElement from "./contact/contact.js";



const DisplayManager = (function () {
  const contentElement = document.querySelector("#content");

  function init() {
    contentElement.appendChild(ContactElement());
  }

  return {
    init,
  };
})();

DisplayManager.init();