let testMethod = 'testhaha'

class Point {
    // 实例属性的新写法 相当于constructor里写 this.count = 0
    count = 0
    // 静态属性 同静态方法 只能类调用或者子类 实例无法调用
    static staticCount = 1
    // 私有属性（提案） 目前貌似不能用暂时别用了  只能内部 this.#number使用 外部、实例无法调用
    #number = 2

    constructor(x, y, name) {
        this.x = x
        this.y = y
        this.name = name
        this.toLog = this.toLog.bind(this)
        // new.target 在类的内部 指向类的本身 继承时指向子类 用此方法可以让类不能new 只能继承
        // if (new.target === Point) {
        //     throw new Error('本类不能实例化');
        // }
    }
    log() {
        console.log(this.x, this.y);
    }
    get prop() {
        console.log('getter');
        return 123
    }

    set prop(val) {
        console.log('setter', val);
    }
    [testMethod]() {
        console.log('方法名是表达式');
    }
    toLog(name = 'zhangsan') {
        this.printName(`hello ${name}`)
    }
    printName(text) {
        console.log(text);
    }
    // 静态方法 静态字段 只能通过类调用 并且实例无法继承 但是可以被子类继承
    static staticMethod() {
        // 静态方法包含this this指向的是类 而不是实例
        this.foo()
        console.log('我是静态方法,只能通过类调用 并且实例无法继承');
    }
    static foo(text) {
        console.log('我是类的foo方法,' + text);
    }
    foo() {
        console.log('我是实例的foo方法');
    }

    use() {
        // console.log(#number in this); //判断内部是否存在私有属性#number
    }
}

class ChildPoint extends Point {
    constructor(...args) {
        super(...args)
    }
}

const point1 = new Point(2, 3, 'haha')
console.log(point1);
// point1.toLog()
const { toLog } = point1
toLog('heihei')

Point.staticMethod()
console.log(Point.staticCount);

ChildPoint.foo('来自子类的继承')
point1.use()