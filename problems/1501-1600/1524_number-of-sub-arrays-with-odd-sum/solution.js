/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function (arr) {
    // `even`/`odd` count prefixes seen so far (including the empty prefix
    // before the array) with even/odd parity; a new odd-parity prefix pairs
    // with every earlier even prefix to make an odd-sum subarray, and
    // symmetrically for a new even-parity prefix. JS numbers are exact up
    // to 2^53, well beyond any intermediate sum here, so no separate
    // 64-bit type is needed.
    const MOD = 1_000_000_007;
    let even = 1;
    let odd = 0;
    let parity = 0;
    let total = 0;
    for (const x of arr) {
        parity ^= x & 1;
        if (parity === 1) {
            total = (total + even) % MOD;
            odd++;
        } else {
            total = (total + odd) % MOD;
            even++;
        }
    }
    return total;
};
