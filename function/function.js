function dsa(){ //function declaration
    console.log("i am learning how to learn")
}

let tum = function(){ //this is the function expression
    console.log("ab ye vi kam karege")
}

let a = () => { //fat arrow function
    console.log("this will work also.")
}

//now function with argument
function first(a,b){
    console.log(`${a} is talking to ${b}`)
}
// first("dilbar","diljale")

//rest operator
function no(...val){
    console.log(val)
}
// no(1,1,2,4,5,6)

function yhoo(a,b,...val){
    console.log(a,b,val)
}

// yhoo(2,3)

//first class function-> function use as a variable**
//higher order function -> function that accept or return a function***

function f(val){ //the function f is called higher order function as it accept a function as argument
    val()
}

f(function(){ //this functioin is the first class function
    // console.log("I am a first class function")
})


function higher(){
    return function(){
        console.log('dekhliya na')
    }
}

// higher()() //second () is for the returned function


//clouser
function guru(){
    var a = 12;
    return function(){
        console.log(a)
    }
}
guru()()



//callback function
function gretting(name,callback){
    console.log(`hello ${name}`)
    callback()
}

gretting("dilbar",function(){
    console.log("how are you?")
})


//IIFE -> Immediately Invoked Function Expression
(function() {

})()