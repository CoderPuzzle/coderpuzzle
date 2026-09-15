/**
 * @param {number} n
 * @return {number}
 */
var alternateDigitSum = function (n) {
    // Peel digits from the low end, alternating signs as we go: this
    // anchors "+" at the LEAST significant digit, while the statement
    // wants it on the most significant one. When the digit count is even
    // the accumulated total therefore needs a single final negation.
    // Every intermediate stays within +/- 45, far inside Number's exact
    // range.
    let total = 0;
    let sign = 1;
    let count = 0;
    for (let rest = n; rest > 0; rest = Math.floor(rest / 10)) {
        total += sign * (rest % 10);
        sign = -sign;
        ++count;
    }
    return count % 2 === 0 ? -total : total;
};
