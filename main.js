class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const UniqueSortedArr = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(UniqueSortedArr, 0, UniqueSortedArr.length - 1);
  }

  minValue(node) {
    let currentNode = node;
    if (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  // ---------- public ----------

  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (value === node.data) {
      return node;
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  remove(value, node = this.root) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.remove(value, node.left);
    } else if (value > node.data) {
      node.right = this.remove(value, node.right);
    } else {
      // case 1: no sub-node or 1 sub-node
      if (node.left === null) {
        return node.right;
      } else if (node.left === null) {
        return node.left;
      }

      //case 2: 2 sub-node
      const minValue = this.minValue(node.right);
      node.data = minValue;

      node.right = this.remove(minValue, node.right);
    }

    return node;
  }

  find(value, node = this.root) {
    if (!node) return null;

    if (node.data === value) {
      return node;
    }

    if (value < node.data) {
      return (node.left = this.find(value, node.left));
    } else if (value > node.data) {
      return (node.right = this.find(value, node.right));
    }
  }

  levelOrder(callback = null) {
    if (!callback) throw new Error("callback required");

    let queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      callback(currentNode.data);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error("callback is required");
    if (node === null) return;

    callback(node.data);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error("callback is required");
    if (node === null) return;

    this.inOrder(callback, node.left);
    callback(node.data);
    this.inOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw new Error("callback is required");
    if (node === null) return;

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node.data);
  }
}

//test case
const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

//display tree for debuging
test.prettyPrint();
