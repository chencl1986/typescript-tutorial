/*
TypeScript 教程 02：变量声明
*/
/*
1. var声明
*/
function f() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    };
}
var g = f();
g(); // returns 11;
/*
从上面这个例子可以看到，g方法可以调用到f方法中定义的变量a，即使f已经运行完毕后仍然可以访问和修改a。
*/
function h() {
    var a = 1;
    a = 2;
    var b = i();
    a = 3;
    return b;
    function i() {
        return a;
    }
}
h(); // returns 2
/*
a. 作用域规则
*/
function f1(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10;
    }
    return x;
}
f1(true); // returns '10'
f1(false); // returns 'undefined'
/*
var声明的变量在if语句外部也可以被访问，因为var声明只和函数有关，其他类型作用域对它无效。
使用var声明的变量的作用域规则，被成为“var作用域或函数作用域”。
*/
/*
因此会造成在for循环中，变量的值会被覆盖的问题。
*/
function sumMatrix(matrix) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    // i可以在for循环外部被访问到，而且其值为最后一次循环后的值。
    console.log(i);
    return sum;
}
/*
原因是每次循环时，引用的i变量都为函数作用域之内的变量，而不是每次循环为一个单独的作用域。
*/
/*
b. 捕获变量怪异之处
*/
/*
运行以下代码时，由于计时器运行时，for循环已经完成，因此每次计时器打印结果都为10。
而通常我们希望打印结果为0~9。
*/
for (var i = 0; i < 10; i++) {
    setTimeout(function () { console.log(i); }, 100 * i);
}
/*
在传统的JavaScript中，通常使用函数捕获循环中i的值。
*/
for (var i = 0; i < 10; i++) {
    (function (i) {
        setTimeout(function () { console.log(i); }, 100 * i);
    })(i);
}
/*
2. let 声明
let声明和var在写法上一致：let hello = "Hello!";
let声明的变量也是可以被重新赋值的。
*/
/*
a. 块作用域
使用let声明的变量，使用的是块作用域，或者成为词法作用域，也就是{}。
与var不同，let声明的变量在块作用域外无法被访问，
*/
function f2(input) {
    var a = 100;
    if (input) {
        // 可以访问父级作用域声明的变量a
        var b = a + 1; // b定义在if语句块中，外部不可访问。
        return b;
    }
    // b为未定义
    // return b;
}
/*
catch语句中声明的变量e也无法从外部访问。
*/
try {
    throw "oh no!";
}
catch (e) {
    console.log("Oh well.");
}
// e为未定义。
// console.log(e);
/*
拥有块作用域的变量在声明之前无法被读写，而var声明的变量可以。
虽然这些变量“存在”与它的作用域中，但在声明之前它都属于“暂时性死区”，无法被访问到。
TypeScript编译时会报错。
*/
test1 = 11;
console.log(test1);
var test1 = 1;
// console.log(test2)
var test2 = 2;
/*
如果在tsconfig.json中配置为"target": "es2015"，下面的代码会报错。
而若为"target": "es5"则不会报错，因为let a会被编译为var a，此时块作用域变量在声明前还是可以被捕获，
*/
function foo() {
    // 变量在声明前可以被捕获
    return a;
}
// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();
var a;
/*
b. 重定义及屏蔽
var声明的变量，可以被重复声明，并以最后一次声明为准。
*/
function f3(x) {
    var x;
    var x;
    if (true) {
        var x;
    }
}
/*
而用let声明，一个作用域之内只允许声明一次。
*/
var x = 10;
// let x = 20; // 错误，不能在1个作用域里多次声明`x`
/*

*/
function f4(x) {
    // let x = 100; // error: 声明的变量不可与参数重名.
}
function g1() {
    var x = 100;
    // var x = 100; // error: 已使用let声明了变量x，不可重复声明。
}
//# sourceMappingURL=TypeScript 2 Variable Declarations.js.map