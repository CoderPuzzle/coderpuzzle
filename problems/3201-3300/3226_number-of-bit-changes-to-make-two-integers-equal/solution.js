/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var minChanges = function (n, k) {
    // The only allowed move clears a set bit of n to a 0, so n can only
    // ever become a submask of itself: if some bit of k is 0 in n there
    // is no way to create it and the answer is -1. Otherwise each change
    // fixes exactly one position where n holds a 1 and k a 0 -- precisely
    // the set bits of n ^ k, since k never exceeds n's bits. Count them
    // by testing the lowest bit and shifting right until the pattern
    // empties. Inputs are at most 10^6 < 2^20, so the pattern fits in 20
    // bits; JavaScript's bitwise operators coerce to signed 32-bit two's
    // complement, which such small non-negative values never leave.
    if ((n & k) !== k) {
        return -1;
    }
    let z = n ^ k;
    let changes = 0;
    while (z !== 0) {
        changes += z & 1;
        z >>= 1;
    }
    return changes;
};
