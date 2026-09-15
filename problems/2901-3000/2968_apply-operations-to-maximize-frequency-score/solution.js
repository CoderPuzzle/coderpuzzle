/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequencyScore = function (nums, k) {
    // After sorting, the elements worth converting to one value form a
    // contiguous window: the move cost of a set is minimized at its
    // median, and swapping any non-window member for a skipped in-between
    // element never costs more. Sliding a window [l, r] rightward, the
    // cheapest way to flatten it is to raise everything to the median
    // nums[(l + r) / 2], costing (median * left_count - left_sum) +
    // (right_sum - median * right_count) via prefix sums. The cost only
    // shrinks when the window shrinks, so l never moves backwards. Costs
    // reach n * span / 2 ~ 5 * 10^13 and k reaches 10^14; every
    // intermediate stays below 2^53, so Number arithmetic is exact.
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const pre = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        pre[i + 1] = pre[i] + nums[i];
    }
    let best = 0;
    let l = 0;
    for (let r = 0; r < n; r++) {
        while (true) {
            const mid = (l + r) >> 1;
            const median = nums[mid];
            const cost = median * (mid - l) - (pre[mid] - pre[l]) + (pre[r + 1] - pre[mid]) - median * (r + 1 - mid);
            if (cost <= k) {
                break;
            }
            l++;
        }
        best = Math.max(best, r - l + 1);
    }
    return best;
};
