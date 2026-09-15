/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumStrongPairXor = function (nums) {
    // Sorting makes the kindred condition one-sided: a partner y of the
    // larger member x must satisfy x <= 2*y, so each x's partners are a
    // window over the earlier sorted values that two pointers maintain.
    nums.sort((a, b) => a - b);
    // counts[level] maps a window value's first (level + 1) bits to how
    // many window values carry that prefix; every value is below 128, so
    // seven bits cover them all, and a value leaving the window just
    // decrements its counts instead of invalidating shared prefixes.
    const counts = [];
    for (let level = 0; level < 7; ++level) {
        counts.push(new Map());
    }
    let lo = 0;
    let best = 0;
    for (let i = 0; i < nums.length; ++i) {
        const x = nums[i];
        while (2 * nums[lo] < x) {
            const y = nums[lo];
            let prefix = 0;
            for (let level = 0; level < 7; ++level) {
                prefix = prefix * 2 + ((y >> (6 - level)) & 1);
                const left = (counts[level].get(prefix) ?? 0) - 1;
                if (left === 0) {
                    counts[level].delete(prefix);
                } else {
                    counts[level].set(prefix, left);
                }
            }
            ++lo;
        }
        // Greedy walk over x's bits, high to low: keep a bit exactly when
        // the partner prefix that completes it is itself in the window.
        let prefix = 0;
        let ans = 0;
        for (let level = 0; level < 7; ++level) {
            prefix = prefix * 2 + ((x >> (6 - level)) & 1);
            ans = counts[level].has(prefix ^ (ans * 2 + 1)) ? ans * 2 + 1 : ans * 2;
        }
        best = Math.max(best, ans);
        // Admit x for the larger values still to come.
        prefix = 0;
        for (let level = 0; level < 7; ++level) {
            prefix = prefix * 2 + ((x >> (6 - level)) & 1);
            counts[level].set(prefix, (counts[level].get(prefix) ?? 0) + 1);
        }
    }
    return best;
};
