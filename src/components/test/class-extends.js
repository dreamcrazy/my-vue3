class ParentPoint {
    toParentString(){
        return 'parent'
    }
}

class ColorPoint extends ParentPoint {
    constructor(x,y,color){
        super(x,y)
        this.color = color
    }

    toString(){
        console.log(super.toParentString);
        return this.color + super.toParentString()
    }
}

const color1 = new ColorPoint(2,3,'red')
console.log(color1);
console.log(color1.toString());
/*
* super 第一种 当做函数用时，代表父类的构造函数 （也就是ParentPoint） 但是 内部的this new ParentPoint时指向ParentPoint
*              class colorPoint extends ParentPoint 内部的this指向的是 子类colorPoint
*       第二种 当做对象时 在普通方法中， super指向父类的原型对象，super内部this指向当前的子类实例。
*              由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
*              super.x = 3 相当于this.x = 3 ，super.x 读取时 读的是父类的原型对象的x
*              在static静态方法中，super指向父类
*              注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
*
*/ 