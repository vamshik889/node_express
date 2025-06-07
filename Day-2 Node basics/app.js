const sum = (a, b) => {
  console.log(a + b);
};

const sub = (a, b) => {
  console.log(a - b);
};
const pro = (a, b) => {
  console.log(a * b);
};

const divide = (a,b)=>{
  if(a>=0) {return a/b}
}

module.exports = { sum, sub, pro,divide };
