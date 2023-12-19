// your JavaScript file
const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

container.appendChild(content);


const paragraph = document.createElement("p");
paragraph.style.color = "red";
paragraph.textContent = "Hey I'm red!";

container.appendChild(paragraph);


const header = document.createElement("h3");
header.style.color = "blue";
header.textContent = "I'm a blue h3!";

container.appendChild(header);


const div = document.createElement("div");
div.style.cssText = "border: 1px solid black; background-color: pink;"

const childHeader = document.createElement("h1");
const childParagraph = document.createElement("p");
childHeader.textContent = "I'm in a div";
childParagraph.textContent = "ME TOO!";

div.appendChild(childHeader);
div.appendChild(childParagraph);
container.appendChild(div);



const buttonList = document.querySelectorAll('button');

for (const btn of buttonList){
  btn.addEventListener('click', (e) => {
    alert("Hello Awaw!");
    e.target.style.background = 'blue';
  });
};
