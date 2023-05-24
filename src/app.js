// link to HTML elements
const calcButtons = document.querySelectorAll('.btn');
const inputScreen = document.querySelector('.screenIn');
const outputScreen = document.getElementById('outputScreen');

let input = "";

// Adding function to buttons + giving buttons correct property
for ( let btn of calcButtons ) {
    const value = btn.dataset.btn;

    btn.addEventListener('click', () =>{
        if ( value == "clear" ){
            input = "";
            inputScreen.innerHTML = ""; 
            outputScreen.innerHTML = "";
        } else if ( value == "backspace" ){
            input = input.slice(0, -1);
            inputScreen.innerHTML = validInput( input );
        } else if ( value == "=" ){
            let result = eval( percentagePrep( input ) );

            outputScreen.innerHTML = validOutput( result ); 
        } else if (value == "parenthesis") {
			if (
				input.indexOf("(") == -1 || input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") < input.lastIndexOf(")")
			) {
				input += "(";
			} else if (input.indexOf("(") != -1 && input.indexOf(")") == -1 || input.indexOf("(") != -1 &&input.indexOf(")") != -1 &&input.lastIndexOf("(") > input.lastIndexOf(")")
			) {
				input += ")";
			}

            inputScreen.innerHTML = validInput(input);  
        } else {
            if ( correctInput( value ) ){
                input += value;
                inputScreen.innerHTML = validInput(input);
            }
        }
    })
}


// adding correct character for operators + changing color
function validInput(input) {
    let inputs = input.split("");
    let inputsLength = inputs.length;

    for ( let i = 0; i < inputsLength; i++){
        if ( inputs[i] == "*"){
            inputs[i] = ` <span class="operator">&times;</span> `
        } else if ( inputs[i] == "/"){
            inputs[i] = ` <span class="operator">&div;</span> `
        } else if ( inputs[i] == "+"){
            inputs[i] = ` <span class="operator">+</span> `
        } else if ( inputs[i] == "-"){
            inputs[i] = ` <span class="operator">-</span> `
        } else if ( inputs[i] == "("){
            inputs[i] = `<span class="parenthesis">(</span>`
        } else if ( inputs[i] == ")"){
            inputs[i] = `<span class="parenthesis">)</span>`
        } else if ( inputs[i] == "%"){
            inputs[i] = `<span class="percentage">%</span>`
        }
    }
    
    return inputs.join("");
}


//Adding decimal points to output
function validOutput( output ){
    let outputString = output.toString();
    let decimal = outputString.split(".")[1];
    outputString = outputString.split(".")[0];

    let outputs = outputString.split("");

    if ( outputs.length > 3 ){
        for ( let i = outputs.length - 3; i > 0; i -= 3){
            outputs.splice( i, 0, ",");
        }
    }

    if ( decimal ) {
        outputs.push(".");
        outputs.push( decimal );
    }

    return outputs.join("");
}

//Prevent operators and "." from being addable multiple times
function correctInput ( value ){
    let inputLast = input.slice(-1);
    let operators = [ "+", "-", "*", "/" ];

    if ( value == "." && inputLast == "." ){
        return false;
    }

    if ( operators.includes( value ) ){
        if ( operators.includes( inputLast ) ){
            return false;
        } else {
            return true;
        }
    }

    return true;
}

//Giving % operator correct functionality
function percentagePrep ( input ) {
    let inputs = input.split( "" );

    for ( let i = 0; i < inputs.length; i++ ){
        if ( inputs[ i ] == "%"){
            inputs[ i ] = "/100";
        }
    }

    return inputs.join( "" );
}

// document.addEventListener( 'keydown', ( event ) => {
//     if ( event.key == "1") { inputScreen.value += event.key;}
// })