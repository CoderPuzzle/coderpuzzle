/**
 * @param {number} n
 * @return {number}
 */
var countMonobit = function (n) {
    // A positive integer's binary representation starts with 1, so
    // "all bits the same" leaves only all-ones: the repunits 1, 11,
    // 111, ... each reached from the last by rep = 2*rep + 1
    // (appending one more 1-bit). Zero ("0") is monobit as well, so
    // the answer is 1 + the number of repunits <= n. The walk stops
    // at the first repunit past n; with n <= 1000 every value stays
    // <= 1023, far under Number's exact 2^53 range, so plain
    // arithmetic is safe.
    let count = 1;
    let rep = 1;
    while (rep <= n) {
        count++;
        rep = 2 * rep + 1;
    }
    return count;
};
