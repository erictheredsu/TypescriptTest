import _ = require("lodash");
 
let msg : string = "hello muggle!"
console.log(msg);

for (let i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}

// for (var i = 0; i < 10; i++) {
//     // capture the current state of 'i'
//     // by invoking a function with its current value
//     (function(i) {
//         setTimeout(function() { console.log(i); }, 100 * i);
//     })(i);
// }

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