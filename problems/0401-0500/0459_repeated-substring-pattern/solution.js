/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
    // Only a proper divisor length can work: the block must divide n and
    // be shorter than it, so s is at least two copies of the block.
    const n = s.length;
    for (let d = 1; d <= n / 2; ++d) {
        if (n % d === 0 && s === s.slice(0, d).repeat(n / d)) {
            return true;
        }
    }
    return false;
};
