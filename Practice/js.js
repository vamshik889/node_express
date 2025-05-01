let arr = [1,2,3,4,5,6,7];

//>5

let fun = (array)=>{
let res = array.filter((e,i)=>{
    return e>5
});
return res;
};

let res1 = fun(arr);
console.log(res1)
