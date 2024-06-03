
function Node(val) {
    this.value = val
    this.left = null
    this.right = null
}

let a = new Node('a');
let b = new Node('b');
let c = new Node('c');
let d = new Node('d');
let e = new Node('e');
let f = new Node('f');
let g = new Node('g');

a.left = b
a.right = c
b.left = d
b.right = e
c.left = f
c.right = g
//       a
//    b     c
//  d   e f   g
//   
//   
//   
//   

// abdecfg
function qianxu(root) {
    if(root == null) return
    // console.log(root.value);
    qianxu(root.left)
    qianxu(root.right)
}

qianxu(a)

// dbeafcg
function zhongxu(root) {
    if(root == null) return 
    zhongxu(root.left)
    // console.log(root.value);
    zhongxu(root.right)
}

zhongxu(a)

// debfgca
function houxu(root) {
    if(root == null) return 
    houxu(root.left)
    houxu(root.right)
    console.log(root.value);
}

houxu(a)

// 后序 3, 4, 2, 6, 5, 1
// 中序 3, 2, 4, 1, 6, 5
//            1
//      2          5     
//    3   4          6

// 给出前序、中序 求后序
// qian abdecfg
// zhong dbeafcg

var qian = ['']
var zhong = ['']
function getHou() {

}

getHou(qian,zhong)

/* eslint-disable no-unused-vars */
//       a
//    b     c
//  d   e f   g
// 
// 
var qian = ['a','b','d','e','c','f','g']

var zhong = ['d','b','e','a','f','c','g']
var hou = ['d','e','b','f','g','c','a']
// 给出前序中序求二叉树
function fl(qian,zhong) {
    if(qian == null || zhong == null || qian.length == 0 || zhong.length == 0 || qian.length != zhong.length) return null

    var root = new Node(qian[0])
    var index = zhong.indexOf(root.value)

    var leftQian = qian.slice(1,index+1)
    var rightQian = qian.slice(index+1,qian.length)

    var leftZhong = zhong.slice(0,index)
    var rightZhong = zhong.slice(index + 1, zhong.length)

    root.left = fl(leftQian,leftZhong)
    root.right = fl(rightQian,rightZhong)
    return root
}

// var root = fl(qian,zhong)
// console.log(root);
// 给出中序后序求二叉树
function fl1(zhong,hou) {
    if(zhong == null || hou == null || zhong.length == 0 || hou.length == 0 || zhong.length != hou.length) return null

    var root = new Node(hou[hou.length - 1])
    var index = zhong.indexOf(root.value)

    var leftZhong = zhong.slice(0,index)
    var rightZhong = zhong.slice(index+1,zhong.length)

    var leftHou = hou.slice(0,index)
    var rightHou = hou.slice(index, zhong.length - 1)

    root.left = fl1(leftZhong,leftHou)
    root.right = fl1(rightZhong,rightHou)
    return root
}

var root1 = fl1(zhong,hou)
console.log(root1);

