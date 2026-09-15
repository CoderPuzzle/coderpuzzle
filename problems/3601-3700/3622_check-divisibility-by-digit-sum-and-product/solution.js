/**
 * @param {number} n
 * @return {boolean}
 */
var checkDivisibility = function (n) {
    let total = 0;
    let product = 1;
    for (let rest = n; rest > 0; rest = Math.floor(rest / 10)) {
        const digit = rest % 10;
        total += digit;
        product *= digit;
    }
    // Digit sum >= 1 always, so the divisor never hits zero.
    return n % (total + product) === 0;
};
