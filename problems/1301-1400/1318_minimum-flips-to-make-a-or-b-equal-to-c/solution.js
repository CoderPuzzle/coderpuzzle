/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function (a, b, c) {
    // Per-bit accounting: c-bit 1 needs a|b == 1 (one flip when both are 0);
    // c-bit 0 needs a|b == 0 (one flip per set bit among a and b).
    let flips = 0;
    while (a !== 0 || b !== 0 || c !== 0) {
        if (c & 1) {
            if ((a & 1) === 0 && (b & 1) === 0) {
                flips += 1;
            }
        } else {
            flips += (a & 1) + (b & 1);
        }
        a >>>= 1;
        b >>>= 1;
        c >>>= 1;
    }
    return flips;
};
