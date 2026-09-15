/**
 * @param {number} n
 * @return {number}
 */
var sumAndMultiply = function (n) {
    // One pass peels n's digits least-significant first: each nonzero
    // digit joins the packed value x at the place slot it earns and joins
    // the digit sum; zeros fall through untouched, so x ends up holding
    // the surviving digits in their original order.
    let x = 0;
    let place = 1;
    let total = 0;
    // Math.floor division stands in for integer division because JS
    // bitwise operators truncate to 32 bits, while every value here stays
    // far below 2^53 (the product peaks at ~8.1 * 10^10).
    while (n > 0) {
        const digit = n % 10;
        if (digit !== 0) {
            x += digit * place;
            place *= 10;
            total += digit;
        }
        n = Math.floor(n / 10);
    }
    return x * total;
};
