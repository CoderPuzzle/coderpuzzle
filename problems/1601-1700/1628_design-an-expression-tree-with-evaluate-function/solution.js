/**
 * @param {string[]} postfix
 * @return {number}
 */
var buildAndEvaluate = function (postfix) {
    const stack = [];
    for (const tok of postfix) {
        if (tok.length === 1 && (tok === "+" || tok === "-" || tok === "*" || tok === "/")) {
            const b = stack.pop();
            const a = stack.pop();
            let value;
            if (tok === "+") {
                value = a + b;
            } else if (tok === "-") {
                value = a - b;
            } else if (tok === "*") {
                value = a * b;
            } else {
                value = Math.trunc(a / b);
            }
            stack.push(value);
        } else {
            stack.push(parseInt(tok, 10));
        }
    }
    return stack[stack.length - 1];
};
