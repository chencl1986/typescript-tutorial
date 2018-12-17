/*
TypeScript 教程 01：基础类型
*/
/*
1. 布尔值
*/
var isDone = false;
console.log(isDone);
/*
2. 数字
*/
// TypeScript的数字同JavaScript，都为浮点数，支持二进制、八进制、十进制、十六进制
var binaryLiteral = 10; // 二进制
var octalLiteral = 484; // 八进制
var decLiteral = 8; // 十进制
var hexLiteral = 0xf00d; // 十六进制
console.log(binaryLiteral);
console.log(octalLiteral);
console.log(decLiteral);
console.log(hexLiteral);
/*
3. 字符串
TypeScript字符串与JavaScript字符串相同，类型用string表示，可以使用ES6的字符串模板语法。
*/
var userName = "Gene";
var age = 37;
var sentence = "Hello, my name is " + userName + ".\n\nI'll be " + (age + 1) + " years old next month.";
console.log(sentence);
/*
4. 数组
定义数组的两种方式：
a. 数据类型 + []
*/
var list1 = [1, 2, 3];
console.log(list1);
/*
b. 数组泛型，Array<元素类型>
*/
var list2 = [1, 2, 3];
console.log(list2);
/*
如果定义的数组中有元素类型与定义不同会报错。
*/
/*
5. 元组 Tuple
元组为已知元素数量和各自类型的数组，每个元素的类型可以不同。
在元组变量声明时若元素数量和类型与定义不同则会报错。
但修改变量时，数量不受限制，而类型需和类型定义保持一致。
*/
var tuple;
tuple = ['1', 2];
/*
tuple = ['1', 2, 3] // 值的数量不对会报错
tuple = [1, '2'] // 类型顺序不对会报错
*/
tuple[0].substr(1);
/*
tuple[1].substr(1) // 对number类型进行字符串操作会报错
tuple[2] = 3 // 可以将number类型赋值给(string | number)类型
tuple[3] = '4' // 可以将string类型赋值给(string | number)类型
tuple[4] = true // 不可赋值非(string | number)类型
*/
/*
6. 枚举
枚举是TypeScript新增类型，默认由0开始编号，但支持手动更改。
*/
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
/*
可以通过Color.Blue查找成员的值，也可以通过成员的值Color[3]查找成员名称。
*/
var color = Color.Blue;
var colorName = Color[3];
console.log(color); // 2
console.log(colorName); // Blue
/*
7. Any
任意类型，它可以直接通过类型检查。
它可以存储任意类型数据，也可以随意修改类型
Any类型看上去与Object类型相似，但与Object类型不同的是，Object类型中的方法是不可被调用的，而Any中的方法可以。
*/
var anyThing = 0;
anyThing = '1';
anyThing = true;
anyThing = [0, 1];
var methods = {
    log: function () {
        console.log(anyThing);
    },
};
var methodsObj = {
    log: function () {
        console.log(anyThing);
    },
};
console.log(methodsObj);
methods.log();
// methodsObj.log() // Object类型中的方法无法被调用，提示log方法不存在。
/*
8. Void
表示没有任何类型，常用语定义函数的返回值。定义为变量时，可被赋值undefined或null。
*/
var non = undefined; // 赋值为undefined无意义
var mt = function () {
    console.log(non);
    return null;
};
mt();
/*
9. Null 和 Undefined
存在undefined和null类型，但意义不大。
默认情况下null和undefined是所有类型的子类型。例如可以将Number类型赋值为Null或Undefined，需要在tslint中设置strictNullChecks为true，阻止赋值。
*/
var numTest = 0;
numTest = 1;
numTest = null;
console.log(numTest);
numTest = undefined;
console.log(numTest);
/*
10. Never
Never表示永不存在值的类型，它也是所有值的子类型。
可作为总是会抛出异常的函数，或者是不会有返回值的函数（如无限循环函数）的返回值。
*/
// 返回never的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
function fail() {
    return error('failed');
}
function infiniteLoop() {
    while (true) {
        console.log('test');
    }
}
/*
11. Object
object表示非原始类型，即除number，string，boolean，symbol，null或undefined之外的类型。
*/
// declare function create(o: object): void
function create(o) {
}
create({ prop: 0 }); // OK
create(null); // OK
// create(42) // 不可传入不支持的类型
// create("string") // 不可传入不支持的类型
// create(false) // 不可传入不支持的类型
create(undefined); // Error
/*
12. 类型断言
类型断类似于其它语言里的类型转换，但是不进行特殊的数据检查和解构，只在编译阶段起作用。
*/
// 第一种写法：当使用JSX时，该写法会被认为是JSX，不可使用
var valueAssertion1 = 'string';
var valueLength1 = valueAssertion1.length;
// 第二种写法：可在JSX语法中使用该方式。
var valueAssertion2 = 'string';
var valueLength2 = valueAssertion2.length;
//# sourceMappingURL=TypeScript 1 Basic Types.js.map