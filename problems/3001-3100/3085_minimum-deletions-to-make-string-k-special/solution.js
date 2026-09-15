/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var minimumDeletions = function (word, k) {
    // Deletion only lowers counts, so some kept letter ends up with the
    // smallest final frequency x and every other kept letter must land in
    // [x, x + k]: letters above the window donate their excess, letters
    // below it vanish entirely. Trying each letter's original count as x
    // covers the optimum, since the winning x is always a count that some
    // letter keeps for free.
    const counts = new Array(26).fill(0);
    for (let i = 0; i < word.length; i++) {
        counts[word.charCodeAt(i) - 97]++;
    }
    let best = word.length;
    for (const base of counts) {
        let deletions = 0;
        for (const cnt of counts) {
            if (cnt < base) {
                deletions += cnt;
            } else if (cnt > base + k) {
                deletions += cnt - (base + k);
            }
        }
        best = Math.min(best, deletions);
    }
    return best;
};
