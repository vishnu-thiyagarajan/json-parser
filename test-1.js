function execute(input,expression="",result=""){
   let count=input.length
   if (!input.startsWith("(")) return null
   input = input.slice(1).trim()
   let operand = input[0], number = ""
   if (input[1] === "=") {operand += "="; input = input.slice(1)}
   if (!/^(\+|-|\*|\/|=|>|<|>=|<=|&|\||%|!|!=|\^|\(|\))$/.test(operand)) return null
   if (input[1] !== " ") return null
   input = input.slice(2)
   while(!input.startsWith(")") && input.length){
      if (input[0] === "(") {
         if (!expression.endsWith(operand)) expression += operand
         let value = execute(input)
         if (!value) return null
         expression += String(value[0])
         input = value[1]
      }
      if (input[0] === " ") {
         if (number && !/^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/.test(number.trim())) return null
         if (!expression.endsWith(operand)) expression += operand
         number = ""
      }
      if (input[0] !== " " && input[0] !== ")"){number+=input[0]; expression += input[0]}
      if (input[0] !== ")") input = input.slice(1)
   }
   if (number && !/^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/.test(number.trim())) return null
   if (expression.endsWith(operand)) expression = expression.slice(0,-1)
   if (!input.startsWith(")")) return null
   input = " "+input.slice(1)
   return [eval(expression),input]
}
// console.log(execute("(+ 1(  * 5   (* 6 2(+ 2 2 2))      1)5) rest"))
// console.log(execute("(+ 3      12 )"))
// console.log(execute("(+ 3 12 12)"))
// console.log(execute("(!= 4 12)"))
function atom(str){
   try {return parseFloat(str)}
   catch (err){
      try{return parseInt(str)}
      catch(err){
         return str
      }
   }
}

env_dict = {
   '+':(input)=>input.reduce((a,b) => a+b,0),
   '-':(input)=>input.reduce((a,b) => a-b,0),
   '*':(input)=>input.reduce((a,b) => a*b),
   '/':(input)=>input.reduce((a,b) => a/b),
}

function parser(input,initial=true){
   let arr = [],operand=""
   if (!input.startsWith("(")) return null
   input = input.slice(1).trimStart()
   while(!input.startsWith(")") && input.length){
      let match = /(^[^\(\)\s]+)(.*)/.exec(input)
      if (!match) return null
      if (!initial) {arr.push(atom(match[1]))}
      if (initial) {
         if (!match || !env_dict.hasOwnProperty(match[1])) return null
         operand = match[1]; initial = false;
      }
      input = match[2] ? match[2].trimStart() : ""
      if (input.startsWith("(")){
         let res = parser(input)
         if (!res) return null
         arr.push(atom(res[0]))
         input = res[1].trimStart()
      }
   }
   return [env_dict[operand](arr),input.slice(1)]
}
// console.log(parser("(* 2 (+ 3 (+ 2 3 -1)))"))
// console.log(parser("(- 2 )"))
// console.log(parser("(+ 1( * 5   (* 6 2 (/ 2 2 2))      1)5)"))