import mergeSort from './merge-sort.js';

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export default class Tree {
  root = null;

  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = mergeSort(array);
    const root = buildTreeRec(sortedArray, 0, sortedArray.length - 1);
    return root;

    function buildTreeRec(array, start, end) {
      if (start > end) {
        return null;
      }

      const mid = parseInt((start + end) / 2);
      const leftNode = buildTreeRec(array, start, mid - 1);
      const rightNode = buildTreeRec(array, mid + 1, end);

      return new Node(array[mid], leftNode, rightNode);
    }
  }

  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) {
      return null;
    }

    if (value < node.data)        node.left = this.deleteItem(value, node.left);
    else if (value > node.data)   node.right = this.deleteItem(value, node.right);
    else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        const successor = this.getInorderSuccessor(node);
        node.data = successor.data;
        node.right = this.deleteItem(successor.data, node.right);
      }
    }

    return node;
  }

  getInorderSuccessor(node) {
    let temp = node.right;
    let prev = null;

    while (temp !== null) {
      prev = temp;
      temp = temp.left;
    }

    return prev;
  }

  find(value, node = this.root) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      return this.find(value, node.left);
    } else if (value > node.data) {
      return this.find(value, node.right);
    }

    return node;
  }

  levelOrder(callback = null) {
    const queue = [this.root];
    const res = [];

    while (queue.length > 0) {
      const cur = queue.shift();

      if (callback === null) {
        res.push(cur.data);
      } else {
        callback(cur);
      }

      if (cur.left !== null)  queue.push(cur.left);
      if (cur.right !== null) queue.push(cur.right);
    }

    if (callback === null) {
      return res;
    }
  }

  inOrder(callback = null, node = this.root) {
    if (node === null) {
      return [];
    }

    if (callback === null) {
      return this.inOrder(callback, node.left)
                  .concat([node.data])
                  .concat(this.inOrder(callback, node.right));

    } else {
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    }
  }

  preOrder(callback = null, node = this.root) {
    if (node === null) {
      return [];
    }

    if (callback === null) {
      return [node.data]
                .concat(this.preOrder(callback, node.left))
                .concat(this.preOrder(callback, node.right));

    } else {
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }
  }

  postOrder(callback = null, node = this.root) {
    if (node === null) {
      return [];
    }

    if (callback === null) {
      return this.postOrder(callback, node.left)
                  .concat(this.postOrder(callback, node.right))
                  .concat([node.data]);

    } else {
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
    }
  }

  height(node = this.root, edges = 0) {
    if (node === null) {
      return edges - 1;
    }

    const leftMax = this.height(node.left, edges + 1);
    const rightMax = this.height(node.right, edges + 1);

    return Math.max(leftMax, rightMax);
  }

  depth(node, root = this.root, edges = 0) {
    if (root === null) {
      return -1;
    }

    if (node.data === root.data) {
      return edges;
    } else {
      const leftMax = this.depth(node, root.left, edges + 1);
      const rightMax = this.depth(node, root.right, edges + 1);

      return Math.max(leftMax, rightMax);
    }
  }

  isBalanced() {}

  rebalance() {}
}
