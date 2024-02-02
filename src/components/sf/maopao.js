const arr = [5,3, 2, 1,4];

const fn = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let flag = true
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    if(flag) {
      break
    }
    console.log(`当前arr：${arr},第${i+1}趟`);
  }
  return arr;
};
const newArr = fn(arr);
console.log(newArr);
