/**
 * @param {number[]} nums
 * @return {number}
 */
var subsequenceCount = function (nums) {
    // Carry the count of even-sum and odd-sum subsequences of the
    // scanned prefix; an even element doubles both counts, an odd one
    // makes both counts their sum. All values stay far below 2^53, so
    // Number arithmetic is exact.
    const MOD = 1e9 + 7;
    let even = 1;
    let odd = 0;
    for (const num of nums) {
        if (num % 2 !== 0) {
            const merged = (even + odd) % MOD;
            even = merged;
            odd = merged;
        } else {
            even = (even * 2) % MOD;
            odd = (odd * 2) % MOD;
        }
    }
    return odd;
};
