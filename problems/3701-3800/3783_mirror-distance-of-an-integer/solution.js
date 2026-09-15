/**
 * @param {number} n
 * @return {number}
 */
var mirrorDistance = function (n) {
    // Peel digits least-significant first to build the reversal; any
    // trailing zeros of n simply never materialize as leading zeros.
    // Both sides stay below 10^9, far below 2^53, so numbers stay exact.
    const original = n;
    let reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + (n % 10);
        n = Math.floor(n / 10);
    }
    return Math.abs(original - reversed);
};
