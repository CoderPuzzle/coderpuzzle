/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function (blocks, k) {
    // The answer is the window of k consecutive blocks containing the
    // fewest whites; a sliding window updates that count in O(1) as it
    // moves.
    let whites = 0;
    for (let i = 0; i < k; ++i) {
        if (blocks[i] === "W") {
            ++whites;
        }
    }
    let best = whites;
    for (let right = k; right < blocks.length; ++right) {
        if (blocks[right] === "W") {
            ++whites;
        }
        if (blocks[right - k] === "W") {
            --whites;
        }
        best = Math.min(best, whites);
    }
    return best;
};
