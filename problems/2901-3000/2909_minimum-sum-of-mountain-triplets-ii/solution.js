/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumSum = function (nums) {
    // For a fixed peak j the best i is the smallest value left of j and
    // the best k the smallest value right of j, so prefix and suffix
    // minima settle both sides in one array each.
    const n = nums.length;
    const prefixMin = new Array(n);
    prefixMin[0] = nums[0];
    for (let i = 1; i < n; ++i) {
        prefixMin[i] = Math.min(prefixMin[i - 1], nums[i]);
    }
    const suffixMin = new Array(n);
    suffixMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; --i) {
        suffixMin[i] = Math.min(suffixMin[i + 1], nums[i]);
    }
    // Every interior index is tried as the peak; the strict inequalities
    // guard against equal shoulders, and -1 survives when none qualifies.
    let best = -1;
    for (let j = 1; j + 1 < n; ++j) {
        const left = prefixMin[j - 1];
        const right = suffixMin[j + 1];
        if (left < nums[j] && right < nums[j]) {
            const total = left + nums[j] + right;
            if (best === -1 || total < best) {
                best = total;
            }
        }
    }
    return best;
};
