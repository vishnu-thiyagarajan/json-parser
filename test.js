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
   let result = "",ref_obj = {'b':'\b','f':'\f','n':'\n','r':'\r','t':'\t','u':'u','\\':'\\','\/':'\/','\"':'\"'}
   while(!input.startsWith("\"")){
      if (["\t","\n"].includes(input[0])) return null
      result += input.slice(0,1)
      input = input.slice(1)
      if (result.endsWith("\\")) {
         result += input.slice(0,1)
         input = input.slice(1)
         if (!ref_obj.hasOwnProperty(result.slice(-1))) return null
         if (!result.endsWith("u")) result = result.slice(0,-2) + ref_obj[result.slice(-1)]
         if (result.endsWith("u")){
            if (!(/[0-9|A-F]{4}.*?/i.test(input.slice(0,4)))) return null
            result = result.slice(0,-2) + String.fromCharCode(parseInt(input.slice(0,4),16))
            input = input.slice(4)
         }
      }
   }
   return [result,input.slice(1)]
}

const valParser = function (input,initial=false){
   let fnarray = [nullParser, boolParser, numParser, strParser, arrParser, objParser],result = []
   for (let item of initial ? [arrParser, objParser] : fnarray){
      result = item(input.trimStart())
      if (initial && result) return !result[1] ? result[0] : null
      if (result) return result
   }
   return null
}

const arrParser = function (input){
   if (!(input.startsWith("["))) return null
   let arrresult=[],result
   let rest = input.slice(1).trimStart()
   while (!rest.startsWith(']')){
      result = valParser(rest)
      if (!result) return null
      arrresult.push(result[0])
      rest = result[1].trimStart()
      if (!rest.startsWith(',')) break
      rest = rest.slice(1)
      if (rest.startsWith(']')) return null
   }
   return rest.startsWith(']') ? [arrresult,rest.slice(1)] : null
}

const objParser = function (input){
   if (!(input.startsWith("{"))) return null
   input = input.slice(1).trimStart()
   if ((input.startsWith("}"))) return [{},input.slice(1)]
   let objresult={},count=0,valresult,key,keyrest
   while (input){
      result = count%2 === 0 ? strParser(input) : valParser(input)
      if (!result) return null
      if (count%2 === 0) key = result[0]
      if (count%2 !== 0) objresult[key] = result[0]
      input = result[1].trimStart()
      if (count%2 && input.startsWith("}")) break
      if (!input.startsWith(count%2 === 0 ? ':' : ',')) return null
      input = input.slice(1).trimStart()
      count +=1
   }
   return input ? [objresult,input.slice(1)] : null
}

tests = ["fail1.json","fail2.json","fail3.json","fail4.json","fail5.json","fail6.json","fail7.json","fail8.json","fail9.json","fail10.json","fail11.json","fail12.json","fail13.json","fail14.json","fail15.json","fail16.json","fail17.json","fail19.json","fail20.json","fail21.json","fail22.json","fail23.json","fail24.json","fail25.json","fail26.json","fail27.json","fail28.json","fail29.json","fail30.json","fail31.json","fail32.json","fail33.json","pass1.json","pass3.json"]
for (let test of tests){
   require('fs').readFile("test/"+test,'utf-8',(err, data) => {
      if(err) throw err
      console.log(valParser(data.trim(),true))
   })
}
