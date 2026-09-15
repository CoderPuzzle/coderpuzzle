/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeBitwiseAnd = function (left, right) {
    let shift = 0;
    // Shift both endpoints right until they agree: what remains is the
    // common binary prefix. Every bit below it flips through 0 somewhere in
    // [left, right], so the range's AND keeps only the prefix.
    while (left < right) {
        left = Math.floor(left / 2);
        right = Math.floor(right / 2);
        shift++;
    }
    // Restore the prefix to its original position, zeros below.
    return left * Math.pow(2, shift);
};
