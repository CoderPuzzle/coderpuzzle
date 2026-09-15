/**
 * @param {number[]} planks
 * @return {number}
 */
var maximumWidth = function (planks) {
    // For a fixed fence height h: every height-h plank joins the fence
    // as is, and planks of any other height can only contribute as
    // halves of disjoint pairs summing to h. A height-h plank itself can
    // never be in such a pair (its partner would need height 0), so
    // singles and pairs never compete for a plank: their counts add.
    const freq = new Map();
    for (const plank of planks) {
        freq.set(plank, (freq.get(plank) || 0) + 1);
    }
    const heights = [...freq.keys()].sort((a, b) => a - b);
    // bucket[s] = number of disjoint pairs of planks whose heights sum
    // to s, accumulated once over every unordered pair of height values.
    const bucket = new Map();
    for (let i = 0; i < heights.length; ++i) {
        const x = heights[i];
        const countX = freq.get(x);
        if (countX >= 2) {
            bucket.set(2 * x, (bucket.get(2 * x) || 0) + Math.floor(countX / 2));
        }
        for (let j = i + 1; j < heights.length; ++j) {
            const y = heights[j];
            const pairs = Math.min(countX, freq.get(y));
            bucket.set(x + y, (bucket.get(x + y) || 0) + pairs);
        }
    }
    // Achievable fence heights are exactly the original heights plus the
    // pairwise sums; a lone plank already builds a width-1 fence.
    let best = Math.max(...freq.values());
    for (const [sum, pairs] of bucket) {
        best = Math.max(best, pairs + (freq.get(sum) || 0));
    }
    return best;
};
