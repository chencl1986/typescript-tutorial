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
  }
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

function f1(shouldInitialize: boolean) {
  if (shouldInitialize) {
    var x = 10;
  }

  return x;
}

f1(true);  // returns '10'
f1(false); // returns 'undefined'

/* 
var声明的变量在if语句外部也可以被访问，因为var声明只和函数有关，其他类型作用域对它无效。
使用var声明的变量的作用域规则，被成为“var作用域或函数作用域”。
*/

/* 
因此会造成在for循环中，变量的值会被覆盖的问题。
*/

function sumMatrix1(matrix: number[][]) {
  var sum = 0;

  for (var i = 0; i < matrix.length; i++) {
    console.log('matrix[i]', i, matrix[i])
    var currentRow = matrix[i];
    for (var i = 0; i < currentRow.length; i++) {
      console.log('currentRow[i]', i, currentRow[i])
      sum += currentRow[i];
    }
    console.log(i)  // 第一次循环后被赋值为2，直接跳出循环
  }

  // i可以在for循环外部被访问到，而且其值为最后一次循环后的值。
  console.log(i);
  return sum;
}
console.log('sumMatrix1', sumMatrix1([[1, 2], [3, 4]])) // 预期结果为10，实际结果为3

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

function f2(input: boolean) {
  let a = 100;

  if (input) {
    // 可以访问父级作用域声明的变量a
    let b = a + 1;  // b定义在if语句块中，外部不可访问。
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
test1 = 11
console.log(test1)
var test1 = 1
// console.log(test2)
let test2 = 2

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

let a;

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
let x = 10;
// let x = 20; // 错误，不能在1个作用域里多次声明`x`

/* 
在同一个块作用域声明同名变量会报错。
*/
function f4(x) {
  // let x = 100; // error: 声明的变量不可与参数重名.
}

function g1() {
  let x = 100;
  // var x = 100; // error: 已使用let声明了变量x，不可重复声明。
}

/* 
同名变量可以声明在不同块作用域中，在某个块作用域内部使用当前域内部声明的变量，若当前域没有声明则向上查找。
*/
function f5(condition, x) {
  if (condition) {
    let x = 100;
    return x;
  }

  return x;
}

console.log(f5(false, 0)); // returns 0
console.log(f5(true, 0));  // returns 100

/* 
由于不同块作用域中的变量互相独立，因此可以用来解决for循环嵌套的问题。
每次循环中声明的变量i都是独立的，互不干扰，因此该函数可以计算出正确结果。
*/
function sumMatrix2(matrix: number[][]) {
  let sum = 0;

  for (let i = 0; i < matrix.length; i++) {
    console.log('matrix[i]', i, matrix[i])
    var currentRow = matrix[i];
    for (let i = 0; i < currentRow.length; i++) {
      console.log('currentRow[i]', i, currentRow[i])
      sum += currentRow[i];
    }
  }

  return sum;
}

console.log(sumMatrix2([[1, 2], [3, 4]])) // 输出正确结果10

/* 
c. 块级作用域变量的获取
*/

/* 
通过let声明的变量，也同样可以被函数捕获，在作用域内代码执行完毕后，还可以被读写。
*/
function theCityThatAlwaysSleeps() {
  let getCity;

  if (true) {
    let city = "Seattle";
    getCity = function () {
      return city + 'Test';
    }
  }

  return getCity();
}
console.log(theCityThatAlwaysSleeps())

/* 
在for循环中要捕获变量不再需要使用函数，因为每个循环都是一个独立的块作用域，每个变量i和j都会在当前作用域中重新声明一次。
*/
for (let i = 0; i < 10; i++) {
  let j = i + 'a'
  setTimeout(function () { console.log(i); console.log(j); }, 100 * i);
}

/* 
3. const 声明
const声明的是一个常量，它的作用域规则与let相同，但它不可重新赋值。
*/

/* 
const声明的变量不可被重新赋值，但它的内部状态是可以更改的。
也就是说，如果const声明的变量为对象和数组，是可以修改他们内部的属性和项目的值。
*/
const numLivesForCat = 9;
const kitty = {
  name: "Aurora",
  numLives: numLivesForCat,
}
const arr = [0, 1, 2]

// kitty = {  // 不可重新赋值
//   name: "Danielle",
//   numLives: numLivesForCat
// };

// arr = [0, 1, 3]  // 不可重新赋值

kitty.name = "Rory";  // 内部状态可以更改
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;

arr[2] = 3  // 内部状态可以更改

/* 
4. 解构
*/

/* 
a. 解构数组
*/

/* 
通过解构可以将数组中相应位置的值，赋值给声明的变量。
*/

/* 
以下代码等同于：
first = input[0];
second = input[1];
*/
let input: [number, number] = [1, 2];
let [first, second] = input;
console.log(first); // 1
console.log(second); // 2

/* 
结构也可用于重新赋值。
*/
[first, second] = [second, first];
console.log(first); // 2
console.log(second); // 1

/* 
函数的参数也可以解构
*/
function f6([first, second]: [number, number]) {
  console.log(first);
  console.log(second);
}
f6(input);

/* 
通过扩展运算符（spread）...创建剩余变量
*/
{
  let [first, ...rest] = [1, 2, 3, 4];
  console.log(first); // outputs 1
  console.log(rest); // outputs [ 2, 3, 4 ]
}

/* 
也可以单独解构出某几个元素。
*/
{
  let [first] = [1, 2, 3, 4];
  console.log(first); // outputs 1
  let [, second, , fourth] = [1, 2, 3, 4];
  console.log(second);
  console.log(fourth);
}

/* 
b. 对象解构
*/

/* 
可以从对象中解构出同名属性，同时会声明相应的新变量，未被解构的属性会忽略。
*/
let o = {
  a: "foo",
  b: 12,
  c: "bar"
};
{
  let { a, b } = o;
}

/* 
与数组相同，对象也支持通过扩展运算符（spread）...创建剩余变量
*/
{
  let { a, ...passthrough } = o;
  let total = passthrough.b + passthrough.c.length;
}

/* 
c. 默认值
*/

/* 
解构时可以给变量设置默认值。
*/
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject;
  console.log(a, b)
}
keepWholeObject({ a: 'test' })

/* 
d. 函数声明
*/

/* 
可以在函数声明时，对参数进行解构，若参数已经指定类型，则可以直接解构。
*/
type C = { a: string, b?: number }
function f7({ a, b }: C): void {
  // ...
}

/* 
若参数没有指定类型，即参数的属性中可能没解构的属性名，则需要设置初始值。
*/
function f8({ a = "", b = 0 } = {}): void {
  // ...
}
f();

/* 
可以给函数的参数和解构后的变量都设置初始值。
*/
function f9({ a, b = 0 } = { a: "" }): void {
  // ...
}
f9({ a: "yes" }); // 当传入参数无b属性时，会给解构后变量b设置一个初始值。
f9(); // 当函数未传参时，会给参数设置一个初始值{ a: "" }，同时会给解构后的变量b一个初始值。
// f9({}); // 若函数运行时有传参，但参数未设置a属性，则会报错。

/* 
e. 展开
*/

/* 
展开操作与解构相反，它的作用是将数组或对象的每个值都相应取出。
可以理解为等号左侧的操作为解构，等号右侧的操作为展开。
展开操作为浅拷贝。
*/
{
  let first = [1, 2];
  let second = [3, 4];
  let bothPlus = [0, ...first, ...second, 5]; // 等价于let bothPlus = [0, 1, 2, 3, 4, 5]
}

/* 
对象展开的操作是从左到右，因此如果展开操作之后有同名属性，则之后的值会覆盖之前同名属性的值。
*/
{
  let defaults = { food: "spicy", price: "$$", ambiance: "noisy", log: function (): void {
    console.log('log')
  } };
  let search = { ...defaults, food: "rich" }; // 等价于let search = { food: "rich", price: "$$", ambiance: "noisy" }
  search.log()
}

/* 
若展开的对象中有与展开操作之前同名的属性，则会覆盖之前的属性值。
*/
{
  let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
  let search = { food: "rich", ...defaults }; // 等价于let search = { food: "spicy", price: "$$", ambiance: "noisy" }
}

/* 
对象展开只包含对象自身的可枚举属性，当展开一个对象实例时，它的方法将会丢失。
*/
{
  class A {
    a = 1;
  }
  class C extends A {
    constructor() {
      super()
    }
    p = 12;
    m() {
    }
  }
  let c = new C();
  let clone = { ...c };
  console.log(c)  // C { a: 1, p: 12 }
  console.log(clone)  // { a: 1, p: 12 }
  clone.p; // ok
  // clone.m(); // error!
}
