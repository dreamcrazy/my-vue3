// const defaultSortingAlgorithm = (a, b) => {
//   if (a < b) {
//     return -1;
//   }
//   if (a > b) {
//     return 1;
//   }
//   return 0;
// };

// const quickSort = (
//   unsortedArray,
//   sortingAlgorithm = defaultSortingAlgorithm
// ) => {
//   // Create a sortable array to return.
//   const sortedArray = [...unsortedArray];

//   // Recursively sort sub-arrays.
//   const recursiveSort = (start, end) => {
//     // If this sub-array contains less than 2 elements, it's sorted.
//     if (end - start < 1) {
//       /*译者：经热心观众提醒，这里应该是小于1，而不是小于2*/
//       return;
//     }

//     const pivotValue = sortedArray[end];
//     let splitIndex = start;
//     for (let i = start; i < end; i++) {
//       const sort = sortingAlgorithm(sortedArray[i], pivotValue);

//       // This value is less than the pivot value.
//       if (sort === -1) {
//         // If the element just to the right of the split index,
//         //   isn't this element, swap them.
//         if (splitIndex !== i) {
//           [sortedArray[i],sortedArray[splitIndex]] = [sortedArray[splitIndex],sortedArray[i]]
//         }
//         // Move the split index to the right by one,
//         //   denoting an increase in the less-than sub-array size.
//         splitIndex++;
//       }

//       // Leave values that are greater than or equal to
//       //   the pivot value where they are.
//     }

//     // Move the pivot value to between the split.
//     sortedArray[end] = sortedArray[splitIndex];
//     sortedArray[splitIndex] = pivotValue;

//     // Recursively sort the less-than and greater-than arrays.
//     recursiveSort(start, splitIndex - 1);
//     recursiveSort(splitIndex + 1, end);
//   };

//   // Sort the entire array.
//   recursiveSort(0, unsortedArray.length - 1);
//   return sortedArray;
// };
const arr = [3, 2, 4, 11, 7, 8, 6,19,-1,20];

const quickSort = arr => {
    if(arr.length <= 1) return arr
    let splitIndex = Math.floor(arr.length / 2)
    let base = arr.splice(splitIndex,1)[0]
    let left = [],right = []
    arr.forEach(element => {
        if(element >= base) {
            right.push(element)
        } else {
            left.push(element)
        }
    });
    return quickSort(left).concat([base],quickSort(right))
}

// function quickSort(list) {
//   // 当list.length <= 1时，退出递归
//   if (list.length <= 1) return list;
//   // 找到中间节点
//   let mid = Math.floor(list.length / 2);
//   // 以中间节点为基准点，比该节点大的值放到right数组中，否则放到left数组中
//   let base = list.splice(mid, 1)[0];
//   let left = [];
//   let right = [];
//   list.forEach((item) => {
//     if (item > base) {
//       right.push(item);
//     } else {
//       left.push(item);
//     }
//   });
//   // 重新组合数组
//   return quickSort(left).concat(base, quickSort(right));
// }
console.log(quickSort(arr));
