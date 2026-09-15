/**
 * @param {number} k
 * @return {string}
 */
var kthLuckyNumber = function (k) {
    // Grow c until the blocks of all lengths up to c cover k: there are
    // 2^len lucky numbers of length len, cumulatively 2^(c + 1) - 2.
    let c = 1;
    while (Math.pow(2, c + 1) - 2 < k) {
        c++;
    }
    // Rank of k among the c-digit lucky numbers, made zero-based.
    const x = k - (Math.pow(2, c) - 2) - 1;
    // Binary counting in order: read x's c bits from the top, mapping
    // 0 -> 4 and 1 -> 7; bit order mirrors digit order, so this
    // enumerates the block exactly as the statement sorts it.
    let digits = "";
    for (let bit = c - 1; bit >= 0; --bit) {
        digits += (x >> bit) & 1 ? "7" : "4";
    }
    return digits;
};
