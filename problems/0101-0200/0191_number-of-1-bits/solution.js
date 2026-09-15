/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
    // Subtracting one borrows through the trailing zeros and flips the lowest
    // set bit off, so n & (n - 1) clears exactly that bit: the loop runs once
    // per set bit. The & operator works mod 2^32, which is exactly this
    // problem's width — patterns at or above 2^31 keep all 32 of their bits
    // and still lose one set bit per turn.
    let count = 0;
    while (n !== 0) {
        n &= n - 1;
        ++count;
    }
    return count;
};
