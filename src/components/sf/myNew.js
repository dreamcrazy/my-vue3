function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let result = fn.call(obj, ...args);
  if (typeof result == "object" && result !== null) {
    return result;
  }
  return obj;
}

function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log(this.name);
};

let _fn = myNew(Person, "zhangsan");
console.log(_fn);
_fn.sayName();

for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j);
    }, 1000);
  })(i);
}

function deepClone(obj) {
  let cloneObj = Array.isArray(obj) ? [] : {};

  if (typeof obj == "object" && obj) {
    for (let key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] == "object") {
          cloneObj[key] = deepClone(obj[key]);
        } else {
          cloneObj[key] = obj[key];
        }
      }
    }
  }
  return cloneObj;
}

let obj = {
  name: "张三",
  age: 18,
  gender: {
    hh: "haha",
  },
};

let obj1 = deepClone(obj);
obj1.gender.hh = 666;
console.log(obj1, obj);

class Emitter {
  constructor() {
    this.cache = [];
  }

  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }

  off(name, fn) {
    let tasks = this.cache[name];
    if (tasks) {
      let index = tasks.findIndex((item) => item == fn);
      if (index) {
        tasks.splice(index, 1);
      }
    }
  }

  emit(name, ...res) {
    let tasks = this.cache[name].slice();
    tasks.forEach((fn) => {
      fn(...res);
    });
  }
}

const eventBus = new Emitter();
eventBus.on("change", (data) => {
  console.log("change了", data);
});

setTimeout(() => {
  eventBus.emit("change", { name: "zhangsan" });
}, 1000);

const arr = [1, 2, 3, [4, 5, [6, [7]]]];

function arrayFlat(arr) {
  const newArr = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      newArr.push(...arrayFlat(item));
    } else {
      newArr.push(item);
    }
  });
  return newArr;
}

console.log("我是arrayFlat", arrayFlat(arr));

function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return (...newArgs) => curry(fn, ...args, ...newArgs);
  }
} 

function add1(x, y, z) {
  return x + y + z;
}
const add = curry(add1);
// console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
// console.log(add(1)(2)(3));
// console.log(add(1, 2)(3));
// console.log(add(1)(2, 3));
