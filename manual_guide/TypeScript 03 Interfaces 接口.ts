/* 
TypeScript 教程 03：Interfaces 接口
*/

/* 
接口介绍：

对值具有的结构进行类型检查，是TypeScript的核心原则之一，也被成为“鸭式辨型法”或“结构性子类型化”。

接口的作用就是为类型命名和为开发人员的代码或第三方代码定义契约，即定义变量的数据格式。
*/

/* 
1. 接口初探
*/

/* 
定义一个接口ILabelledValue，其包含属性label，类型为string

传入一个变量时，编译器只会检查定义的属性是否存在，同时允许其他属性传入，但使用其他属性时会报错。

直接传入对象参数时，编译器会检查参数属性是否存在。

接口的检查不强制要求顺序一致。
*/
interface ILabelledValue {
  label: string
}

function printLabel(labelledObj: ILabelledValue) {
  console.log(labelledObj.label)
}

const myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)
printLabel({ size: 10, label: 'Size 10 Object' }) // 直接传如未定义参数会报错

/* 
2. 可选属性
*/

/* 
可选属性不是必须的，可在属性名后加?表示。

可选属性提供了对可能存在的属性进行预定义，以及在引用不存在属性时，会提示拼写错误。
*/

interface ISquareConfig1 {
  color?: string
  width?: number
}

interface ITest extends ISquareConfig1 {
  test: string
}

const testObj1: ITest = {
  test: '',
}

function createSquare1(config: ISquareConfig1): { color: string; area: number } {
  const newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.colr  // 当拼写错误时，会进行提示。
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

const mySquare1 = createSquare1(testObj1)
const mySquare2 = createSquare1({ color: 'black' })
const mySquare3 = createSquare1({ color: 'black', test: 'test' }) // 直接传如未定义参数会报错

/* 
3. 只读属性
*/

/* 
只读属性只能在对象创建时被修改，在属性名前用readonly指定。

若尝试修改只读属性，会收到错误提示。
*/
interface IPoint {
  readonly x: number
  readonly y: number
}

// 通过赋值一个对象字面量构造IPoint，赋值之后x、y属性都不允许被修改。
const p1: IPoint = { x: 10, y: 20 }
console.log(p1)
// p1.x = 5 // 报错，x为只读属性
const p2 = { x: 10, y: 20 }  // 普通类型及时用const定义，内部状态还是可以被更改
p2.x = 5
console.log(p2)

/* 
ReadonlyArray<T>类型，用于定义只读数组，只读数组不支持任何修改。
*/
let b: number[] = [1, 2, 3, 4]
const ro: ReadonlyArray<number> = b
console.log(ro)
ro[0] = 12 // 修改只读数组会报错。
ro.push(5) // 修改只读数组会报错。
ro.length = 100 // 修改只读数组会报错。
b = ro // 不可将只读类型赋值给普通数组。
b = ro as number[] // 可以将类型断言重写后，赋值给普通数组。

/* 
readonly vs const
*/

/* 
readonly和const的区别在于，const创建的是变量，readonly定义的是属性，const定义的变量，其中属性或其本身（ReadonlyArray<T>）只要不是只读，则可以被更改。
*/

/* 
4. 额外的属性检查
*/

/* 
直接将额外属性赋值给变量，或传入函数（本质上都是当做一个变量），此时接口检查不允许未定义的属性。

若将进行类型断言，或定义一个增加了属性的接口后，再进行使用，则可以避开检查。

最好的办法是添加一个字符串索引签名，让接口能够接受额外属性，是添加未定义属性的最佳解决方案。
*/

// 无索引签名，会触发TypeScript的检查。
interface ISquareConfig2 {
  color?: string
  width?: number
}

// 添加一个字符串索引签名
interface ISquareConfig3 {
  color?: string
  width?: number
  [propName: string]: any
}

function createSquare(config: ISquareConfig2): { color: string; area: number } {
  const newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

interface ITest extends ISquareConfig2 {
  test: string
}

const testObj: ITest = {
  test: 'test',
}

const mySquare4 = createSquare({ colour: 'red', width: 100 })  // 报错，传入了未定义的属性
const mySquare5 = createSquare(testObj)  // 不报错，通过定义变量后，改为传入变量，不会报错
const mySquare6 = createSquare({ colour: 'red', width: 100 } as ISquareConfig3)  // 不报错，进行了类型断言，也不会报错

/* 
5. 函数类型
*/

/* 
接口表示的函数类型，编译器只检查形参类型和传入值类型是否一一对应，不要求形参名称相同。

TypeScript会判断函数返回值类型是否与定义的一致。

使用接口定义函数类型，在文档中OK，但可能会被TSLint阻止，需要使用类型别名定义。

Interface has only a call signature — use `type ISearchFunc = (source: string, subString: string) => boolean` instead.
*/

interface ISearchFunc {
  (source: string, subString: string): boolean
}

// 也可以通过type定义
// type ISearchFunc = (source: string, subString: string) => boolean

let mySearch: ISearchFunc
// 函数的参数和返回值可省略，TypeScript会根据ISearchFunc推断类型并进行校验。
mySearch = function (sour: string, subStr: string): boolean {
  const result = sour.search(subStr)
  return Boolean(result > 1)
}

console.log(mySearch('abc', 'a'))

/* 
6. 可索引的类型
*/

/* 
接口可以用来描述“可通过索引得到”的类型，如a[10]或ageMap['daniel]。

可索引类型具有一个索引签名，用来描述对象索引的类型，以及相应的索引返回值类型。
*/

interface IStringArray {
  [index: number]: string
}

let myArray: IStringArray
myArray = ['bob', 'fred']

const myStr: string = myArray[0]
console.log(myStr)

/* 
在上面的例子中，定义的IStringArray接口，具有索引签名。

表示当用number索引IStringArray时会得到返回值类型为string。
*/

/* 
索引签名支持字符串和数字，两种类型的索引可以同时使用。

数字索引的返回值必须是字符串索引返回值类型的子类型。

也就是说，若字符串索引设置了number类型，则数字索引只能为number类型。

若字符串索引设置了number | string类型，则数字索引可为number或string类型。
*/

/* 
例如以下接口会报错：
*/

interface IStringArray1 {
  [index: number]: string
  [propName: string]: number
}

/* 
而若改为这样就不会报错
*/

interface IStringArray2 {
  [index: number]: string
  [propName: string]: string | number  // 设置为number | string，index索引类型可为string
}

/* 
出现以上问题的原因是，在JavaScript中通过数字索引时，实际上最终是转换为字符串进行索引，因此数字索引必须是字符串索引的子类型。
*/

class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

/* 
错误：使用数值型的字符串索引，必须是字符串索引的子类型。
*/
interface INotOkay {
  [x: number]: Animal // 索引签名的的返回值只能有一种类型。
  [x: number]: Dog  // 同类型的索引签名，只能有一个定义。
  [x: string]: Dog
}

/* 
若定义了字符串索引签名，则必须保证所有属性都符合其要求。
*/
interface INumberDictionary {
  [index: string]: number // 定义了所有索引签名的类型都为number，因此不可再给出非number的定义
  length: number    // 类型与[index: string]: number相同，正确。
  name: string       // name类型与[index: string]: number不同，错误。
}

/* 
若索引签名设置为只读，则不可为未定义的索引赋值。
*/
interface IReadonlyStringArray {
  readonly [index: number]: string
}
const myArray2: IReadonlyStringArray = ['Alice', 'Bob']
myArray2[2] = 'Mallory' // 不可被赋值。
console.log(myArray2)

/* 
7. 类类型
*/

/* 
实现接口
*/

/* 
接口可以用来定义类的类型。

接口只会检查类的公共部分，即接口中定义的类型属性和方法是否满足要求。

而类中私有的部分和其他公共部分不会被检查。

接口中的可选部分，在类中也可以不实现。
*/

interface IClockInterface1 {
  currentTime: Date
  setTime(d: Date): void
}

class Clock1 implements IClockInterface1 {
  public h: number
  public m: number
  public currentTime: Date
  public constructor(h: number, m: number) {
    this.h = h
    this.m = m
  }
  public setTime(d: Date) {
    this.currentTime = d
  }
}

/* 
类静态部分与实例部分的区别
*/

/* 
类有两个类型：静态部分的类型和实例的类型。

静态部分类型：
interface IClockInterface2 {
  tick(): void
}

实例类型:
interface IClockConstructor1 {
  new(hour: number, minute: number) // 需要提供返回类型
}
*/

/* 
类只能实现静态部分类型，实例类型用于对已实现的类进行检查。

如下用构造器签名定义接口，并定义一个类实现这个接口会报错。

当一个类实现了一个接口时，TypeScript只对其实例部分进行类型检查，constructor存在于类的静态部分，不在检查范围之内。
*/

interface IClockConstructor1 {
  new(hour: number, minute: number) // 需要提供返回类型
}

class Clock2 implements IClockConstructor1 {
  public currentTime: Date
  public h: number
  public m: number
  public constructor(h: number, m: number) {
    this.h = h
    this.m = m
  }
}

const clock = new Clock2(1, 2)

/* 
因此需要定义两个接口，IClockConstructor为构造函数使用，IClockInterface为实例方法使用。
*/

// 定义一个实例类型接口，用于检查满足IClockInterface2的类。
interface IClockConstructor2 {
  new(hour: number, minute: number): IClockInterface2
}

// 该接口可用于类的实现，也可用于检查基于它实现的实例。
interface IClockInterface2 {
  tick(): void
}

// 方法接收的参数Ctor，为一个实现了接口IClockInterface2的class，返回一个符合IClockInterface2接口的实例。
function createClock(Ctor: IClockConstructor2, hour: number, minute: number): IClockInterface2 {
  return new Ctor(hour, minute)
}

// 基于IClockInterface2实现一个类
class DigitalClock implements IClockInterface2 {
  public h: number
  public m: number
  public constructor(h: number, m: number) {
    this.h = h
    this.m = m
  }
  public tick() {
    console.log('beep beep')
  }
}

class AnalogClock implements IClockInterface2 {
  public h: number
  public m: number
  public constructor(h: number, m: number) {
    this.h = h
    this.m = m
  }
  public tick() {
    console.log('tick tock')
  }
}

const digital: IClockInterface2 = createClock(DigitalClock, 12, 17)
const analog: IClockInterface2 = createClock(AnalogClock, 7, 32)

console.log(digital)
console.log(analog)

/* 
8. 继承接口
*/

/* 
接口可以继承，相当于将两个接口中的属性合并，同时必须保证同名属性的类型一致。
*/

interface IShape1 {
  color: string
}

interface ISquare1 extends IShape1 {
  sideLength: number
  color: number // 继承的接口如果拥有同名属性，属性的类型必须一致。
  color?: string  // 属性是否为可选也必须一致。
}

const square1: ISquare1 = {
  color: 'blue',
  sideLength: 10,
}

/* 
接口可以同时继承多个接口。
*/

interface IShape2 {
  color: string
}

interface IPenStroke {
  penWidth: number
}

interface ISquare2 extends IShape2, IPenStroke {
  sideLength: number
}

let square2: ISquare2 = {
  color: 'blue',
  sideLength: 10,
  penWidth: 5.0,
}

/* 
9. 混合类型
*/

/* 
接口可以支持同时定义多种类型，如可将一个函数同时当做对象使用。
*/

interface ICounter {
  (start: number): string
  interval?: number
  reset?: () => void
}

function getCounter(): ICounter {
  const counter: ICounter = function (start: number): string {
    return start.toString()
  }
  counter.interval = 123
  counter.reset = (): void => { console.log(1) }
  return counter
}

const c = getCounter()
console.log(c)
c(10)
c.reset && c.reset()
c.interval = 5.0

/* 
10. 接口继承类
*/

/* 
接口可以继承类类型，但只继承了类类型中成员，但不包括他们的实现，同时会继承类的private和protected成员。

当类类型存在私有成员时，只有该类的子类，即继承该类的类才会具有其私有成员。

因此只有子类才能够使用继承了类类型的接口校验。
*/

class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

// Button类继承了Control类，因此具有了state属性，在实现接口时不报错。
class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// 错误：因Image1未继承Control类，“Image1”类型缺少“state”属性。
class Image1 implements SelectableControl {
  select() { }
}

class Location1 {

}