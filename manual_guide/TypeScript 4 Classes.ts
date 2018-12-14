export default function (): void {
  // TypeScript 学习笔记

  // 四、类

  // 1. 类

  {
    // 生命一个Greeter类，包含3个成员：greeting属性、greet方法和构造函数。

    class Greeter {
      public greeting: string;
      public constructor(message: string) {
        this.greeting = message
      }
      public greet() {
        return 'Hello, ' + this.greeting
      }
    }

    // 使用new创建Greet而类型的对象，并执行构造函数进行初始化
    const greeter = new Greeter('world')

    console.log(greeter)
  }

  // 2. 继承

  // a. 基本的继承。

  {
    // 类从基类中继承属性和方法。Dog是一个派生类，通过extends关键字，派生自Animal基类
    // 派生类被称作子类，基类被称作超类。
    // Dog继承了Animal，拥有move和back方法。

    class Animal {
      public move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`)
      }
    }

    class Dog extends Animal {
      public bark() {
        console.log('Woof! Woof!')
      }
    }

    const dog = new Dog()
    dog.bark()
    dog.move(10)
    dog.bark()
  }

  // b. 复杂的继承。

  {
    // 若派生类包含构造函数constructor，则派生类必须调用super()，它会执行基类的构造函数，
    // 在构造函数constructor中访问this中的属性前，必须调用super。
    // super在被当做函数调用时，相当于基类的构造函数，super被调用的返回值是派生类的实例。
    // super()相当于A.prototype.constructor.call(this)。
    // super被当做对象使用时，指向的是基类。
    // 若派生类中都定义了基类中的同名方法，则派生类的方法会覆盖基类的方法。

    class Animal {
      public name: string;
      public constructor(theName: string) {
        this.name = theName
      }
      public move(distanceInMeters: number = 0) {
        console.log('super', this)  // this为基类。
        console.log(`${this.name} moved ${distanceInMeters}m.`)
      }
    }

    class Snake extends Animal {
      public constructor(name: string) {
        super(name)
        this.name = name
      }
      public move(distanceInMeters = 5) {
        console.log('Slithering...')
        super.move(distanceInMeters)
        // super.say() // 因super指向基类，基类中不存在say方法，会报错。
      }
      public say() {
        console.log('I am a snake')
      }
    }

    class Horse extends Animal {
      public constructor(name: string) {
        super(name)
        this.name = name
      }
      public move(distanceInMeters = 45) {
        console.log('Galloping...')
        console.log('super', super.move)

        super.move(distanceInMeters)
      }
    }

    const sam = new Snake('Sammy the Python')
    const tom: Animal = new Horse('Tommy the Palomino')

    sam.move()
    tom.move(34)
  }

  // 3. 公共，私有与受保护的修饰符

  // a. public修饰符

  {
    // public修饰符可以被自由访问，在语法中，未定义修饰符的属性和方法默认为public

    class Animal {
      public name: string
      public constructor(theName: string) {
        this.name = theName
      }
      public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`)
      }
    }

    const animal = new Animal('name')
    console.log(animal)
  }

  // b. private修饰符

  {
    // private私有属性和方法，不能从声明它的类外部访问。

    class Animal {
      public age: number
      public publicName: string
      private name: string
      public constructor(theName: string, age: number) {
        this.name = theName
        this.age = age
        this.publicName = this.name
      }
    }

    const animal = new Animal('Cat', 10)
    console.log(animal.publicName)
    console.log(animal.age)
    // console.log(animal.name)  // 私有属性无法在类的外部访问。
  }

  {
    // TypeScript使用的是结构性类型系统。
    // 当比较不同类型时，并不关心它们从何而来，若成员的类型都兼容，则认为它们的类型是兼容的。
    // 当对比private或protected成员的类型时。若其中一个类型里包含一个private成员，同时另一个类型中也存在这样的private成员，而且它们来自于同一处生命，这两个类型才是兼容的。
    // protected成员也适用此规则。

    // 按下面的例子，Rhino是Animal的子类，它们都来自于Animal类。
    // 另外定义了一个Employee类。
    // Rhino类是继承自Animal类，因此共享private name: string私有成员。因此它们是兼容的，可以互相赋值。
    // 而将Employee类赋值给Animal类时会报错，因为即使它们都定义了private name: string私有成员，但它们并不是同一个。

    class Animal {
      public publicName: string
      private name: string
      public constructor(theName: string) {
        this.name = theName
        this.publicName = this.name
      }
    }

    class Rhino extends Animal {
      public constructor() {
        super('Rhino')
      }
      public sayName() {
        // console.log(this.name)  // 私有属性只能在基类中被访问
      }
    }

    class Employee {
      public publicName: string
      private name: string
      public constructor(theName: string) {
        this.name = theName
        this.publicName = this.name
      }
    }

    let animal = new Animal('Goat')
    const rhino = new Rhino()
    const employee = new Employee('Bob')

    animal = rhino
    // animal = employee // 错误: Animal 与 Employee 不兼容.
    console.log(animal)
    console.log(rhino)
    console.log(employee)
  }

  // c. protected修饰符

  {
    // protected修饰符与private修饰符很相似。
    // protected成员不可以从类的外部访问。
    // 但protected成员从派生类中仍可以访问，而private成员从派生类中无法访问。

    class Person {
      protected name: string
      public constructor(name: string) { this.name = name }
    }

    class Employee extends Person {
      private department: string

      public constructor(name: string, department: string) {
        super(name)
        this.department = department
      }

      public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`
      }
    }

    const howard = new Employee('Howard', 'Sales')
    console.log(howard.getElevatorPitch())
    // console.log(howard.name) // protected成员不可从外部访问。
  }

  {
    // 构造函数可以被标记为protected，意味着这个类不可以直接被实例化，而继承它的派生类是可以被实例化的。

    class Person {
      protected name: string;
      protected constructor(theName: string) { this.name = theName }
    }

    // Employee 能够继承 Person
    class Employee extends Person {
      private department: string;

      public constructor(name: string, department: string) {
        super(name)
        this.department = department
      }

      public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`
      }
    }

    const howard = new Employee('Howard', 'Sales')
    // const john = new Person('John') // 错误: 'Person' 的构造函数是被保护的.
    console.log(howard)
  }

  // d. readonly修饰符

  {
    // readonly关键字可将属性设置为只读，该属性必须在声明时或在构造函数中被初始化。

    class Octopus {
      readonly name: string
      readonly numberOfLegs: number = 8 // 声明时初始化
      public constructor(theName: string, numberOfLegs: number) {
        this.name = theName // 构造函数中初始化
        this.numberOfLegs = numberOfLegs
      }
    }
    const dad = new Octopus('Man with the 8 strong legs', 8)
    // dad.name = 'Man with the 3-piece suit' // name 是只读的，不可以被赋值。
    console.log(dad)
  }

  // 4. 参数属性

  {
    // 可以在构造函数中，使用参数属性直接为类定义属性及其类型，同时在传参时初始化。
    // 可以接受private、public、protected修饰符。

    class Animal {
      public publicName: string
      public constructor(private name: string, public age: number, protected weight: string) {
        this.publicName = name
      }
      move(distanceInMeters: number) {
        console.log(`${this.name} (age: ${this.age}, weight: ${this.weight}) moved ${distanceInMeters}m.`)
      }
    }
    const animal = new Animal('Snake', 8, '6kg')
    animal.move(10)
  }

  // 5. 存取器

  {
    // TypeScript支持通过getters/setters截取对对象成员的访问，通过它们可以控制对对象成员的访问。
    // 存取器要求将编译器设置为输出ECMAScript 5或更高，且无法降级到ECMAScript 3。
    // 带有get而不带有set的存取器会被自动判断为readonly。这从代码生成.d.ts文件时有帮助，因为利用这个属性的用户会看到不允许改变它的值。

    let passcode: string = 'secret passcode'

    class Employee {
      private _fullName: string // 存储属性值

      public get fullName(): string { // 截取对对象的读取。
        return `full name is ${this._fullName}.`
      }

      public set fullName(newName: string) {  // 截取对对象的修改。
        if (passcode && passcode === 'secret passcode') {
          this._fullName = newName
        }
      }
    }

    const employee = new Employee()
    employee.fullName = 'Bob Smith'
    if (employee.fullName) {
      console.log(employee.fullName)  // full name is Bob Smith.
    }

    passcode = 'public passcode'  // 修改密钥，则修改会被setters阻止。
    employee.fullName = 'Lee Chen'  // 修改失败
    console.log(employee.fullName)  // full name is Bob Smith.
  }

  // 6. 静态属性

  {
    // 静态属性存在于类本身上，而不是在类的实例上。
    // 访问静态属性时，需要在属性前加上类名，使用类名.属性的方式访问。
    // 静态属性可以通过直接修改构造函数中相应属性的值来修改。

    class Grid {
      static origin = { //
        x: 0,
        y: 0,
      }
      public publicScale: number
      constructor(public scale: number) {
        this.publicScale = scale
      }
      calculateDistanceFromOrigin(point: { x: number; y: number; }) {
        const xDist = (point.x - Grid.origin.x)
        const yDist = (point.y - Grid.origin.y)
        // console.log(this.origin)  // 属性不存在于实例上，无法访问。
        console.log(Grid.origin)  // 静态属性存在于类上，只能通过类名.属性访问。

        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
      }
    }

    const grid1 = new Grid(1.0)  // 1x scale
    const grid2 = new Grid(5.0)  // 5x scale
    // Grid.origin = {  // 静态属性可以通过直接修改构造函数中相应属性的值来修改。
    //   x: 10,
    //   y: 10,
    // }

    console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }))
    console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }))
  }

  // 7. 抽象类

  {
    // 抽象类作为其它派生类的基类使用，一般不会直接被实例化。
    // 与接口不同，抽象类可以包含成员的实现细节。
    // abstract关键字用于定义抽象类和抽象类内部的抽象方法
    // 抽象方法的语法与接口类似，两者都定义方法签名，但不包含方法体。
    // abstract关键字定义的方法不可在抽象类中实现，必须在派生类中实现。
    // 抽象类中未被定义的方法，在派生类中即使实现了，也不允许被调用。

    abstract class Department {
      public publicName: string

      constructor(public name: string) {
        this.publicName = name
      }

      printName(): void {
        console.log('Department name: ' + this.name)
      }

      abstract printMeeting(): void // 必须在派生类中实现
    }

    class AccountingDepartment extends Department {

      constructor() {
        super('Accounting and Auditing') // 在派生类的构造函数中必须调用 super()
      }

      printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.')
      }

      generateReports(): void {
        console.log('Generating accounting reports...')
      }
    }

    let department: Department | null = null // 允许创建一个对抽象类型的引用
    // department = new Department() // 错误: 不能创建一个抽象类的实例
    department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
    department.printName()
    department.printMeeting()
    // department.generateReports() // 错误: 方法在声明的抽象类中不存在
  }

  // 8. 高级技巧

  // a. 构造函数

  {
    // 在TypeScript中声明一个类时，首先生命了类的实例的类型。
    // 同时也创建了一个叫做构造函数的值，这个函数会在我们使用new创建类实例的时候被调用。

    class Greeter {
      public greeting: string;
      public constructor(message: string) {
        this.greeting = message
      }
      public greet() {
        return 'Hello, ' + this.greeting
      }
    }

    const greeter: Greeter = new Greeter('world') // Greeter同时是类型，也是构造函数。
    console.log(greeter.greet())
  }

  {
    // 使用JavaScript表示：

    const Greeter: any = (function () {
      function GreeterConstructor(this: { greeting: string }, message: string) {  // 构造函数的this必须作为第一个参数传入构造函数中，但实际上在new创建实例时，并不需要传this参数。
        this.greeting = message
      }
      GreeterConstructor.prototype.greet = function () {
        return 'Hello, ' + this.greeting
      }

      return GreeterConstructor
    })()

    const greeter: any = new Greeter('world')
    console.log(greeter.greet())
  }

  {
    // 可以通过typeof 类名，获取类的类型，而不是实例的类型。
    // 也就是说，获取类的标识符的类型，即构造函数的类型。
    // 此时可以直接将构造函数赋值给其他变量，即创建了一个新的构造函数。

    class Greeter {
      static standardGreeting = 'Hello, there'
      public greeting: string;
      public greet() {
        if (this.greeting) {
          return 'Hello, ' + this.greeting
        }
        else {
          return Greeter.standardGreeting
        }
      }
    }

    const greeter1: Greeter = new Greeter()
    console.log(greeter1.greet())

    const GreeterMaker: typeof Greeter = Greeter
    GreeterMaker.standardGreeting = 'Hey there!'
    const greeter2: Greeter = new GreeterMaker()
    console.log(greeter2.greet())
  }

  // b. 把类当做接口使用

  {
    // 因为定义类时，同时会创建实例类型和构造函数，所以类可以被当做接口使用。

    class Point {
      x: number;
      y: number;
    }

    interface IPoint3d extends Point {
      z: number
    }

    const point3d: IPoint3d = { x: 1, y: 2, z: 3 }
    console.log(point3d)
  }
}