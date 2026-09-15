/**
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
var smallestNumber = function (n, t) {
    // Brute force: step up from n until the digit product divides by t.
    // Any run of 10 consecutive integers contains a multiple of 10, whose
    // digit product 0 is divisible by every t >= 1, so the loop needs at
    // most 10 steps.
    const digitProduct = (value) => {
        let product = 1;
        while (value > 0) {
            product *= value % 10;
            value = Math.floor(value / 10);
        }
        return product;
    };
    while (digitProduct(n) % t !== 0) n++;
    return n;
};
