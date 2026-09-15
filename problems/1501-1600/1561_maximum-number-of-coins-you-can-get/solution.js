/**
 * @param {number[]} piles
 * @return {number}
 */
var maxCoins = function (piles) {
    // Sort ascending. Bob permanently absorbs the n smallest piles
    // (indices 0..n-1); of what's left, you take every other pile
    // starting at index n, and Alice takes the rest.
    piles.sort((a, b) => a - b);
    const n = piles.length / 3;
    let total = 0;
    let idx = n;
    for (let i = 0; i < n; i++) {
        total += piles[idx];
        idx += 2;
    }
    return total;
};
