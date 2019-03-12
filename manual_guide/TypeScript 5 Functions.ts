/*
TypeScript 教程 05：Functions 函数
*/

/* 
1. 函数类型
*/

/* 
a. 为函数定义类型
*/

/* 
我们可以给函数的每个参数添加类型后，再给函数的返回值添加类型。

TypeScript可以根据返回语句自动判断返回值类型，因此函数的返回值类型是可省略的。
*/

{
  function add(x: number, y: number): number {
    return x + y
  }

  const myAdd = function (x: number, y: number): number { return x + y }

  add(1, 2)
  myAdd(1, 2)
}

/* 
b. 书写完整函数类型
*/

/* 
函数类型（(baseValue: number, increment: number) => number），包括参数类型和返回值类型两部分，两部分都是不可缺少的。

参数可以任意命名，只要参数类型是匹配的，即是有效的。

=>之后为函数返回值类型，如果函数没有返回值，那么必须指定返回值类型为void。
*/

{
  const myAdd: (baseValue: number, increment: number) => number = function (x: number, y: number): number { return x + y }

  myAdd(1, 2)
}

/* 
c. 推断类型
*/

/* 
在赋值语句中，等号任意一边未指定类型时，TypeScript编译器会自动识别类型。
*/

{
  // myAdd1 has the full function type
  const myAdd1 = function (x: number, y: number): number {
    return x + y
  }

  // The parameters `x` and `y` have the type number
  const myAdd2: (baseValue: number, increment: number) => number = function (x, y) {
    return x + y
  }

  myAdd1(1, 2)
  myAdd2(1, 2)
}

/* 
2. 可选参数和默认参数
*/

/* 
TypeScript里，函数的参数若未被指定为可选，编译器默认他们都是必须的。

编译器会检查是否有且只有这些参数会传值，即传参的个数要和定义的个数一致，
*/

{
  function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
  }

  let result1 = buildName("Bob");                  // error, too few parameters
  let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result3 = buildName("Bob", "Adams");         // ah, just right
}

/* 
若某些参数是可选的，那么就需要在参数名后写?表示可选。

可选参数必须跟在必选参数后面。

可选参数在未传值的情况下，默认为undefined
*/

{
  const buildName: (firstName: string, lastName?: string) => string = function (firstName: string, lastName?: string) {
    if (lastName)
      return firstName + " " + lastName;
    else
      return firstName;
  }

  let result1 = buildName("Bob");  // works correctly now
  let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result3 = buildName("Bob", "Adams");  // ah, just right
}

/* 
TypeScript中，支持为一个参数设置一个默认值，当其不传值或传入的值为undefined时，该参数的值会被设置为默认值。

若传入的值为null，则会将null当做参数，而不会读取默认值。

默认参数和可选参数在函数类型中，共享同一个类型，如(firstName: string, lastName?: string) => string。
*/

{
  const buildName: (firstName: string, lastName?: string) => string = function (firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
  }

  let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
  let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
  let result3 = buildName("Bob", null);       // will returns "Bob null"
  let result4 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result5 = buildName("Bob", "Adams");         // ah, just right
}

/* 
设置默认值并不像可选参数一样，要求参数只能在必选参数之后，而可以添加在任意参数上。
*/

{
  function buildName(firstName = "Will", lastName: string) {
    return firstName + " " + lastName;
  }

  let result1 = buildName("Bob");                  // error, too few parameters
  let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
  let result3 = buildName("Bob", "Adams");         // okay and returns "Bob Adams"
  let result4 = buildName(undefined, "Adams");     // okay and returns "Will Adams"
}

/* 
3. 剩余参数
*/

/* 
在JavaScript中，可以使用arguments访问所有传入的参数。

在TypeScript中，可以将所有参数收集到一个变量中。

剩余参数的数量不限，即 >= 0，在函数内部可以直接使用剩余参数变量，这个变量为数组类型。

在定义函数类型时，也可以定义剩余参数。
*/

{
  const buildName = function (firstName: string, ...restOfName: string[]) {
    return firstName + ' ' + restOfName.join(' ')
  }

  const buildNameFun: (fname: string, ...rest: string[]) => string = buildName
  const employeeName = buildNameFun('Joseph', 'Samuel', 'Lucas', 'MacKinzie')
}

/* 
3. this
*/

/* 
a. this和箭头函数
*/

/* 
在JavaScript中，this在函数被调用时才会指定。
*/

/* 
该例子中，createCardPicker的返回值是一个函数，该函数的this被设置为undefined。

因为cardPicker()是被独立调用的，顶级的非方法式调用会将this视为window。

（注意：在严格模式下， this为undefined而不是window）
*/

{
  let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
      console.log(this) // deck
      return function () {
        console.log(this) // window
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);

        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      }
    }
  }

  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();

  console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

/* 
为了解决this指向变化的问题，我们可以使用ES6箭头函数，在函数返回时就将this绑定到deck上。

之后无论在何时调用，this指向都不会改变。

箭头函数函数会保存函数创建时的this值，而不会因为函数被调用而改变this指向。
*/

{
  let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
      // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);

        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      }
    }
  }

  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();

  console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

/*
若给编译器设置一个--noImplicitThis标记，它就会提示this.suits[pickedSuit]中的this类型为any，这表示需要为this指定一个类型。
*/

/* 
b. this参数
*/

/* 
实际使用中，需要传入一个显式的this参数，并指定它的类型。

但this参数是假的，它只是出现在参数列表的最前面，不作为一个实际传参传入函数中。
*/

{
  interface Card {
    suit: string;
    card: number;
  }
  interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
  }
  let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function (this: Deck) {
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);

        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      }
    }
  }

  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();

  console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

/* 
这样的话即使编译器加上--noImplicitThis标记，也不会报错。
*/

/* 
c. this参数在回调函数里
*/

/* 
addClickListener当函数用作回调时，会被当做一个普通函数调用，此时this将为undefined，因此指定了this的类型为void。

而类Handler的onClickBad方法指定了this的类型为Handler，因此在uiElement.addClickListener(h.onClickBad)时会因this类型不匹配而报错。
*/

{
  interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
  }

  class Handler {
    info: string;
    onClickGood(this: Handler, e: Event) {
      console.log(this)
      // oops, used this here. using this callback would crash at runtime
      this.info = e.message;
    }
  }
  let h = new Handler();
  let uiElement: UIElement = {
    addClickListener(onclick: (this: void, e: Event) => void) {
      // do something
    }
  }
  uiElement.addClickListener(h.onClickGood); // error!
}

/* 
要修复这个错误有两种方式：

1) 修改onClickGood中的this参数类型为void，但这样还是无法在onClickGood中使用this
*/

/* 
2) 将onClickGood方法修改为箭头函数，因为箭头函数会绑定this到Handler的实例上，即可修复此问题。注意：箭头函数不支持定义this的类型。
*/

{
  interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
  }

  class Handler {
    info: string;
    onClickGood = (e: Event) => {
      console.log(this)
      // oops, used this here. using this callback would crash at runtime
      // this.info = e.message;
    }
  }
  let h = new Handler();
  let uiElement: UIElement = {
    addClickListener(onclick: (this: void, e: Event) => void) {
      onclick({} as Event)
      // do something
    }
  }
  uiElement.addClickListener(h.onClickGood); // error!
}

/* 
4. 重载
*/

/* 
如下面的函数，当函数具有多种返回值时，可以将函数的返回值类型定义为any，但此时就失去了检查的意义了。
*/

{
  let suits = ["hearts", "spades", "clubs", "diamonds"];

  function pickCard1(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
    }
  }

  let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
  let pickedCard1 = myDeck[pickCard1(myDeck)];
  console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

  let pickedCard2 = pickCard1(15);
  console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
}

/* 
可以通过方法重载的方式，定义多个函数类型，编译器会根据函数类型的重载列表，即前2个函数类型，调用相应的类型进行检查。

第三个函数为函数的定义，function pickCard2(x): any并不是重载列表的一部分，它的定义并不影响类型检查。

即在进行类型检查时，还是以重载列表为准，与函数的定义无关。

对重载列表的检查，也是从上到下依次进行的，因此要把最精确的类型定义放在最前面。
*/

{
  let suits = ["hearts", "spades", "clubs", "diamonds"];

  // 重载列表
  function pickCard2(x: { suit: string; card: number; }[]): number;
  function pickCard2(x: number): { suit: string; card: number; };

  // 函数定义
  function pickCard2(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
    }
  }

  let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
  let pickedCard1 = myDeck[pickCard2(myDeck)];
  console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

  let pickedCard2 = pickCard2(15);
  console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
}