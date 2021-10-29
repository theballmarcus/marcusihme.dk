var typed_string = ""
document.addEventListener('keydown', (event) => {
    var name = event.key;
    typed_string = typed_string
    if(name.length === 1) {
        typed_string += name
    } else if(name === "Backspace") {
        typed_string = typed_string.substring(0, typed_string.length - 1)
    }
}, false);