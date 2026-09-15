/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function (num) {
    // Zero never enters the digit loop, so it gets its own answer here.
    if (num === 0) {
        return "0";
    }
    // Digits of the magnitude come out lowest-first; the sign is kept
    // aside and prepended at the end.
    const negative = num < 0;
    let value = negative ? -num : num;
    const digits = [];
    while (value !== 0) {
        // Split off the low base-7 digit, then shift the rest down.
        digits.push(String(value % 7));
        value = Math.floor(value / 7);
    }
    // Digits come out lowest-first, so reverse for the answer.
    return (negative ? "-" : "") + digits.reverse().join("");
};
