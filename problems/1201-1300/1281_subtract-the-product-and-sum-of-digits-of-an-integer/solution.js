// Peel digits from the right: n % 10 is the last digit, integer division
// discards it. Product and sum absorb each digit as it comes off.
/**
 * @param {number} n
 * @return {number}
 */
var subtractProductAndSum = function (n) {
    let product = 1;
    let total = 0;
    while (n > 0) {
        const digit = n % 10;
        product *= digit;
        total += digit;
        n = Math.floor(n / 10);
    }
    return product - total;
};
