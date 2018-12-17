export default function () {
    // TypeScript 学习笔记
    // 五、函数
    // 1. 函数类型
    // a. 为函数定义类型
    // 我们可以给函数的每个参数添加类型后，再给函数的返回值添加类型。
    // TypeScript可以根据返回语句自动判断返回值类型，因此返回值类型是可省略的。
    function add(x, y) {
        return x + y;
    }
    {
        var myAdd = function (x, y) { return x + y; };
        add(1, 2);
        myAdd(1, 2);
    }
    // b. 书写完整函数类型
    // 函数类型包括参数类型和返回值类型两部分，两部分都是不可缺少的。
    // 参数可以任意命名，只要参数类型是匹配的，即是有效的。
    // =>之后为函数返回值类型，如果函数没有返回值，那么必须指定返回值类型为void。
    {
        var myAdd = function (x, y) { return x + y; };
        myAdd(1, 2);
    }
    // c. 推断类型
    // 在赋值语句中，变量未指定类型时，TypeScript编译器会自动识别类型。
    {
        // myAdd1 has the full function type
        var myAdd1 = function (x, y) {
            return x + y;
        };
        // The parameters `x` and `y` have the type number
        var myAdd2 = function (x, y) {
            return x + y;
        };
        myAdd1(1, 2);
        myAdd2(1, 2);
    }
    // 2. 可选参数和默认参数
    // TypeScript编译器默认会检查每个参数是否都传值。
    // 而且传参的个数必须与类型定义的参数个数一致。
    // 若某些参数是可选的，那么就需要在参数名后写?表示可选。
    // 可选参数必须跟在必选参数后面。
    // 可选参数在未传值的情况下，默认为undefined
    {
        var buildName = function (firstName, lastName) {
            if (lastName) {
                return firstName + ' ' + lastName;
            }
            return firstName;
        };
        var result1 = buildName('Bob'); // works correctly now
        // const result2 = buildName('Bob', 'Adams', 'Sr.')  // error, too many parameters
        var result3 = buildName('Bob', 'Adams'); // ah, just right
        console.log(result1);
        // console.log(result2)
        console.log(result3);
    }
    // TypeScript中，支持为一个参数设置一个默认值，当其不传值或传入的值为undefined时，该参数的值会被设置为默认值（传null则会报错）
    // 设置默认值时，TypeScript会自动为参数添加一个undefined类型，如string | undefined
    // 设置默认值并不像可选参数一样，要求参数只能在必选参数之后，而可以添加在任意参数上。
    {
        var buildName = function (firstName, lastName) {
            if (lastName === void 0) { lastName = 'Smith'; }
            return firstName + ' ' + lastName;
        };
        var result1 = buildName('Bob'); // works correctly now, returns "Bob Smith"
        // const result2 = buildName('Bob', undefined)       // still works, also returns "Bob Smith"
        // const result3 = buildName('Bob', null)       // 不可传入null
        // let result4 = buildName('Bob', 'Adams', 'Sr.')  // error, too many parameters
        var result5 = buildName('Bob', 'Adams'); // ah, just right
        console.log(result1); // Bob Smith
        // console.log(result2)  // Bob Smith
        // console.log(result3)
        // console.log(result4)
        console.log(result5); // Bob Adams
    }
    // 3. 剩余参数
    // 在JavaScript中，可以使用arguments访问所有传入的参数。
    // 在TypeScript中，可以将所有参数收集到一个变量中。
    // 剩余参数的数量不限，即 >= 0，在函数内部可以直接使用剩余参数变量，这个变量为数组类型。
    // 在定义函数类型时，也可以定义剩余参数。
    {
        var buildName = function (firstName) {
            var restOfName = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                restOfName[_i - 1] = arguments[_i];
            }
            return firstName + ' ' + restOfName.join(' ');
        };
        var buildNameFun = buildName;
        var employeeName = buildNameFun('Joseph', 'Samuel', 'Lucas', 'MacKinzie');
        console.log(employeeName);
    }
    // 3. this
    // a. this和箭头函数
    // 在JavaScript中，this在函数被调用时才会指定。
    {
        // 该例子中，createCardPicker的返回值是一个函数，该函数的this被设置为undefined。
        // 因为cardPicker()是被独立调用的，顶级的非方法式调用会将this视为window。
        // 注意：在严格模式下，this为undefined而不是window。
        var deck = {
            cards: Array(52),
            createCardPicker: function () {
                console.log(this); // deck
                return function () {
                    console.log(this); // undefined
                    var pickedCard = Math.floor(Math.random() * 52);
                    // const pickedSuit: number = Math.floor(pickedCard / 13)
                    return {
                        card: pickedCard % 13,
                    };
                };
            },
            suits: ['hearts', 'spades', 'clubs', 'diamonds'],
        };
        var cardPicker = deck.createCardPicker();
        var pickedCard = cardPicker();
        console.log('card: ' + pickedCard.card + ' of ' + (pickedCard.suit || ''));
    }
    {
        // 箭头函数函数会保存函数创建时的this值，而不会因为函数被调用而改变this指向。
        var deck = {
            cards: Array(52),
            createCardPicker: function () {
                var _this = this;
                // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
                return function () {
                    var pickedCard = Math.floor(Math.random() * 52);
                    var pickedSuit = Math.floor(pickedCard / 13);
                    return {
                        card: pickedCard % 13,
                        suit: _this.suits[pickedSuit],
                    };
                };
            },
            suits: ['hearts', 'spades', 'clubs', 'diamonds'],
        };
        var cardPicker = deck.createCardPicker();
        var pickedCard = cardPicker();
        console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit);
    }
    // 4. this参数
    // 实际使用中，需要传入一个显式的this参数，但this参数是假的，它只是出现在参数列表的最前面，实际不作为一个传参传入函数中。
    // 使用中需要指定this的类型，而不是直接指定为any。
    {
        var deck = {
            cards: Array(52),
            // NOTE: The function now explicitly specifies that its callee must be of type IDeck
            createCardPicker: function () {
                var _this = this;
                return function () {
                    var pickedCard = Math.floor(Math.random() * 52);
                    var pickedSuit = Math.floor(pickedCard / 13);
                    return {
                        card: pickedCard % 13,
                        suit: _this.suits[pickedSuit],
                    };
                };
            },
            suits: ['hearts', 'spades', 'clubs', 'diamonds'],
        };
        var cardPicker = deck.createCardPicker();
        var pickedCard = cardPicker();
        console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit);
    }
    // a. this参数在回调函数里
    // 当函数用作回调时，会被当做一个普通函数调用，此时this降为undefined。
    // 此时需要指定this类型，但此时addClickListener要求函数的this类型为void。
    /* class Handler {
      info: string;
      onClickBad(this: Handler, e: Event) {
        // oops, used this here. using this callback would crash at runtime
        this.info = e.message;
      }
    }
    let h = new Handler();
    uiElement.addClickListener(h.onClickBad); // error! */
    // 若指定了this: void后，则无法使用this.info，因为this不具有Handler类型。
    // 此时就需要使用箭头函数处理。
    /* class Handler {
      info: string;
      onClickGood = (e: Event) => { this.info = e.message }
    } */
    // 箭头函数不会捕获this，所以可以将他们传给期望this: void的函数。
    // 但每个Handler对象都会创建一个箭头函数。另外，方法只会被创建一次，添加到Handler的原型链上。它们在不同的Handler对象间是共享的。
    // 5. 重载
    // 函数当函数具有多种返回值时，可以将函数的返回值类型定义为any，但此时就失去了检查的意义了。
    {
        var suits_1 = ['hearts', 'spades', 'clubs', 'diamonds'];
        var pickCard_1 = function (x) {
            // Check to see if we're working with an object/array
            // if so, they gave us the deck and we'll pick the card
            if (typeof x === 'object') {
                var pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            // Otherwise just let them pick the card
            else if (typeof x === 'number') {
                var pickedSuit = Math.floor(x / 13);
                return { suit: suits_1[pickedSuit], card: x % 13 };
            }
        };
        var myDeck_1 = [{ suit: 'diamonds', card: 2 }, { suit: 'spades', card: 10 }, { suit: 'hearts', card: 4 }];
        var pickedCard1_1 = myDeck_1[pickCard_1(myDeck_1)];
        console.log('card: ' + pickedCard1_1.card + ' of ' + pickedCard1_1.suit);
        var pickedCard2_1 = pickCard_1(15);
        console.log('card: ' + pickedCard2_1.card + ' of ' + pickedCard2_1.suit);
    }
    // 可以通过方法重载的方式，定义多个函数类型，编译器会根据函数类型的列表，去调用相应的类型进行检查。
    var suits = ['hearts', 'spades', 'clubs', 'diamonds'];
    function pickCard(x) {
        // Check to see if we're working with an object/array
        // if so, they gave us the deck and we'll pick the card
        if (typeof x === 'object') {
            var pickedCard = Math.floor(Math.random() * x.length);
            return pickedCard;
        }
        // Otherwise just let them pick the card
        else if (typeof x === 'number') {
            var pickedSuit = Math.floor(x / 13);
            return { suit: suits[pickedSuit], card: x % 13 };
        }
    }
    var myDeck = [{ suit: 'diamonds', card: 2 }, { suit: 'spades', card: 10 }, { suit: 'hearts', card: 4 }];
    var pickedCard1 = myDeck[pickCard(myDeck)];
    console.log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit);
    var pickedCard2 = pickCard(15);
    console.log('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit);
}
//# sourceMappingURL=TypeScript 5 Functions.js.map