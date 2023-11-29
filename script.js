// State of the webpage, augmented by button events
const state = {total: 0, newNumber: 0, function: "", dotPressed: false, decimals: 0}

// Sets the current function in the state while displaying it on the calculator
function setFunction(f) {
    if (state.function)
        document.querySelector("#" + state.function).style.outline = "none";
    state.function = f;
    if (f) {
        document.querySelector("#" + state.function).style.outline = "black solid 1px";
    }
}

// Sets and displays the main number on the calculator
function setNewNumber(n) {
    state.newNumber = n;
    let s = n.toString();
    if (s.length < 15) {
        document.querySelector("#current").innerText = s;
    } else {
        document.querySelector("#current").innerText = n.toPrecision(8);
    }
}

// Sets and displays the small total number on the calculator
function setTotal(n) {
    state.total = n;
    document.querySelector("#total").innerText = n;
}

// Performs operation on the calculator
function operate(n1, n2, f) {
    switch (f) {
        case ("plus"):
            return n1 + n2;
        case ("minus"):
            return n1 - n2;
        case ("divide"):
            return n1 / n2;
        case ("multiply"):
            return n1 * n2;
    }
} 

// Adds a number to the end of the current number
function addNumber(previous, n) {
    if (!state.dotPressed) {
        return previous * 10 + n;
    } else {
        ++state.decimals;
        return previous + (n * Math.pow(10, -(state.decimals)));
    }
}

// Action function for number buttons
function numberClick(n) {
    if (state.newNumber == NaN || state.newNumber == undefined || state.newNumber == Infinity) {
        setNewNumber(n);
        setTotal(n);
    }
    else {
        let newNumber = addNumber(state.newNumber, n);
        if (!state.function) {
            setNewNumber(newNumber);
            setTotal(newNumber);
        } else {
            setNewNumber(newNumber);
        }
    }
}

// Adds event listeners to function buttons
const buttons = Array.from(document.getElementsByClassName("function"));
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        if (state.function) {
            setTotal(operate(state.total, state.newNumber, state.function));
        }
        setFunction(buttons[i].id);
        setNewNumber(0);
        state.dotPressed = false;
    });
}

// Adds functionality to number buttons
for (let i = 0; i < 10; i++) {
    document.querySelector("#n" + i).addEventListener("click", () => {numberClick(i);});
}

// Adds functionality to equals button
document.querySelector("#equal").addEventListener("click", () => {
    if (state.function) {
        let n = operate(state.total, state.newNumber, state.function);
        setNewNumber(n);
        setTotal(n);
        setFunction("");
        state.dotPressed = false;
    }
    // there should not be a state where newNumber != total and function = ""
});

// Adds functionality to clear button
document.querySelector("#clear").addEventListener("click", () => {
    setFunction("");
    setNewNumber(0);
    setTotal(0);
    state.dotPressed = false;
});

// Adds functionality to negative button
document.querySelector("#negative").addEventListener("click", () =>{
    setNewNumber(-state.newNumber);
    if (!state.function) {
        setTotal(state.newNumber)
    }
});

// Adds functionality to percent button
document.querySelector("#percent").addEventListener("click", () => {
     setNewNumber(state.newNumber / 100);
    if (!state.function) {
        setTotal(state.total / 100);
    }
});

// adds functionality to the dot button
document.querySelector("#dot").addEventListener("click", () => {
    state.dotPressed = true;
});