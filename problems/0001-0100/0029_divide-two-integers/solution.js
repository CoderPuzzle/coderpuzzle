/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    // The one quotient that does not fit in 32 bits: -2^31 divided by -1 is 2^31.
    // Clamped up front per the statement's rule.
    if (dividend === -2147483648 && divisor === -1) return 2147483647;
    // Magnitudes in, sign out: the quotient of the magnitudes with the sign
    // reapplied truncates toward zero by construction. Doubles stay exact
    // here — every value is at most 2^32.
    const negative = dividend < 0 !== divisor < 0;
    let a = dividend < 0 ? -dividend : dividend;
    let b = divisor < 0 ? -divisor : divisor;
    let quotient = 0;
    while (a >= b) {
        // Find the largest chunk = b doubled (by addition) that still fits
        // in a; multiple doubles alongside it as the chunk's weight.
        let chunk = b;
        let multiple = 1;
        while (a >= chunk + chunk) {
            chunk += chunk;
            multiple += multiple;
        }
        a -= chunk;
        quotient += multiple;
    }
    return negative ? -quotient : quotient;
};
