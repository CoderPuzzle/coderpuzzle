/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function (numerator, denominator) {
    // Magnitudes in, sign out: "-" is prepended once, and never on a zero
    // result (0 over a negative denominator must not become "-0").
    // Doubles stay exact here — every intermediate is at most 2^31 * 10.
    const negative = numerator < 0 !== denominator < 0;
    let n = numerator < 0 ? -numerator : numerator;
    let d = denominator < 0 ? -denominator : denominator;
    let result = negative && n !== 0 ? "-" : "";
    result += Math.floor(n / d);
    let remainder = n % d;
    if (remainder === 0) return result;
    result += ".";
    // Remainder -> position of the fraction digit it produced; the first
    // remainder seen twice opens the recurring parentheses at its position.
    const seen = new Map();
    let fraction = "";
    while (remainder !== 0) {
        const start = seen.get(remainder);
        if (start !== undefined) {
            // Everything from that position recurs: close the cycle there.
            fraction = fraction.slice(0, start) + "(" + fraction.slice(start) + ")";
            break;
        }
        seen.set(remainder, fraction.length);
        remainder *= 10;
        fraction += Math.floor(remainder / d);
        remainder %= d;
    }
    return result + fraction;
};
