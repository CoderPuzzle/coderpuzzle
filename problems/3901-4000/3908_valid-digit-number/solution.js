/**
 * @param {number} n
 * @param {number} x
 * @return {boolean}
 */
var validDigit = function (n, x) {
    const digits = String(n);
    const target = String(x);
    return digits.includes(target) && digits[0] !== target;
};
