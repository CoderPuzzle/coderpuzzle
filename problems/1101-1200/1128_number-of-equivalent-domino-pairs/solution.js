/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function (dominoes) {
    // Canonical orientation (min, max) collapses a domino and its rotation
    // to one cell of a 9x9 table.
    const table = Array.from({ length: 10 }, () => new Array(10).fill(0));
    let pairs = 0;
    for (const [a, b] of dominoes) {
        const lo = Math.min(a, b);
        const hi = Math.max(a, b);
        // Every earlier domino in this cell pairs with the current one.
        pairs += table[lo][hi];
        table[lo][hi]++;
    }
    return pairs;
};
