/**
 * @param {string} text
 * @param {string} pattern
 * @return {number}
 */
var maximumSubsequenceCount = function (text, pattern) {
    // An inserted pattern[0] pairs with the most pattern[1]'s at the
    // very front of text, and an inserted pattern[1] with the most
    // pattern[0]'s at the very end — any interior spot sees only a
    // subset of one of those sides. So the answer is the pairs already
    // in text plus the larger of the two letter counts, and one sweep
    // gathers all three numbers: each pattern[1] is charged with the
    // pattern[0]'s before it. When both pattern letters are equal the
    // same sweep yields k*(k-1)/2 pairs plus a gain of k, which is
    // exactly what one extra copy of that letter adds.
    const first = pattern[0];
    const second = pattern[1];
    let countFirst = 0;
    let countSecond = 0;
    let pairs = 0;
    for (const ch of text) {
        if (ch === second) {
            pairs += countFirst;
            countSecond++;
        }
        if (ch === first) {
            countFirst++;
        }
    }
    return pairs + Math.max(countFirst, countSecond);
};
