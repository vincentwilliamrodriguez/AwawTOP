import * as Helper from "../helper.js";

export default function MenuElement () {
  class Option {
    constructor(name, description, imageName) {
      this.name = name;
      this.description = description;
      this.imageName = imageName;
    }

    getElement() {
      const optionDiv = Helper.makeElement("div", "option");
      optionDiv.append(
        Helper.makeElement("img", "option__image", "", {src: require(`./${this.imageName}`)}),
        Helper.makeElement("h1", "option__name", this.name),
        Helper.makeElement("p", "option__description", this.description),
      );
      return optionDiv;
    }
  }

  const options = [
    new Option("Pollos-style Fried Chicken", "Enjoy our original chicken cooked to perfection for your needs.", "pollos-style-chicken.jpg"),
    new Option("Curly Fries", "t may not be truly curly, but our fries contains a secret ingredient spices things up!", "curly-fries.jpg"),
    new Option("Egg Sandwich", "This sandwich made from fresh Pollos eggs is sure to tickle your taste buds.", "egg-sandwich.jpg"),
    new Option("Veggie Bacon Burger", "Have a son that loves veggies for breakfast? Our Veggie Bacon Burger has you covered!", "veggie-bacon-burger.jpg"),
    new Option("Homemade Iced Tea", "Sourced from the natural leaves of Mexico, this iced tea is deemed to be 99.1% pure!", "homemade-iced-tea.jpg"),
    new Option("Mug Root Beer", "Unleash your inner dog with this classic carbonated root beer by Pepsi.", "mug-root-beer.png"),
  ];

  const children = [];
  options.forEach(option => {
    children.push(option.getElement());
  });

  children.splice(0, 0, Helper.makeElement("h1", "menu__section", "Food"));
  children.splice(5, 0, Helper.makeElement("h1", "menu__section", "Drinks"));

  const container = Helper.makeElement("div", "menu");
  container.append(...children);

  return container;
}