/**
 * @param {number[]} beans
 * @return {number}
 */
var minimumRemoval = function (beans) {
    // In a sorted layout, keeping bags equal to the value at index i means:
    // remove everything before i entirely, and trim every later bag down to
    // that value. Every total here is bounded by 10^5 * 10^5 = 10^10 < 2^53,
    // so plain Number arithmetic is exact throughout.
    let total = 0;
    for (const bean of beans) {
        total += bean;
    }
    const ordered = [...beans].sort((a, b) => a - b);
    let best = total; // keep nothing (degenerate floor)
    const n = ordered.length;
    for (let index = 0; index < n; ++index) {
        const keptTotal = ordered[index] * (n - index);
        if (total - keptTotal < best) {
            best = total - keptTotal;
        }
    }
    return best;
};
