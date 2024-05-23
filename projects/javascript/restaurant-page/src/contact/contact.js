import * as Helper from "../helper.js";

{/* <div class="contact">
  <div class="field">
    <img src="<%=require('./contact/email.svg')%>"" class="field__icon">
    <p class="field__value">totally-real-email@pollos.org</p>
  </div>
  <div class="field">
    <img src="<%=require('./contact/phone.svg')%>"" class="field__icon">
    <p class="field__value">0123-456-7890</p>
  </div>
  <div class="field">
    <img src="<%=require('./contact/location.svg')%>"" class="field__icon">
    <p class="field__value">12100 Coors Rd SW, Albuquerque, New Mexico 87045</p>
  </div>

  
  <a target="_blank" href="https://www.thegrocer.co.uk/bogof/breaking-bads-chicken-shop-los-pollos-hermanos-wins-fictional-food-fight/599861.article">
    <img src="<%=require('./contact/front.jpg')%>" alt="Front image of Pollos" class="contact__front">
  </a>
</div> */}

export default function MenuElement () {
  class Field {
    constructor(iconName, value) {
      this.iconName = iconName;
      this.value = value;
    }

    getElement() {
      const fieldDiv = Helper.makeElement("div", "field");
      fieldDiv.append(
        Helper.makeElement("img", "field__icon", "", {src: require(`./${this.iconName}`)}),
        Helper.makeElement("p", "field__value", this.value),
      );
      return fieldDiv;
    }
  }

  const fields = [
    new Field("email.svg", "totally-real-email@pollos.org"),
    new Field("phone.svg", "0123-456-7890"),
    new Field("location.svg", "12100 Coors Rd SW, Albuquerque, New Mexico 87045"),
  ];

  const anchorWrapper = Helper.makeElement("a","", "", {
    target: "_blank", 
    href: "https://www.thegrocer.co.uk/bogof/breaking-bads-chicken-shop-los-pollos-hermanos-wins-fictional-food-fight/599861.article"
  });

  const frontImg = Helper.makeElement("img", "contact__front", "", {
    src: require("./front.jpg"), 
    alt: "Front image of Pollos"
  });

  anchorWrapper.appendChild(frontImg);

  const container = Helper.makeElement("div", "contact");
  container.append(...fields.map((field) => field.getElement()));
  container.appendChild(anchorWrapper);

  return container;
}