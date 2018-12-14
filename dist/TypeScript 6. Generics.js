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
    // 泛型
    // 1. 泛型
    // 可将方法的类型通过类型变量T传入方法，可在函数传参和返回值中使用泛型变量T，整个函数就是一个泛型。
    // 实际使用中可以传入类型参数使用。也可以不传参，利用类型推论，编译器会根据传入的参数自动确定参数T的类型。
    (function () {
        function identity(arg) {
            return arg;
        }
        identity(1);
        identity(2);
    })();
    (function () {
        // function loggingIdentity<T>(arg: T): T {
        //   console.log(arg.length)  // Error: T doesn't have .length
        //   return arg
        // }
        function loggingIdentity(arg) {
            console.log(arg.length); // Array has a .length, so no more error
            return arg;
        }
        loggingIdentity([1, 2, 3]);
    })();
    (function () {
        function identity(arg) {
            return arg;
        }
        // 我们可以像函数类型一样使用泛型类型，泛型参数名可以不同，编译器只关心数量和使用方式的对应。
        var myIdentity1 = identity;
        myIdentity1(1);
        // 可以使用调用签名的对象字面量来定义泛型函数。
        var myIdentity2 = identity;
        myIdentity2(2);
        // 使用泛型类型定义参数的类型。
        var myIdentity3 = identity;
        myIdentity3(3);
        // 使用泛型类型定义参数的类型。
        var myIdentity4 = identity;
        myIdentity4(4);
    })();
    (function () {
        var GenericNumber = /** @class */ (function () {
            function GenericNumber() {
            }
            return GenericNumber;
        }());
        var myGenericNumber = new GenericNumber();
        myGenericNumber.zeroValue = 0;
        myGenericNumber.add = function (x, y) { return x + y; };
        var stringNumeric = new GenericNumber();
        stringNumeric.zeroValue = '';
        stringNumeric.add = function (x, y) { return x + y; };
        console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'));
    })();
    (function () {
        function loggingIdentity(arg) {
            console.log(arg.length); // Now we know it has a .length property, so no more error
            return arg;
        }
        // loggingIdentity(3)  // Error, number doesn't have a .length property
        loggingIdentity([1, 2, 3]); // 数组包含.length属性。
        loggingIdentity({ length: 10, value: 3 }); // 也可传入包含.length属性的对象。
    })();
    (function () {
        function create(C) {
            return new C();
        }
        create(Function);
    })();
    (function () {
        var BeeKeeper = /** @class */ (function () {
            function BeeKeeper() {
            }
            return BeeKeeper;
        }());
        var ZooKeeper = /** @class */ (function () {
            function ZooKeeper() {
            }
            return ZooKeeper;
        }());
        var Animal = /** @class */ (function () {
            function Animal() {
            }
            return Animal;
        }());
        var Bee = /** @class */ (function (_super) {
            __extends(Bee, _super);
            function Bee() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Bee;
        }(Animal));
        var Lion = /** @class */ (function (_super) {
            __extends(Lion, _super);
            function Lion() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Lion;
        }(Animal));
        function createInstance(C) {
            return new C();
        }
        console.log(createInstance(Lion)); // typechecks!
        console.log(createInstance(Bee)); // typechecks!
        // console.log(createInstance(BeeKeeper))   // 错误，因为BeeKeeper中不含有numLegs属性
    })();
}
//# sourceMappingURL=TypeScript 6. Generics.js.map