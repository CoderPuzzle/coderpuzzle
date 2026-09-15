/**
 * @param {number} n
 * @return {number}
 */
var clumsy = function (n) {
    // The rotation is *, /, +, - repeating. * and / bind tighter, so they
    // only ever fold into the term on top of the stack; + and - always
    // start a fresh term (pushed with its own sign already applied).
    const stack = [n];
    let opIdx = 0;
    for (let i = n - 1; i >= 1; i--) {
        const op = opIdx % 4;
        opIdx++;
        if (op === 0) {
            stack[stack.length - 1] *= i;
        } else if (op === 1) {
            // JS division is floating-point, so it is truncated toward zero
            // by hand: a prior '-' push can leave the top negative, and the
            // next rotation's '*' can carry that sign into this division.
            stack[stack.length - 1] = Math.trunc(stack[stack.length - 1] / i);
        } else if (op === 2) {
            stack.push(i);
        } else {
            stack.push(-i);
        }
    }
    return stack.reduce((total, term) => total + term, 0);
};
