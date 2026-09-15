/**
 * @param {number} n
 * @return {string}
 */
var concatHex36 = function (n) {
    // One alphabet serves both bases: base 16 stops at 'F', base 36 at 'Z'.
    const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const toBase = (x, b) => {
        // n >= 1 makes x >= 1, so the loop always emits at least one digit.
        const digits = [];
        while (x !== 0) {
            digits.push(alphabet[x % b]);
            x = Math.floor(x / b);
        }
        // Digits come out lowest-first, so reverse for the answer.
        return digits.reverse().join("");
    };
    // n <= 1000 keeps both powers far below 2^53, so the products are exact.
    return toBase(n * n, 16) + toBase(n * n * n, 36);
};
