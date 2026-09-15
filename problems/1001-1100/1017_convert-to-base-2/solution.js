/**
 * @param {number} n
 * @return {string}
 */
var baseNeg2 = function (n) {
    // Pull off one digit at a time: the least-significant digit is n
    // reduced modulo 2, forced into {0, 1} since JavaScript's % truncates
    // toward zero and can report -1 for a negative n. What's left is
    // divided by -2 to expose the next digit. n = 0 is handled directly
    // since the loop body never runs for it.
    if (n === 0) {
        return "0";
    }
    let digits = [];
    while (n !== 0) {
        let remainder = n % 2;
        if (remainder < 0) {
            remainder += 2;
        }
        digits.push(String(remainder));
        n = (n - remainder) / -2;
    }
    return digits.reverse().join("");
};
