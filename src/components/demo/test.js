function proxy(target, source, key) {
  Object.defineProperty(target, key, {
    get() {
      return target[source][key];
    },
    set(val) {
      target[source][key] = val;
    },
  });
}

let obj = {
  _data: {
    name: "张三",
    age: 18,
  },
};
for (let key in obj._data) {
  proxy(obj, "_data", key);
}

window.obj = obj;

let arr = [1, 3, 2, 9, 4, 6, 7, 10, 5, 8];
// 冒泡排序
function maoapo(arry) {
  let arr = [...arry];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

maoapo(arr);

// 选择排序
function xuanze(arry) {
  let arr = [...arry];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

xuanze(arr);
// 插入排序
function charu(arry) {
  let arr = [...arry];
  let prevIndex;
  for (let i = 1; i < arr.length; i++) {
    prevIndex = i - 1;
    let current = arr[i];
    while (prevIndex >= 0 && arr[prevIndex] > current) {
      arr[prevIndex + 1] = arr[prevIndex];
      prevIndex--;
    }
    arr[prevIndex + 1] = current;
  }
  return arr;
}

charu(arr);

function quickSort(arry) {
  let arr = [...arry];
  let left = [];
  let right = [];
  let val = arr[0];
  if (arr.length <= 1) {
    return arr;
  } else if (val) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] >= val) {
        right.push(arr[i]);
      } else {
        left.push(arr[i]);
      }
    }
    let result = quickSort(left).concat(val, quickSort(right));
    return result;
  }
}
console.log(quickSort(arr));

/*
 * computed 初始化的时候传入lazy：true属性 初始化时候dirty为true，值是undefined并不计算，只有当获取时，因为是true，会执行计算函数进行计算，也就是传入的函数，计算完成之后，dirty属性改为false，
 * 再次获取 因为是false 直接取watcher对象上的.value属性，这就是缓存，一旦依赖变化，执行watcher.update方法，修改dirty属性为true，获取时候再次重新计算。
*/ 

