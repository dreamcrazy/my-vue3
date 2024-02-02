// function argsSum(args) {
//     return args.reduce((pre, cur) => {
//         return pre + cur
//     })
// }
// function add(...args1) {
//     let sum1 = argsSum(args1)
//     let fn = function (...args2) {
//         let sum2 = argsSum(args2)
//         return add(sum1 + sum2)
//     }
//     fn.toString = function () {
//         return sum1
//     }
//     return fn
// }

// console.log(add(1,3)(2));

// eslint-disable-next-line no-unused-vars
const testFn = function (x,y,z) {
    let result = Array.from(arguments).reduce((prev, next) => {
        return prev + next;
    }, 0)
    return result
}

const curry = (fn, ...args) => {
    if (args.length >= fn.length) {
        return fn(...args)
    } else {
        return (...args1) => curry(fn, ...args, ...args1)
    }
}
const _curry = curry(testFn)
console.log(_curry(1)(2)(3));

//currying
// eslint-disable-next-line no-unused-vars
function _test(a, b, c) {
    let result = Array.from(arguments).reduce((prev, next) => {
        return prev + next;
    }, 0)
    return result
}

function _currying(func) {
    return function _curry(...args) {
        if (args.length >= func.length) {
            //传入的参数大于等于func的形参数量 执行func
            return func.apply(this, args)
        } else {
            return function (..._args) {
                return _curry.apply(this, args.concat(_args))
            }
        }
    }
}
console.log(_currying(_test)(1)(2, 3))//6
console.log(_currying(_test)(1, 2)(3))//6
console.log(_currying(_test)(1)(2)(3)) //6