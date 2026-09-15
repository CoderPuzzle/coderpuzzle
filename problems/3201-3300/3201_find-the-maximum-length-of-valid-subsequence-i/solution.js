/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumLength = function (nums) {
    // Only parities matter: a valid subsequence either never changes
    // parity (all adjacent sums even) or flips parity on every step (all
    // adjacent sums odd). Those are exactly four target shapes -- all-
    // even, all-odd, alternating from even, alternating from odd. For
    // each shape sweep nums once keeping its next wanted parity and take
    // the earliest match, which never forgoes a later slot.
    let best = 0;
    for (const start of [0, 1]) {
        for (const alternate of [false, true]) {
            let want = start;
            let length = 0;
            for (const value of nums) {
                if (value % 2 === want) {
                    length++;
                    if (alternate) {
                        want ^= 1;
                    }
                }
            }
            best = Math.max(best, length);
        }
    }
    return best;
};
