import Tree from './tree.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const generateRandNums = (quantity) => {
  const res = [];

  while (res.length < quantity) {
    const n = parseInt(Math.random() * 100);

    if (!res.includes(n)) {
      res.push(n);
    }
  }

  return res;
};

const blue = '\x1b[34m';
const green = '\x1b[32m';
const reset = '\x1b[0m';

const awawTree = new Tree(generateRandNums(9));

console.log();
prettyPrint(awawTree.root);
console.log(`\n${green}Is it balanced?: ${blue}${awawTree.isBalanced()}${reset}`);
console.log(`${green}Level Order: ${blue}${awawTree.levelOrder()}${reset}`);
console.log(`${green}Pre Order: ${blue}${awawTree.preOrder()}${reset}`);
console.log(`${green}Post Order: ${blue}${awawTree.postOrder()}${reset}`);
console.log(`${green}In Order: ${blue}${awawTree.inOrder()}${reset}\n`);

console.log(`${blue}Adding some numbers...${reset}\n`)
awawTree.insert(314);
awawTree.insert(9999);
awawTree.insert(101);
awawTree.insert(1337);
prettyPrint(awawTree.root);

console.log(`\n${green}Is it balanced?: ${blue}${awawTree.isBalanced()}${reset}`);

console.log(`${blue}Initiate rebalancing...${reset}\n`)
awawTree.rebalance();
prettyPrint(awawTree.root);

console.log(`\n${green}Is it balanced now?: ${blue}${awawTree.isBalanced()}${reset}`);
console.log(`${green}Level Order: ${blue}${awawTree.levelOrder()}${reset}`);
console.log(`${green}Pre Order: ${blue}${awawTree.preOrder()}${reset}`);
console.log(`${green}Post Order: ${blue}${awawTree.postOrder()}${reset}`);
console.log(`${green}In Order: ${blue}${awawTree.inOrder()}${reset}\n`);

