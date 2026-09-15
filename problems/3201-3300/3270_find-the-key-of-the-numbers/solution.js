/**
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @return {number}
 */
var generateKey = function (num1, num2, num3) {
    // Digit i of the key is the minimum of the three numbers' ith digits,
    // counted from the left of their zero-padded four-digit forms; the
    // integer result drops any leading zeros by construction.
    let key = 0;
    for (let place = 1000; place > 0; place = Math.floor(place / 10)) {
        const d1 = Math.floor(num1 / place) % 10;
        const d2 = Math.floor(num2 / place) % 10;
        const d3 = Math.floor(num3 / place) % 10;
        key = key * 10 + Math.min(d1, d2, d3);
    }
    return key;
};
