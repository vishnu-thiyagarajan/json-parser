function execute(input,expression="",result=""){
   let count=input.length
   if (!input.startsWith("(")) return null
   input = input.slice(1)
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
console.log(execute("(+ 1(* 5(* 6 2(+ 2 2 2))      1)5) rest"))
console.log(execute("(+ 3      12 )"))
console.log(execute("(<= 3 12 12)"))
console.log(execute("(!= 4 12)"))