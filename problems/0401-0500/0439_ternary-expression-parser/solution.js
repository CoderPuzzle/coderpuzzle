/**
 * @param {string} expression
 * @return {string}
 */
var parseTernary = function (expression) {
    // Ternaries group right-to-left, so the subexpression closest to the
    // right end is always complete first. Scanning backwards therefore
    // meets every operand before the '?' that needs it.
    const stack = [];
    for (let i = expression.length - 1; i >= 0; i--) {
        const c = expression[i];
        if (c !== "?") {
            stack.push(c);
        } else {
            const trueBranch = stack.pop();
            stack.pop(); // the ':' separating the two branches
            const falseBranch = stack.pop();
            // The character just left of the '?' is the condition ('T' or
            // 'F'); it belongs to this conditional, so consume it as well.
            const condition = expression[i - 1];
            stack.push(condition === "T" ? trueBranch : falseBranch);
            i--;
        }
    }
    return stack.pop();
};
