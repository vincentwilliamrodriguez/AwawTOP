export function makeElement(tagName, classes, textContent="", attributes={}) {
  const element = document.createElement(tagName);

  if (classes !== "") {
    element.classList.add(...classes.split(" "));
  }

  const node = document.createTextNode(textContent);
  element.appendChild(node);
  
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  return element;
}