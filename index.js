const io = document.querySelector(".input_output");
var reset = false;

document.querySelectorAll("button").forEach((el) => {
    el.addEventListener("click", function (el) {
        // Symbol getted from pressed button
        let button = el.target.innerText;

        // Replace input symbols
        if (button == "×") {
            button = "*";
        }
        if (button == "÷") {
            button = "/";
        }
        if (button == "−") {
            button = "-";
        }
        if (button == "+") {
            button = "+";
        }

        // Clear IO if button is digit after eval
        if (reset) {
            reset = false;
            if (!isNaN(button)) {
                io.value = ""
            }
        }

        // Reset IO
        if (button == "CLR") {
            reset = false;
            io.value = "";
            return
        }

        // Remove 1 symbol from end
        if (button == "DEL") {
            io.value = io.value.slice(0, -1);
            if (!io.value) {
                reset = false;
            }
            return
        }

        // Calculate
        if (button == "=") {
            if (!io.value) {
                reset = false;
                return
            }
            io.value = eval(io.value);
            reset = true;
            return
        }

        // Exceptions

        if (io.value == "Infinity") {
            io.value = "";
        }

        let last_number = io.value.split(/[^\d|.]+/).slice(-1);
        let last_symbol = io.value.slice(-1);

        if (last_number == "") {
            if (isNaN(button)) {

                // Add zero prefix
                if (button == ".") {
                    io.value += "0.";
                    return
                }

                // Replace last operator
                if (isNaN(last_symbol)) {
                    io.value = io.value.slice(0, -1);
                    io.value += button;
                    return
                }

                // Do nothing if last symbol is empty and button is not digit
                return
            }
        }
        if (last_number == "0") {

            // Replace first zero to digit
            if (!isNaN(button)) {
                io.value = io.value.slice(0, -1);
                io.value += button;
                return
            }
        }
        if (String(last_number).includes(".")) {

            // Do nothing if dot already in number
            if (button == ".") {
                return
            }

            // Add zero postfix
            if ((isNaN(button)) && (last_symbol == ".")) {
                io.value += "0";
            }
        }

        // Append button value
        io.value += button;
    })
})
