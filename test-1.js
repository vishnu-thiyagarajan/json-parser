function execute(input,expression="",result=""){
   let count=input.length
   if (!input.startsWith("(")) return null
   input = input.slice(1)
   let operand = input[0]
   if (!/^(\+|-|\*|\/|=|>|<|>=|<=|&|\||%|!|\^|\(|\))$/.test(operand)) return null
   if (input[1] !== " ") return null
   input = input.slice(2)
   while(!input.startsWith(")")){
      if (input[0] === "(") {
         let value = [...execute(input)]
         console.log(value)
         expression += String(value[0])
         input = value[1]
      }
      if (input[0] === " ") expression += operand
      if (input[0] !== " " && input[0] !== ")") expression += input[0]
      if (input[0] !== ")") input = input.slice(1)
   }
   input = input.slice(1)
   console.log(expression)
   return [eval(expression),input]
}
console.log(execute("(+ 1 (* 5 (* 6 2 (- 2 2)) 1) 5)"))