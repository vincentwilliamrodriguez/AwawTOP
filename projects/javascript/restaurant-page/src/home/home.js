import * as Helper from "../helper.js";

export default function HomeElement() {
  const container = Helper.makeElement("div", "home");
  container.append(
    Helper.makeElement("img", "home__logo", "", {src: require("./logo.png")}),
    Helper.makeElement("h2", "home__tagline", "Los Pollos Hermanos, where something delicious is always cooking."),
    Helper.makeElement("p", "home__description", "\"The finest ingredients are brought together with love and care, then slow cooked to perfection. Yes, the old ways are still best at Los Pollos Hermanos. But don't take our word for it. One taste, and you'll know.\"")
  );
  return container;
}