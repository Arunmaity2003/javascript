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