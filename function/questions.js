//use rest operator to get any number of scores and return the total 

function total(...scores){
    // console.log(scores)
    total = 0;
    scores.forEach(function(val){
        total = total + val
    })

    return total
}

let ans = total(1,2,4,5,7,8)
console.log(ans)

//pass a function into another function and execute it inside
function kuchvi(val){
    val()
}
kuchvi(function(){
    console.log("hello there is nothing no explain again!")
})

//closure
function outer(){
    let value = 0;
    return function(){
        value++
        console.log(value)
    }
}

let counter = outer();
// counter()
// counter()

//IIFE=--WHY WE NEED IT
let example = (function(){
    let score = 0;
    return {
        getscore: function(){
            console.log(score)
        },

        setscore: function(val){
            score = val
        }
    }
})();

//make a resuable discount calculator using higher order function
function discountCalculator(discount){
    return function(price){
        return price - price * (discount/100)
    }
}

let ten = discountCalculator(10)
let twenty = discountCalculator(20)

console.log(ten(200))
console.log(twenty(200))

//counter
function Counter(){
    let count = 0;
    return function(){
        count++;
        return count
    }
}

let c = Counter();
console.log(c()) //1
console.log(c()) //2

let d = Counter() //it will not give you the increasing value as it a new counter
console.log(d()) //1