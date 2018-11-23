// TypeScript 学习笔记 01：基础类型

// 1. 布尔值
let isDone: boolean = false
console.log(isDone)

// 2. 数字
// TypeScript的数字同JavaScript，都为浮点数，支持二进制、八进制、十进制、十六进制
const binaryLiteral: number = 0b1010  // 二进制
const octalLiteral: number = 0o744  // 八进制
const decLiteral: number = 8  // 十进制
const hexLiteral: number = 0xf00d // 十六进制
console.log(binaryLiteral)
console.log(octalLiteral)
console.log(decLiteral)
console.log(hexLiteral)

// 3. 字符串
const testName: string = 'lee'
const fullName: string = `${testName} chen`
console.log(fullName)

// 4. 数组
const list: number[] = [1, 2, 3]
console.log(list)

// 5. 元组 Tuple
let tuple: [string, number]
tuple = ['1', 2]
// tuple = ['1', 2, 3] // 值的数量不对会报错
// tuple = [1, '2'] // 类型顺序不对会报错
tuple[0].substr(1)
// tuple[1].substr(1) // 对number类型进行字符串操作会报错
// tuple[2] = 3 // 可以将number类型赋值给(string | number)类型
// tuple[3] = '4' // 可以将string类型赋值给(string | number)类型
// tuple[4] = true // 不可赋值非(string | number)类型

// 6. 枚举
enum Color {
  Red, // 默认为从0开始编号
  Green = 2, // 由此改为从2开始编号
  Blue,
}

const color: Color = Color.Blue
const colorName: string = Color[3]
console.log(color) // 2
console.log(colorName) // Blue

// 7. Any
// 任意类型。与Object类型不同的是，Object类型中的方法是不可被调用的，而Any中的方法可以
// let anyThing: any = 0
// anyThing = '1'
// anyThing = true
// anyThing = [0, 1]
// const methods: any = {
//   log(): void {
//     console.log(anyThing)
//   },
// }
// const methodsObj: object = {
//   log(): void {
//     console.log(anyThing)
//   },
// }
// console.log(methodsObj)
// methods.log()
// methodsObj.log() // Property 'log' does not exist on type 'object'.

// 8. Void
// 表示没有任何类型，常用语定义函数的返回值。若被定义为变量，可被赋值undefined或null，实测赋值Null报错。
// const non: void = undefined // 赋值为undefined无意义
// const mt: () => void = (): void => {
//   console.log(non)
// }
// mt()

// 9. Null 和 Undefined
// 存在undefined和null类型，但意义不大。默认情况下null和undefined是所有类型的子类型。例如可以将Number类型赋值为Null或Undefined，需要在tslint中设置strictNullChecks为true，阻止赋值。
let numTest: number = 0
numTest = 1
// numTest = null // 赋值会报错
console.log(numTest)
// numTest = undefined // 赋值会报错
// console.log(numTest)

// 10. Never
// Never表示永不存在值的类型，它也是所有值的子类型。
// 可作为总是会抛出异常的函数，或者是不会有返回值的函数（如无限循环函数）的返回值。

// 返回never的函数必须存在无法达到的终点
// function error(message: string): never {
//   throw new Error(message)
// }

// function fail(): void {
//   return error('failed')
// }

// fail()

// function infiniteLoop(): never {
//   while (true) {
//     console.log('test')
//   }
// }
// infiniteLoop()

// 11. 类型断言
// 类型断类似于其它语言里的类型转换，但是不进行特殊的数据检查和解构，只在编译阶段起作用

// 第一种写法：当使用JSX时，该写法会被认为是JSX，不可使用
// const valueAssertion: any = 'string'
// const valueLength: number = (<string>valueAssertion).length

// 第二种写法：当使用JSX时，该写法会被认为是JSX，不可使用
const valueAssertion: any = 'string'
const valueLength: number = (valueAssertion as string).length
console.log(valueLength)
