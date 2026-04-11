const arr = [1,2,3,4];

const result = arr.map(e => {
    if (e < 4) return e;
}).filter(Boolean);

console.log(result);

//removing duplicate
const unique = [...new Set(arr)];
console.log(unique); 

//to make flatten array
const a = [1, [2, 3], [4, [5, 6]]];
const flat = a.flat(Infinity);
console.log(flat); // [1,2,3,4,5,6]