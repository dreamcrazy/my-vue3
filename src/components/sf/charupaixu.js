//插入排序 -- 会打扑克的同学应该很熟悉这个排序法，每次摸牌的时候都去手里面已经排好序的牌里面比较下，
// 找到它的位置，插入进去。这个查找可以使用二分查找，所以更快。
const arr = [5, 3, 2, 1, 4];

const fn = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      j--
    }
  }
  return arr;
};
const newArr = fn(arr);
console.log(newArr);
