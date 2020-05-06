import _ = require("lodash");
 
'use strict';

let msg : string = "hello muggle!"
console.log(msg);

//guess what will print out,  1,2,3... or 10?

for (let i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}

//correct version
// for (var i = 0; i < 10; i++) {
//     // capture the current state of 'i'
//     // by invoking a function with its current value
//     (function(i) {
//         setTimeout(function() { console.log(i); }, 100 * i);
//     })(i);
// }

// optional member
interface iPoint{
    x : number;
    y : number;
    z? : number;
}

function addPoint(p : iPoint, q : iPoint) : iPoint{
   let newPoint =  {
        x: p.x + q.x,
        y: p.y + q.y
    };

    return newPoint;
}

console.log(addPoint({x:1,y:2,z:4}, {x:2,y:3,z:3})); 


function insPoint(p:iPoint) : iPoint{
    return {
        x : p.x+1,
        y: p.y+1,
        z : p.z+1
    }
}

let ins : (p: iPoint) => iPoint = insPoint;

console.log(ins({x:1,y:2,z:4}));

//interface
interface Shape {
    color: string;
}

let square = <Shape>{};
square.color = 'blue';

console.log(square.color);

//class prototype
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());


// type emit
// myAdd has the full function type
let myAdd1 = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd2: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };

let z = myAdd1(1,2);
z = myAdd2(2,3);


// this pointer
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker(); // why no error throw here?

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);


// function loggingIdentity<T>(arg: T): T {
//     console.log(arg.length);  // Error: T doesn't have .length
//     return arg;
// }

interface Lengthwise {
    length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

loggingIdentity({length: 10, value: 3});
//loggingIdentity(3); //error while compile

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // okay
//getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

// type compatible
interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
// OK, because of structural typing although Person doesn't implement Named
p = new Person();

//advanced type, TypeGuards and 

interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(isFish : boolean): Fish | Bird {
    if(isFish)
    {
        return <Fish>{};
    }
    else
    {
        return <Bird>{};
    }
}

// let pet = getSmallPet(true);
//pet.layEggs(); // okay
//pet.swim();    // errors

// if ((<Fish>pet).swim) {
//     (<Fish>pet).swim();
// }
// else {
//     (<Bird>pet).fly();
// }

//custom type guard
// function isFish(pet : Fish | Bird) : pet is Fish{
//     return (<Fish>pet).swim !== undefined;
// }

// if (isFish(pet)) {
//     pet.swim();
// }
// else {
//     pet.fly();
// }


//symbol need change "target": "es6" in tsconfig.json
let s1 = Symbol();
let s2 = Symbol();
console.log(s1 === s2); //false

let obj = {};
obj[s1] = 'aaa';
obj[s2] = 2;

let keyarray = Object.keys(obj);
console.log(obj[s1]);
console.log(Reflect.ownKeys(obj))
console.log(JSON.stringify(obj));


console.log('end');