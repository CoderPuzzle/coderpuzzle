/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    const n = nums.length;
    // prefix[i] = sum of the first i elements. Positivity makes it strictly
    // increasing, which licenses the binary search.
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    // Sentinel: an impossible length that survives when target is never met.
    let best = n + 1;
    for (let i = 0; i < n; i++) {
        const key = prefix[i] + target;
        // Lower bound: the first prefix >= key, searched from i+1 on so
        // the window has positive length.
        let lo = i + 1,
            hi = n + 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (prefix[mid] < key) lo = mid + 1;
            else hi = mid;
        }
        if (lo <= n) {
            best = Math.min(best, lo - i);
        }
    }
    return best === n + 1 ? 0 : best;
};
