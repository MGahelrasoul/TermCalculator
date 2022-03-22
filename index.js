// Get input from html
const button = document.getElementById("button")
const input = document.getElementById("input")

button.addEventListener("click", event => {
    let mathIn = (input.value).replace(/\s+/g, '')
    doMath(mathIn)
})

function doMath(math) {
    // Check for Parentheses
    if (math.includes("(" && ")")) {
        math = doParenthesis(math)
        return math

        // Check for Multiplication / Division
    } else if (math.includes("*") || math.includes("/")) {
        if (math.includes("*") && math.includes("/")) {
            if (math.match(/(?<=[/])\d+(\.\d+)?/).index < math.match(/(?<=[*])\d+(\.\d+)?/).index) {
                math = doDivision(math)
                return math
            } else {
                math = doMultiplication(math)
                return math
            }
        } else if (math.includes("*")) {
            math = doMultiplication(math)
            return math
        } else if (math.includes("/")) {
            math = doDivision(math)
            return math
        }

        // Check for Addition / Subtraction
    } else if (math.includes("+") || math.includes("-")) {
        if (math.includes("+") && math.includes("-")) {
            if (math.match(/\d+(\.\d+)?(?=[+])/).index < math.match(/\d+(\.\d+)?(?=[-])/).index) {
                math = doAddition(math)
                return math
            } else {
                math = doSubtraction(math)
                return math
            }
        } else if (math.match(/\d+(\.\d+)?(?=[+])/)) {
            math = doAddition(math)
            return math
        } else if (math.match(/\d+(\.\d+)?(?=[-])/)) {
            math = doSubtraction(math)
            return math
        }

        // Return
    }
    console.log(math)
    return math
}

// Parenthesis function
function doParenthesis(math) {

    console.log(math)
    if (!math.includes("(") || !math.includes(")")) {
        if (!math.includes("(") && !math.includes(")")) {
            console.log("no parenthesis")
            return doMath(math)
        } else {
            console.log("Error in Input: expected '(' or ')'")
            return null
        }
    } else {
        // separate parentheses from equation
        let before = math.substr(0, math.lastIndexOf("("))
        let after = math.substr(math.lastIndexOf("(") + math.substr(math.lastIndexOf("(")).indexOf(")") + 1)
        let mathP = math.substr(math.lastIndexOf("(") + 1, math.substr(math.lastIndexOf("(")).indexOf(")") - 1)

        // remove parentheses
        // recursion to check for more parentheses
        mathP = doMath(mathP)

        return doParenthesis(before + mathP + after)
    }
}
// Multiply/Divide functions
function doMultiplication(math) {
    console.log(math)
    if (!math.includes("*")) {
        console.log("no multiply")
        return math
    } else {
        let before = math.substr(0, math.match(/\d+(\.\d+)?(?=[*])/).index)
        let after = math.substr(math.match(/(?<=[*])\d+(\.\d+)?/).index + math.match(/(?<=[*])\d+(\.\d+)?/)[0].length)
        let mathP = math.match(/\d+(\.\d+)?(?=[*])/)[0] * math.match(/(?<=[*])\d+(\.\d+)?/)[0]

        return doMath(before + mathP + after)
    }
}
function doDivision(math) {
    console.log(math)
    if (!math.includes("/")) {
        console.log("no division")
        return math
    } else {
        let before = math.substr(0, math.match(/\d+(\.\d+)?(?=[/])/).index)
        let after = math.substr(math.match(/(?<=[/])\d+(\.\d+)?/).index + math.match(/(?<=[/])\d+(\.\d+)?/)[0].length)
        let mathP = math.match(/\d+(\.\d+)?(?=[/])/)[0] / math.match(/(?<=[/])\d+(\.\d+)?/)[0]

        return doMath(before + mathP + after)
    }
}
// Add/Subtract functions
function doAddition(math) {
    console.log(math)
    if (!math.includes("+")) {
        console.log("no addition")
        return math
    } else {
        let before = ""
        let after = ""
        let mathP = ""
        if (math.substr(0, math.match(/\d+(\.\d+)?(?=[+])/).index) == "-") {
            // let before = ""
            let str = math.match(/((?<=[-]).*)/)[0]
            after = str.substr(str.match(/((?<=[+])\d+(\.\d+)?)/).index + str.match(/((?<=[+])\d+(\.\d+)?)/)[1].length)
            mathP = parseFloat(-str.match(/\d+(\.\d+)?(?=[+])/)[0]) + parseFloat(str.match(/(?<=[+])\d+(\.\d+)?/)[0])
        } else {
            before = math.substr(0, math.match(/\d+(\.\d+)?(?=[+])/).index)
            after = math.substr(math.match(/(?<=[+])\d+(\.\d+)?/).index + math.match(/(?<=[+])\d+(\.\d+)?/)[0].length)
            mathP = parseFloat(math.match(/\d+(\.\d+)?(?=[+])/)[0]) + parseFloat(math.match(/(?<=[+])\d+(\.\d+)?/)[0])
        }

        return doMath(before + mathP + after)
    }
}
function doSubtraction(math) {
    console.log(math)
    if (!math.includes("-")) {
        console.log("no addition")
        return math
    } else {
        let before = ""
        let after = ""
        let mathP = ""
        if (math.substr(0, math.match(/\d+(\.\d+)?(?=[-])/).index) == "-") {
            // let before = ""
            let str = math.match(/((?<=[-]).*)/)[0]
            after = str.substr(str.match(/((?<=[-])\d+(\.\d+)?)/).index + str.match(/((?<=[-])\d+(\.\d+)?)/)[1].length)
            mathP = (-str.match(/\d+(\.\d+)?(?=[-])/)[0]) - str.match(/(?<=[-])\d+(\.\d+)?/)[0]
        } else {
            before = math.substr(0, math.match(/\d+(\.\d+)?(?=[-])/).index)
            after = math.substr(math.match(/((?<=[-])\d+(\.\d+)?)/).index + math.match(/((?<=[-])\d+(\.\d+)?)/)[1].length)
            mathP = math.match(/\d+(\.\d+)?(?=[-])/)[0] - math.match(/(?<=[-])\d+(\.\d+)?/)[0]
        }

        return doMath(before + mathP + after)
    }
}