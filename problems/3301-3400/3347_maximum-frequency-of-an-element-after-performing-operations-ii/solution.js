/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function (nums, k, numOperations) {
    // A target v collects every element in [v-k, v+k]: elements already
    // equal to v cost nothing, any other costs one operation, and surplus
    // operations can always be spent as +0 elsewhere because
    // numOperations <= n. So the best frequency at v is
    // min(window(v), count(v) + numOperations). Values reach 1e9, far too
    // wide to sweep, so only breakpoints are tried: if the optimum falls
    // off an element, its window's smallest element x can slide the target
    // to x + k without losing anyone, so v = nums[i] and v = nums[i] + k
    // always contain an optimum; nums[i] - k is the symmetric guard.
    // Window bounds reach 3e9 — past 32 bits but far below 2^53, so plain
    // Numbers stay exact.
    nums.sort((a, b) => a - b);
    const lowerBound = (limit) => {
        let lo = 0;
        let hi = nums.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (nums[mid] < limit) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    const upperBound = (limit) => {
        let lo = 0;
        let hi = nums.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (nums[mid] <= limit) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    let best = 0;
    for (const x of nums) {
        for (const v of [x - k, x, x + k]) {
            const window = upperBound(v + k) - lowerBound(v - k);
            const exact = upperBound(v) - lowerBound(v);
            best = Math.max(best, Math.min(window, exact + numOperations));
        }
    }
    return best;
};
