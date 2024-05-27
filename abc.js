let abc = [1, 2, 3, 4, 5];

let xyz = abc;

xyz.push(6);

let a = 10;
let b = a;
b = 20;

let emp = {
  name: "shivam",
  email: "shivansh12@gmail.com",
  address: {
    city: "purnea",
    state: "Bihar",
  },
};

let newemp = { age: 26, ...emp };

newemp.name = "bikash sir";
newemp.address.city = "patna";
newemp.address.userId = 9;

console.log(emp);
console.log(newemp);

console.log(xyz);
console.log(abc);
// console.log(a);
// console.log(b);
