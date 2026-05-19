let arr = [1,2,3,4,5,6]

// let newArr = arr.map((val) => {
//     return val * 2
// })

// let newArr = arr.filter((val) => {
//     if(val > 3) return val
// })

let newArr = arr.reduce((accumulator,val) => {
    return accumulator + val
},0)

console.log(newArr)