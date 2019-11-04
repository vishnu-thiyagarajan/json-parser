const nullParser = input => input.startsWith('null') ?
[null, input.slice(4)]:null

const boolParser = input => input.startsWith('true') ? 
[true, input.slice(4)]:input.startsWith('false') ? 
[false, input.slice(5)]:null

const numParser = function (input){
   input = input.trimStart()
   const match = /^([+\-]?([1-9]\d*(\.\d+)?|0\.\d+|0)([eE][+\-]?\d+)?)/g.exec(input)
   return match ?[1*match[1],input.slice(match[1].length)] : null
}

// console.log(numParser("13abc0"))
// console.log(numParser("15.abc"))
// console.log(numParser("1234567890"))
// console.log(numParser("-9876.543210"))
// console.log(numParser("0.123456789e-12"))
// console.log(numParser("1.234567890E+34"))
// console.log(numParser("23456789012E66"))
// console.log(numParser("0.3.7.5"))
// console.log(numParser("0"))
// console.log(numParser("1"))
// console.log(numParser("013abc"))
// console.log(numParser("0e+-1"))
// console.log(numParser("0e+"))
// console.log(numParser("0e"))
// console.log(numParser("00.15"))

const strParser = function (input) {
   input = input.trimStart()
   if (!input.startsWith('"')) return null
   input = input.slice(1)
   let c = 0
   let index = 0
   while (index < input.length) {
      if (["\t","\n"].includes(input[index])) return null
      if (input[index] === '"' && c%2 === 0) break
      if (input[index] === "\\"){
         c += 1
         if (!['b','f','n','r','t','u','\\','"',"/"].includes(input[index+1])) return null
         if (input[index+1] === "u"){
            if (!(/[0-9|A-F]{4}.*?/i.test(input.slice(index+2,index+6)))) return null
               index += 4
         }
      }
      if (input[index] !== "\\") c = 0
      index += 1
      }
   if (input[index] !== "\"") return null
   return [input.slice(0,index),input.slice(index+1)]
}

require('fs').readFile("input.json",(err, data) => {
   if(err) throw err
   datas = data.toString().split("@")
   for (let item of datas){
      console.log(strParser(item))
   }
})








// const arrParser = function (input){
//    input = input.trim()
//    if (!(input.startsWith("["))) return null
//    input = input.slice(1)
//    let index = 0
//    while(index < input.length){
      
//    }
   // elements = input.split(",")
   // index = 0
   // for (let item of elements){
   //    item = item.trim()
   //    if (index === 0){
   //       if (!item[0] != "["){
   //          return null
   //       }
   //       item = item.slice(1)
   //    }
   //    if (index === input.length-1){
   //          if (!item[item.length-1] != "]"){
   //             return null
   //          }
   //          item = item.slice(0,item.length-1)
   //    }
   // }
   // return "passed"
// }

// console.log(arrParser('["Unclosed array", "array" , 1 , true, null]'))

