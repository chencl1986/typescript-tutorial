var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
export default function () {
    // TypeScript 学习笔记
    // function printLabel(labelledObj: { label: string }) {
    //   console.log(labelledObj.label)
    // }
    function printLabel(labelledObj) {
        console.log(labelledObj.label);
    }
    var myObj = { size: 10, label: 'Size 10 Object' };
    printLabel(myObj);
    var p1 = { x: 10, y: 20 };
    console.log(p1);
    // p1.x = 5 // 报错，x为只读属性
    var p2 = [0, 1, 2]; // 普通类型及时用const定义，内部状态还是可以被更改
    p2[0] = 1;
    console.log(p2);
    // ReadonlyArray<T>类型，用于定义只读数组
    var a = [1, 2, 3, 4];
    var ro = a;
    console.log(ro);
    // 只读数组不支持任何修改
    // ro[0] = 12 // error!
    // ro.push(5) // error!
    // ro.length = 100 // error!
    // a = ro // error!
    // a = ro // 不可将只读类型赋值给普通类型
    a = ro; // 可以将类型断言重写后，赋值给a
    function createSquare(config) {
        var newSquare = { color: 'white', area: 100 };
        if (config.color) {
            newSquare.color = config.color;
        }
        if (config.width) {
            newSquare.area = config.width * config.width;
        }
        return newSquare;
    }
    var testObj = {
        test: 'test',
    };
    var mySquare1 = createSquare({ colour: 'red', width: 100 }); // 报错，传入了未定义的属性
    var mySquare2 = createSquare(testObj); // 不报错，通过定义变量后，改为传入变量，不会报错
    var mySquare3 = createSquare({ colour: 'red', width: 100 }); // 不报错，进行了类型断言，也不会报错
    console.log(mySquare1);
    console.log(mySquare2);
    console.log(mySquare3);
    var mySearch;
    mySearch = function (sour, subStr) {
        var result = sour.search(subStr);
        return Boolean(result > 1);
    };
    // let mySearch: ISearchFunc
    // mySearch = (sour: string, subStr: string): boolean => {
    //   const result = sour.search(subStr)
    //   return Boolean(result > 1)
    // }
    console.log(mySearch('abc', 'a'));
    var myArray;
    myArray = ['bob', 'fred'];
    var myStr = myArray[0];
    console.log(myStr);
    var myArray2 = ['Alice', 'Bob'];
    // myArray2[2] = 'Mallory' // 不可被赋值。
    console.log(myArray2);
    // 创建一个符合IClockInterface接口的对象
    function createClock(Ctor, hour, minute) {
        return new Ctor(hour, minute);
    }
    // 创建一个类
    var DigitalClock = /** @class */ (function () {
        function DigitalClock(h, m) {
            this.h = h;
            this.m = m;
        }
        DigitalClock.prototype.tick = function () {
            console.log('beep beep');
        };
        return DigitalClock;
    }());
    // class AnalogClock implements IClockInterface {
    //   public h: number
    //   public m: number
    //   public constructor(h: number, m: number) {
    //     this.h = h
    //     this.m = m
    //   }
    //   public tick() {
    //     console.log('tick tock')
    //   }
    // }
    var digital = createClock(DigitalClock, 12, 17);
    // const analog: IClockInterface = createClock(AnalogClock, 7, 32)
    console.log(digital);
    function getCounter() {
        var counter = function (start) { return start.toString(); };
        counter.interval = 123;
        counter.reset = function () { console.log(1); };
        return counter;
    }
    var c = getCounter();
    c(10);
    // c.reset && c.reset()
    c.interval = 5.0;
    // 10. 接口继承类
    // 接口可以继承类类型，但只继承了类类型中成员，但不包括他们的实现，同时会继承类的private和protected成员。
    // 对函数的校验只提现了是否存在，并没有校验函数的传参和返回值类型。
    // 当类类型存在私有成员时，只有该类的子类，即继承该类的类才会具有其私有成员。
    // 因此只有子类才能够使用继承了类类型的接口校验。
    var Control = /** @class */ (function () {
        function Control() {
        }
        // private state: any
        Control.prototype.test = function (str) {
            console.log(str);
        };
        return Control;
    }());
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Button.prototype.select = function () {
            return true;
        };
        Button.prototype.test = function () {
            return 'test';
        };
        return Button;
    }(Control));
    var TextBox = /** @class */ (function (_super) {
        __extends(TextBox, _super);
        function TextBox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextBox.prototype.select = function () {
            return true;
        };
        return TextBox;
    }(Control));
    // 错误：“Image”类型缺少“state”属性。
    // class Image1 implements ISelectableControl {
    //   select() {
    //     return true
    //   }
    // }
    var Location1 = /** @class */ (function () {
        function Location1() {
        }
        Location1.prototype.select = function () {
            return true;
        };
        Location1.prototype.test = function () {
            return true;
        };
        return Location1;
    }());
    console.log(Button);
    console.log(TextBox);
    // console.log(Image1)
    console.log(Location1);
}
//# sourceMappingURL=TypeScript 3 Interfaces.js.map