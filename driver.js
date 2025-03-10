import { Tree } from "./main.js";

function randomNumsArr() {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    let num = Math.floor(Math.random() * 100) + 1;
    arr.push(num);
  }
  return arr;
}

const test = new Tree(randomNumsArr());

test.insert(199);
test.insert(2575);
test.insert(6871);

test.prettyPrint();
console.log(test.isBalanced());

test.reBalance();
test.prettyPrint();
console.log(test.isBalanced());
