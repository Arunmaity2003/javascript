let arr = [1, 2, 3, 4, 5]

// arr.push(9); //adds elements to the last
// arr.pop() //deletes elements from last
// arr.shift()  //deletes elements from the first
// arr.unshift(0) //adds elemnts to first
// arr.splice(2,1) //start from the index 2 and deletes 1 elements
let newArr = arr.slice(2, 4)  //give a new arr from index 2 to index 4

// console.log(newArr)

// arr.reverse()
// console.log(arr)

//to sort and arr in js
let arr2 = [4, 2, 3, 7]
// arr2.sort() //it alwayas accending 
//if we want manually accending or descending
let sr = arr2.sort(function (a, b) {
    return b - a  //decending and for accending do --> a -b
})
console.log(sr)