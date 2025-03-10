class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
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

  calculateHeight(node) {
    if (node === null) return -1;

    const leftNode = this.calculateHeight(node.left);
    const rightNode = this.calculateHeight(node.right);

    return 1 + Math.max(leftNode, rightNode);
  }

  calculateDepth(currentNode, taget, depthSoFar) {
    if (currentNode === taget) return depthSoFar;

    if (taget.data < currentNode.data) {
      return this.calculateDepth(currentNode.left, taget, depthSoFar + 1);
    } else {
      return this.calculateDepth(currentNode.right, taget, depthSoFar + 1);
    }
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
      return this.find(value, node.left);
    } else if (value > node.data) {
      return this.find(value, node.right);
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

  height(value) {
    const node = this.find(value);
    if (!node) return null;

    return this.calculateHeight(node);
  }

  depth(value) {
    const node = this.find(value);
    if (!node) return -1;

    return this.calculateDepth(this.root, node, 0);
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    let leftHeight = node.left ? this.height(node.left.data) : -1;
    let rightHeight = node.right ? this.height(node.right.data) : -1;

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  reBalance() {
    let arr = [];
    this.inOrder((item) => arr.push(item));
    this.root = this.buildTree(arr, 0, arr.length - 1);
  }
}
