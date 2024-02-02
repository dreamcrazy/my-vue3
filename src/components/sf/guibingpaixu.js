// 归并排序 -- 我们现在写一个方法来得到a跟b组合后的有序数组，这个方法很简单，用两个指针i,j分别指向两个数组，
// 然后开始遍历，比较a[i]和a[j]的大小，将小的那个放入新的有序数组。当任意一个数组遍历完，循环结束，
// 将剩下的值全部放入新的有序数组
// const arr = [5, 3, 2, 1, 4];

// const arr1 = [2,3,4]
// const arr2 = [1,5,7,8,12]

const fn = (arr1,arr2) => {
  const arr = []
  let i = 0,j = 0;
  while (i < arr1.length && j < arr2.length) {
    if(arr1[i] < arr2[j]) {
      arr.push(arr1[i])
      i++
    } else {
      arr.push(arr2[j])
      j++
    }
  }
  // arr1还剩下
  if(i < arr1.length && j == arr2.length) {
    while (i < arr1.length) {
      arr.push(arr1[i])
      i++
    }
  }
  // arr2还剩下
  if(j < arr2.length && i == arr1.length) {
    while (j < arr2.length) {
      arr.push(arr2[j])
      j++
    }
  }

  return arr;
};
// const newArr = fn(arr1,arr2);
// console.log(newArr);

const mergeSort = (arr) => {
  const length = arr.length;
  if(length <= 1) {
    return arr;
  }
  const middle = Math.floor(length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return fn(mergeSort(left), mergeSort(right));
}

// 测试一下
const a = [2, 1, 3, 6, 4, 5, 9, 8, 7];

// 测试下
let result = mergeSort(a);
console.log(result);   // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// const merge = (arr1, arr2) => {
//   const length1 = arr1.length;
//   const length2 = arr2.length;
//   const newArr = [];
//   let i = 0;
//   let j = 0;

//   while(i < length1 && j < length2) {
//     if(arr1[i] <= arr2[j]) {
//       newArr.push(arr1[i]);
//       i++;
//     } else {
//       newArr.push(arr2[j]);
//       j++;
//     }
//   }

//   // arr2还剩一些
//   if(i === length1 && j < length2) {
//     while(j < length2) {
//       newArr.push(arr2[j]);
//       j++;
//     }
//   }

//   // arr1还剩一些
//   if(j === length2 && i < length1) {
//     while(i < length1) {
//       newArr.push(arr1[i]);
//       i++;
//     }
//   }

//   return newArr;
// }

// // 测试一下
// const a = [1 ,2, 6, 8];
// const b = [3, 4,11, 9];

// const result = merge(a, b);
// console.log(result);   //  [1, 2, 3, 4, 6, 8, 9]