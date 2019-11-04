const nullParser = input => input.startsWith('null') ?
[null, input.slice(4)]:null

const boolParser = input => input.startsWith('true') ? 
[true, input.slice(4)]:input.startsWith('false') ? 
[false, input.slice(5)]:null

const numParser = function (input){
   const match = /^([+\-]?([1-9]\d*(\.\d+)?|0\.\d+|0)([eE][+\-]?\d+)?)/g.exec(input)
   return match ?[1*match[1],input.slice(match[1].length)] : null
}

const strParser = function (input) {
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

const valParser = function (input){
   let result = []
   input = input.trimStart()
   let fnarray = [nullParser, boolParser, numParser, strParser, arrParser, objParser]
   for (let item of fnarray){
      result = item(input)
      if (result) return result
   }
}

const arrParser = function (input){
   input = input.trimStart()
   if (!(input.startsWith("["))) return null
   input = input.slice(1)
   let arrresult=[],result,rest
   while (input){
      result = valParser(input)
      if (!result) return null
      arrresult.push(result[0])
      rest = result[1].trimStart()
      if (rest.startsWith(']')) break
      if (!rest.startsWith(',')) return null 
      rest = rest.slice(1)
      input = rest
   }
   rest = rest.slice(1)
   return [arrresult,rest]
}

const objParser = function (input){
   input = input.trimStart()
   if (!(input.startsWith("{"))) return null
   input = input.slice(1)
   let objresult={},valresult,keyresult,keyrest
   while (input){
      input = input.trimStart()
      keyresult = strParser(input)
      if (!keyresult) return null
      keyrest = keyresult[1].trimStart()
      if (!keyrest.startsWith(':')) return null
      keyrest = keyrest.slice(1)
      valresult = valParser(keyrest)
      if (!valresult) return null
      objresult[keyresult[0]] = valresult[0]
      input = valresult[1].trimStart()
      if (input.startsWith('}')) break
      if (!input.startsWith(',')) return null
      input = input.slice(1)
   }
   input = input.slice(1)
   return [objresult,input]
}
console.log(objParser('{"array" : "make" , "5" : 5.67e10}'))
console.log(arrParser('["array" , "make" , 5, 5.67e10, true, false, null]'))