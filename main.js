var currentOperator;
var newInput = true;
var oldResult = false;
var input = document.getElementById("input");
var equation = document.getElementById("equation");
var value1 = null;

input.value = "0";

// stors digit value
function btnDigit(e) {
  equation.innerHTML += e.innerHTML;

  if (newInput) {
    input.value = e.innerHTML;
    if (oldResult) {
      equation.innerHTML = e.innerHTML;
      oldResult = false;
    }
    newInput = false;
    input.style.fontSize = "2em";
  } else {
    input.value += e.innerHTML;
  }
}//end of function

// sets above display of equation
function setDisplayEquationText(text) {
   if (text.indexOf("=") >= 0) {
    var equalsToStartIndex = text.indexOf("=") + 1;
    var currentEquation = text.substring(equalsToStartIndex,text.length);
    text = currentEquation + operator;
  } 
  
    text += operator;
}  
// end of function


// stores arithmetic operator
function btnOperator(e) {
  var operator = e.innerHTML;
  

  if(currentOperator ==null){
    value1 = parseFloat(input.value);

  text = input.value;
    if (equation.innerHTML.indexOf("=") >= 0) {
    var equalsToStartIndex = equation.innerHTML.indexOf("=") + 1;
    var currentEquation = equation.innerHTML.substring(equalsToStartIndex,equation.innerHTML.length);

    equation.innerHTML = currentEquation + operator;
  } else {
    equation.innerHTML += operator;
  }

  if (
    operator == decodeEntity("&radic;") ||
    operator == decodeEntity("&#8731;") ||
    operator == decodeEntity("X&sup2;")
  ) {
    newInput =true
     oldResult = true;
    // advaced arithmetic; work with one value
    switch (operator) {
      case decodeEntity("&radic;"): //squareroot
        input.value = Math.sqrt(value1);
         setInputFont()
        equation.innerHTML = `${operator}${value1} = ${input.value}`;
        setEquationFont()
        value1 = null;
        currentOperator = null;
        break;
      case decodeEntity("&#8731;"): //cube root
        input.value = Math.cbrt(value1);
         setInputFont()
        equation.innerHTML = `${operator}${value1} = ${input.value}`;
        setEquationFont()
        value1 = null;
        currentOperator = null;
        break;
      case decodeEntity("X&sup2;"):
        input.value = value1 ** 2;
         setInputFont()
        equation.innerHTML = `${operator}${value1} = ${input.value}`;
        setEquationFont()
        value1 = null;
        currentOperator = null;
        break;
    }
  } else {
    currentOperator = operator;
    oldResult=false
    newInput = true;
  }
  }

   
} //end of function


// decodes HTML entities
function decodeEntity(entity) {
  var el = document.createElement("span");
  el.innerHTML = entity;

  return el.innerHTML;
} //end of function


// clear/reset display & values
function btnACpressed(e) {
  newInput = true;
  oldResult = true;
  equation.innerHTML = "";
  input.value = "0";
  input.style.fontSize = "2em";
} //end of function

function setInputFont(){
  if (input.value.length > 5) {
    input.style.fontSize = ".8em";
  }
}//end of function

function setEquationFont(){
  if (equation.innerHTML.length > 8) {
    equation.style.fontSize = ".5em";
    equation.style.whiteSpace = 'normal';
  }
}//end of function


//equal to function
function btnEqualTo(e) {
  if (value1>=0) {
    
    var value2 = parseFloat(input.value);
    newInput = true
   oldResult = true;
    // basic arithmetic operators
    switch (currentOperator) {
      case decodeEntity("X&#8319;"): //x to power of n
        input.value = value1 ** value2;
        setInputFont()
        equation.innerHTML += e.innerHTML + input.value;
        setEquationFont()
        value1 = null;
        value2 = null;
        currentOperator = null;
        break;

      case decodeEntity("&times;"): //Multiply i.e X
        input.value = value1 * value2;
         setInputFont()
        equation.innerHTML += e.innerHTML + input.value;
        setEquationFont()
        value1 = null;
        value2 = null;
        currentOperator = null;
        break;

      case decodeEntity("&minus;"): //Subtract i.e -
        input.value = value1 - value2;
         setInputFont()
        equation.innerHTML += e.innerHTML + input.value;
        setEquationFont()
        value1 = null;
        value2 = null;
        currentOperator = null;
        break;

      case decodeEntity("&plus;"): //Addition/plus i.e +
        input.value = value1 + value2;
         setInputFont()
        equation.innerHTML += e.innerHTML + input.value;
        setEquationFont()
        currentOperator = null;
        value1 = null;
        value2 = null;
        break;

      case decodeEntity("&divide;"): //Divide
      
        if (value2 == 0) {
          input.value = undefined;
        } else {
          input.value = value1 / value2;
        }
         setInputFont()
        equation.innerHTML += e.innerHTML + input.value;
        setEquationFont()
        value1 = null;
        value2 = null;
        currentOperator = null;
        break;
    }
  }
}//end of function
