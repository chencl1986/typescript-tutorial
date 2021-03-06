/*
TypeScript 教程 Generics 泛型
*/

/* 
1. 泛型之Hello World
*/

/* 
假设有这样一个函数，他的参数类型是确定的。
*/

function identity1(arg: number): number {
  return arg;
}

/* 
如果此时我们需要传入其他类型的参数，校验就无法通过，那么就需要将类型改为any，但是这样就失去了类型检查的意义。
*/

function identity2(arg: any): any {
  return arg;
}

/* 
可将方法的类型通过类型变量T传入方法，可在函数传参和返回值中使用泛型变量T，整个函数就是一个泛型。

与any类型不同，泛型不会丢失类型信息，并且能够适应多种情况。

实际使用中可以传入类型参数使用。也可以不传参，利用类型推论，编译器会根据传入的参数自动确定参数T的类型。

虽然可以使用类型推论，但在代码复杂的情况下，编译器可能无法自动推断出类型，因此建议在使用时都明确传入类型变量T的类型。
*/

function identity3<T>(arg: T): T {
  return arg
}

identity3(1)
identity3<number>(2)
identity3<string>("myString");  // type of output will be 'string'

/* 
2. 使用泛型变量
*/

/* 
泛型变量可代表任意类型，这代表着在使用过程中，无法使用可能不具备的属性。

如.length，因为.length只有Array和String具备，而编译器会认为泛型变量可能是number。
*/

function loggingIdentity1<T>(arg: T): T {
  console.log(arg.length)  // Error: T doesn't have .length
  return arg
}

/* 
如果将泛型变量当做类型的一部分，由它组成了参数arg的类型为T[]，这样参数arg就具备了length属性。
*/

function loggingIdentity2<T>(arg: T[]): T[] {
  console.log(arg.length)  // Array has a .length, so no more error
  return arg
}
loggingIdentity2<number>([1, 2, 3])

/* 
3. 泛型类型
*/

function identity<T>(arg: T): T {
  return arg
}

/* 
我们可以像函数类型一样使用泛型类型，`const myIdentity1: <U>(arg: U) => U`表示myIdentity1的类型为泛型参数为U的函数类型(arg: U) => U。
泛型参数名可以不同，编译器只关心数量和使用方式的对应。
*/
const myIdentity1: <U>(arg: U) => U = identity
myIdentity1<number>(1)

// 可以使用调用签名的对象字面量来定义泛型函数。
const myIdentity2: { <T>(arg: T): T } = identity
myIdentity2<number>(2)

// 定义一个泛型接口，该接口等同于上一个例子中的字面量。
interface IGenericIdentityFn {
  <T>(arg: T): T
}

// 使用泛型类型定义参数的类型，但此时若不传入类型参数也不会报错。
const myIdentity3: IGenericIdentityFn = identity
myIdentity3<number>(3)

// 可以将泛型参数作为接口的参数，这样在使用时就必须传入类型参数来指定泛型类型，这样接口内的成员也可以知道这个参数的类型。
interface IGenericIdentityFnArg<T> {
  (arg: T): T
}

// 使用泛型类型定义参数的类型。
const myIdentity4: IGenericIdentityFnArg<number> = identity
myIdentity4(4)

  // 4. 泛型类

  // 泛型类与泛型接口类似，可使用<>传入泛型类型使用。
  // 类分为静态部分和实例部分，泛型类指的是实例部分的类型，静态属性不能使用泛型类型。

  ; (function (): void {
    class GenericNumber<T> {
      zeroValue: T;
      add: (x: T, y: T) => T;
    }

    const myGenericNumber = new GenericNumber<number>()
    myGenericNumber.zeroValue = 0
    myGenericNumber.add = function (x, y) { return x + y }

    const stringNumeric = new GenericNumber<string>()
    stringNumeric.zeroValue = ''
    stringNumeric.add = function (x, y) { return x + y }
    console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'))
  })()

  // 5. 泛型约束

  // a. 泛型约束概念
  // 如果我们希望在类中需要使用某些特定属性，如.length，就必须要对泛型类型进行约束，也就是说，限制传入的类型必须包含某些属性。
  // 可以定义一个接口描述约束条件，使用extends关键字实现约束，如T extends ILengthwise

  ; (function (): void {
    interface ILengthwise {
      length: number
    }

    function loggingIdentity<T extends ILengthwise>(arg: T): T {
      console.log(arg.length)  // Now we know it has a .length property, so no more error
      return arg
    }

    // loggingIdentity(3)  // Error, number doesn't have a .length property
    loggingIdentity<number[]>([1, 2, 3])  // 数组包含.length属性。
    loggingIdentity({ length: 10, value: 3 }) // 也可传入包含.length属性的对象。
  })()

  // b. 在泛型约束中使用类型参数

  // 当我们声明一个类型参数，它被另一个类型参数约束。若想要确保函数正确执行，就需要在两个类型中使用约束。

  // ;(function (): void {
  //   function getProperty(obj: T, key: K) {
  //     return obj[key]
  //   }

  //   const x = { a: 1, b: 2, c: 3, d: 4 }

  //   console.log(getProperty(x, 'a')) // okay
  //   console.log(getProperty(x, 'm')) // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
  // })()

  // c. 在泛型里使用类类型

  // 1) 使用泛型创建工厂函数时，需要引用构造函数的类类型。

  ; (function (): void {
    function create<T>(C: { new(): T; }): T {
      return new C()
    }
    create(Function)
  })()

  // 2) 可以使用泛型约束限制类中必须包含的属性。

  ; (function (): void {
    class BeeKeeper {
      hasMask: boolean;
    }

    class ZooKeeper {
      nametag: string;
    }

    class Animal {
      numLegs: number;
    }

    class Bee extends Animal {
      keeper: BeeKeeper;
    }

    class Lion extends Animal {
      keeper: ZooKeeper;
    }

    function createInstance<A extends Animal>(C: new () => A): A {
      return new C()
    }

    console.log(createInstance(Lion))  // typechecks!
    console.log(createInstance(Bee))   // typechecks!
    // console.log(createInstance(BeeKeeper))   // 错误，因为BeeKeeper中不含有numLegs属性
  })()/*
TypeScript 教程 05：Functions 函数
*/
