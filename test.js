const nullParser = input => input.startsWith('null') ?
[null, input.slice(4)]:null

const boolParser = input => input.startsWith('true') ? 
[true, input.slice(4)]:input.startsWith('false') ? 
[false, input.slice(5)]:null

const strParser = function (input) {
   if (input.startsWith('"')) {
      let c = 0
      let index = 1
      for (let item = 1;item <input.length; item+=1) {
         index += 1
         if (input[item] === "\\"){
            if (input[item+1] === "u"){
               // console.log(/[0-9|A-F]{4}.*?/i.test(input.slice(item+2,item+6)))
               if (/[0-9|A-F]{4}.*?/i.test(input.slice(item+2,item+6))){
                  item += 5
                  index += 5
                  continue
               }
               else{
                  return null
               }
            }
            if (!['b','f','n','r','t','u','\\','"',"/"].includes(input[item+1])){
               return null
            }
            c += 1
         } else {
            if ((c > 0 && c%2 === 0) || (input[item] === "\"" && c%2 === 0 && index !== 1)){
               return [input.slice(0,index),input.slice(index)?input.slice(index):null]
            }
            if (["\t","\n"].includes(input[item])){
               return null
            }
            c = 0
         }
      }
      return input.endsWith("\"") ? input : null
   } else {
      return null
   }
};

const numParser = function (input){
   let match = /^([+\-]?(([1-9]\d*(\.\d+)?|0\.\d+|0$))([eE][+\-]?\d+)?)(.*?)$/g.exec(input)
   return match ?[match[1],match[6]] : null
}
console.log(numParser("0.3.7"))
console.log(numParser("13abc"))
console.log(numParser("013abc"))
console.log(numParser("0e+-1"))
console.log(numParser("5e+"))
console.log(numParser("0e"))
console.log(numParser("15.abc"))
console.log(numParser("1234567890"))
console.log(numParser("-9876.543210"))
console.log(numParser("0.123456789e-12"))
console.log(numParser("1.234567890E+34"))
console.log(numParser("23456789012E66"))
console.log(numParser("0"))
console.log(numParser("1"))
let brace_cnt = {'{':0,'[':0}
const arrParser = function (input){
   
}

require('fs').readFile("input.json",(err, data) => {
   if(err) throw err
   console.log(strParser(data.toString()))
})

