/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
    // One left-to-right scan over s implements the statement's four steps
    // in order: whitespace, signedness, conversion, rounding.
    let i = 0;
    while (i < s.length && s[i] === " ") {
        i++;
    }
    let sign = 1;
    if (i < s.length && (s[i] === "+" || s[i] === "-")) {
        if (s[i] === "-") {
            sign = -1;
        }
        i++;
    }
    // Doubles hold integers exactly far past 2^31, and the early clamp below
    // keeps the accumulator within 2^31 - 1, so no precision is ever lost.
    let total = 0;
    while (i < s.length && s[i] >= "0" && s[i] <= "9") {
        const digit = s.charCodeAt(i) - 48;
        // Clamp on the fly: if appending this digit would pass 2^31 - 1,
        // the value is out of range and the answer is the boundary in the
        // sign's direction.
        if (total > (2147483647 - digit) / 10) {
            return sign === 1 ? 2147483647 : -2147483648;
        }
        total = total * 10 + digit;
        i++;
    }
    return sign * total;
};
