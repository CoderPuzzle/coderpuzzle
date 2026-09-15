/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumLength = function (nums, k) {
    // One row per change budget: row[v][a] is the longest good
    // subsequence using exactly a changes and ending on value v;
    // endsAll[a] mirrors the best over all endings. Same-valued tails
    // extend for free, everything else spends one budget step, and both
    // reads use stats frozen before this element.
    const ends = new Map();
    const endsAll = new Array(k + 1).fill(0);
    let best = 0;
    for (const x of nums) {
        let row = ends.get(x);
        if (!row) {
            row = new Array(k + 1).fill(0);
            ends.set(x, row);
        }
        const computed = new Array(k + 1);
        for (let a = 0; a <= k; ++a) {
            const prior = a === 0 ? 0 : endsAll[a - 1];
            computed[a] = Math.max(row[a], prior) + 1;
        }
        for (let a = 0; a <= k; ++a) {
            if (computed[a] > row[a]) row[a] = computed[a];
            if (computed[a] > endsAll[a]) endsAll[a] = computed[a];
            if (endsAll[a] > best) best = endsAll[a];
        }
    }
    return best;
};
