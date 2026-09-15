/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    // Binary search for the largest m with m * m <= x: the predicate is
    // monotone (past the root, every square overshoots), so halving the
    // candidate interval lands exactly on the rounded-down square root.
    // Doubles hold every integer through 2^53 exactly; a product past 2^53
    // only arises when mid is already so large that "too big" is the verdict
    // by a margin no rounding can erase, so every comparison decides correctly.
    let low = 0;
    let high = x;
    while (low < high) {
        // Round the midpoint up: with a plain floor the interval can stop
        // shrinking when low == mid, and the loop would never terminate.
        const mid = Math.floor(low + (high - low + 1) / 2);
        if (mid * mid <= x) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }
    return low;
};
